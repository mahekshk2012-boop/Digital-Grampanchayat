# Digital Grampanchayat Service Portal (डिजिटल ग्रामपंचायत प्रणाली)

> **Official e-Governance Web Portal for Village Administration & Citizen Empowerment**  
> *Developed for IT Engineering Mini Project / Community Engagement Initiative*

---

## 🏛️ Project Overview

The **Digital Grampanchayat Service Website** is a modern, responsive, and secure web application designed to digitize local self-government (Panchayati Raj) public services. It eliminates the traditional need for rural citizens to repeatedly visit the Panchayat office for government welfare schemes, certificates, grievance redressals, and local tax payments.

### 🌟 Key Highlights & Engineering Features:
1. **Bilingual Engine (English & मराठी)**: Instant language switching across all pages with zero reload.
2. **Citizen Self-Service Portal**:
   - Apply for **Income, Residence, Birth, and Death certificates** with online document upload.
   - **Public Grievance Redressal**: Register civic issues (Water, Roads, Electricity, Drainage) with photo evidence and GPS location tagging.
   - **Visual Application Lifecycle Stepper**: Real-time tracking through `Submitted -> Under Review -> In Progress -> Resolved / Approved`.
   - **Digital Stamped Certificate Issuance**: View and print officially stamped certificates with QR/Seal validation.
3. **Panchayat Administrative Console (Admin Dashboard)**:
   - Role-based protected access for Gram Sevak & Panchayat Officers.
   - Real-time analytics, user directory, ticket status management, and official remark logging.
   - Create, edit, and publish welfare schemes and emergency circulars.
4. **AI Assistant "Gram Sahayak" (ग्राम सहाय्यक)**:
   - Interactive floating 24/7 bilingual chatbot answering village rules, document checklists, and scheme queries.
5. **Future-Ready Revenue Architecture**:
   - Online Property & Water Tax bill inquiry with instant digital payment gateway simulation and printable e-Receipt.
6. **Dual-Mode Cloud Architecture**:
   - Works immediately out-of-the-box with high-fidelity persistent simulation, and seamlessly connects to **Live Firebase Auth, Firestore, and Storage** by entering project keys in `js/firebase-config.js`.

---

## 💻 Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+), [Tailwind CSS](https://tailwindcss.com), [Font Awesome 6](https://fontawesome.com), Google Fonts (Inter & Noto Sans Devanagari).
- **Backend & Cloud Services**:
  - **Firebase Authentication**: Secure user management (Citizen & Admin roles).
  - **Firebase Cloud Firestore**: NoSQL real-time document collections (`users`, `complaints`, `certificates`, `schemes`, `announcements`).
  - **Firebase Storage**: Secure file and image storage for grievance photos and certificate proofs.
  - **Firestore Security Rules**: Production-grade role-based access rules.

---

## 📂 Project Directory Structure

```
digital-grampanchayat/
│
├── index.html               # Main Public Home Page & Quick Application Tracker
├── dashboard.html           # Citizen Self-Service Dashboard
├── admin.html               # Panchayat Official Administrative Console
├── apply-certificate.html   # Certificate Application Portal (Income, Residence, etc.)
├── my-certificates.html     # Citizen Certificate Tracker & Stamped Download
├── submit-complaint.html    # Grievance Registration with Photo Upload & Geotagging
├── my-complaints.html       # Public Grievance Tracking & Officer Remarks Timeline
├── schemes.html             # Welfare Schemes Directory with Category Filters
├── announcements.html       # Official Notices & Emergency Gram Sabha Circulars
├── contact.html             # Panchayat Leadership Directory & Inquiry Desk
├── about.html               # Village History, Demographics & Citizen Charter
├── tax-payment.html         # Online Property / Water Tax Payment & Receipt
├── login.html               # Unified Citizen & Official Authentication
├── register.html            # Citizen Sign-Up with Mobile & Ward Validation
│
├── css/
│   └── style.css            # Custom government theme, badges, stepper & print rules
│
├── js/
│   ├── firebase-config.js   # Firebase SDK credentials & auto cloud/local switcher
│   ├── lang.js              # Full English & Marathi bilingual dictionary & reactive engine
│   ├── db.js                # Database CRUD operations, seed data & Storage helpers
│   ├── auth.js              # Session manager, demo quick-logins & route guards
│   └── ui.js                # Reusable navigation, footer, AI Chatbot & Toast alerts
│
├── firestore.rules          # Firestore Security Rules enforcing role access
├── storage.rules            # Firebase Storage Security Rules
└── README.md                # Project documentation & presentation guide
```

