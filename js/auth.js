/**
 * Digital Grampanchayat - Authentication & Role-Based Access Control Layer
 * Manages Citizen and Admin sessions, Route Guards, and Profile Management
 */

class AuthService {
  constructor() {
    this.currentUser = this.loadSession();
    this.initFirebaseObserver();
  }

  loadSession() {
    try {
      const stored = localStorage.getItem('gp_active_session');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  }

  saveSession(user) {
    this.currentUser = user;
    if (user) {
      localStorage.setItem('gp_active_session', JSON.stringify(user));
    } else {
      localStorage.removeItem('gp_active_session');
    }
    window.dispatchEvent(new CustomEvent('authStateChanged', { detail: { user } }));
  }

  initFirebaseObserver() {
    if (window.FIREBASE_READY && window.fbAuth) {
      window.fbAuth.onAuthStateChanged(async (firebaseUser) => {
        if (firebaseUser) {
          // Look up user role in Firestore
          try {
            const userDoc = await window.fbFirestore.collection('users').doc(firebaseUser.uid).get();
            if (userDoc.exists) {
              this.saveSession({ ...userDoc.data(), userId: firebaseUser.uid });
            }
          } catch (e) {
            console.warn("Firestore user fetch error:", e.message);
          }
        }
      });
    }
  }

  getUser() {
    return this.currentUser;
  }

  isLoggedIn() {
    return Boolean(this.currentUser);
  }

  isAdmin() {
    return this.currentUser && this.currentUser.role === 'admin';
  }

  isCitizen() {
    return this.currentUser && this.currentUser.role === 'citizen';
  }

  async login(email, password) {
    email = email.trim().toLowerCase();

    // 1. Live Firebase Auth if available
    if (window.FIREBASE_READY && window.fbAuth) {
      try {
        const cred = await window.fbAuth.signInWithEmailAndPassword(email, password);
        const userDoc = await window.fbFirestore.collection('users').doc(cred.user.uid).get();
        if (userDoc.exists) {
          const profile = userDoc.data();
          this.saveSession(profile);
          return { success: true, user: profile };
        }
      } catch (e) {
        console.warn("Firebase Auth sign in failed, testing local database:", e.message);
      }
    }

    // 2. Local Database lookup (for demo/evaluations)
    const users = await window.db.getUsers();
    
    // Check demo accounts or registered users
    let user = users.find(u => u.email.toLowerCase() === email);

    // Support quick demo logins
    if (email === 'admin@grampanchayat.gov.in') {
      user = {
        userId: "admin_demo_01",
        name: "Anand Kulkarni (Gram Sevak)",
        email: "admin@grampanchayat.gov.in",
        mobile: "9422001122",
        address: "Gram Panchayat Administrative Bhavan",
        ward: "HQ",
        role: "admin",
        createdAt: "2026-01-01"
      };
    } else if (email === 'citizen@grampanchayat.gov.in' || (user && user.role === 'citizen')) {
      if (!user) {
        user = {
          userId: "user_rajesh",
          name: "Rajesh Ramdas Patil",
          email: "citizen@grampanchayat.gov.in",
          mobile: "9822104523",
          address: "House No. 142, Shivaji Galli, Ward No. 1",
          ward: "Ward 1",
          role: "citizen",
          createdAt: "2026-01-15"
        };
      }
    }

    if (user) {
      this.saveSession(user);
      return { success: true, user };
    }

    return { success: false, message: "Invalid email or password. Please check your credentials." };
  }

  async register(formData) {
    const { name, email, mobile, password, address, ward } = formData;
    const cleanEmail = email.trim().toLowerCase();

    // Check existing
    const users = await window.db.getUsers();
    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: "An account with this email address already exists." };
    }

    const newUser = {
      userId: `user_${Date.now()}`,
      name,
      email: cleanEmail,
      mobile,
      address,
      ward: ward || "Ward 1",
      role: "citizen",
      createdAt: new Date().toISOString()
    };

    // Live Firebase creation if enabled
    if (window.FIREBASE_READY && window.fbAuth) {
      try {
        const cred = await window.fbAuth.createUserWithEmailAndPassword(cleanEmail, password);
        newUser.userId = cred.user.uid;
        await window.fbFirestore.collection('users').doc(cred.user.uid).set(newUser);
      } catch (e) {
        console.warn("Firebase Auth registration failed, saving locally:", e.message);
      }
    }

    await window.db.addUser(newUser);
    this.saveSession(newUser);
    return { success: true, user: newUser };
  }

  async updateProfile(updates) {
    if (!this.currentUser) return { success: false };
    
    const updated = { ...this.currentUser, ...updates };
    this.saveSession(updated);

    // Update in local users array
    const users = await window.db.getUsers();
    const idx = users.findIndex(u => u.userId === updated.userId);
    if (idx !== -1) {
      users[idx] = updated;
      window.db.saveLocal('users', users);
    }

    // Update in live Firestore if active
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        await window.fbFirestore.collection('users').doc(updated.userId).update(updates);
      } catch (e) {
        console.warn("Firestore profile update error:", e.message);
      }
    }

    return { success: true, user: updated };
  }

  logout() {
    if (window.FIREBASE_READY && window.fbAuth) {
      window.fbAuth.signOut().catch(() => {});
    }
    this.saveSession(null);
    window.location.href = "login.html";
  }

  /**
   * Route Guard: Protect pages by required role
   * @param {string} requiredRole - 'citizen', 'admin', or 'authenticated'
   */
  enforceRouteGuard(requiredRole = 'authenticated') {
    const user = this.getUser();

    if (!user) {
      sessionStorage.setItem('gp_redirect_after_login', window.location.pathname);
      window.location.href = "login.html?msg=auth_required";
      return false;
    }

    if (requiredRole === 'admin' && user.role !== 'admin') {
      alert("Access Denied: You need administrative credentials to access the Panchayat Admin Console.");
      window.location.href = "dashboard.html";
      return false;
    }

    if (requiredRole === 'citizen' && user.role === 'admin') {
      // Allow admin to view citizen views or redirect to admin
      return true;
    }

    return true;
  }
}

window.auth = new AuthService();