---

## 🚀 How to Run the Website Locally

You can run this website on any system using any modern web browser (Chrome, Edge, Safari, Firefox).

### Option 1: Using Python Built-in Web Server (Recommended)
Open your terminal and run:
```bash
cd /Users/aayanshaikh/.gemini/antigravity/scratch/digital-grampanchayat
python3 -m http.server 8080
```
Then open your browser and navigate to:
```
http://localhost:8080
```

### Option 2: Directly Open in Browser
Double-click `index.html` or open it with your browser.

---

## 🔑 Demo Login Credentials for Evaluation

For mini project presentations and teacher evaluations, quick one-click demo login buttons are provided on `login.html`:

| Role | Email | Password | Access Level |
|---|---|---|---|
| **Citizen (ग्रामस्थ)** | `citizen@grampanchayat.gov.in` | `Citizen@123` | Apply for certificates, file complaints, pay tax |
| **Admin (ग्रामसेवक)** | `admin@grampanchayat.gov.in` | `Admin@Panchayat2026` | Approve/reject certificates, update grievances, post notices |

---

## ⚡ Connecting to Live Firebase

To connect the application to your personal Firebase project:
1. Visit the [Firebase Console](https://console.firebase.google.com) and create a new project.
2. Enable **Email/Password** under **Authentication > Sign-in method**.
3. Create a **Cloud Firestore** database (in production or test mode).
4. Enable **Cloud Storage** for file attachments.
5. In your Firebase Project Settings, copy your `firebaseConfig` object and paste it into `js/firebase-config.js`:
   ```javascript
   const firebaseConfig = {
     apiKey: "YOUR_ACTUAL_API_KEY",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "123456789012",
     appId: "1:123456789012:web:abcdef..."
   };
   ```
6. Deploy `firestore.rules` and `storage.rules` via the Firebase CLI (`firebase deploy`).

---

## 🎓 Mini Project Viva Q&A Guide

**Q1: What is the main objective of this project?**  
*A: To bridge the digital divide in rural administration by providing a single-window e-Governance portal for villagers to apply for certificates, report civic grievances, track welfare schemes, and pay taxes without visiting the Panchayat office.*

**Q2: How does the bilingual engine work?**  
*A: The system uses a centralized internationalization engine (`lang.js`) with key-value dictionaries for English and Marathi. Using custom `data-i18n` DOM bindings and reactive custom events, language toggles update all titles, labels, and placeholders without refreshing the webpage.*

**Q3: How is security and Role-Based Access Control (RBAC) enforced?**  
*A: User profiles have distinct roles (`citizen` vs `admin`). Route guards in `auth.js` intercept unauthorized navigation to administrative views (`admin.html`). In live production, Firestore Security Rules (`firestore.rules`) restrict writes to certificates and notices exclusively to users with `role == 'admin'`.*

**Q4: How are file uploads handled?**  
*A: In live mode, files are uploaded directly to Firebase Storage with size (<10MB) and MIME-type validation. The download URL is then linked to the corresponding Firestore record. In offline/demo mode, high-fidelity data URLs are generated for instantaneous preview and inspection.*

---

© 2026 Digital Grampanchayat Portal. Developed for IT Engineering Mini Project & Community Engagement.
