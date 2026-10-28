/**
 * Digital Grampanchayat - Database & Storage Service Layer
 * Supports both Live Firebase Firestore/Storage and seamless local persistent fallback.
 */

// Initial Seed Data for immediate realistic presentation
const SEED_DATA = {
  announcements: [
    {
      announcementId: "ANN-2026-001",
      title: "Special Gram Sabha Meeting Notice | विशेष ग्रामसभा सूचना",
      description: "A special Gram Sabha will be held on 30th Oct at 10:00 AM at the Panchayat Bhavan. Discussion on the Annual Village Development Budget and Jal Jeevan Mission pipeline expansion. All adult citizens must attend.",
      date: "2026-10-30",
      category: "Gram Sabha",
      important: true
    },
    {
      announcementId: "ANN-2026-002",
      title: "Drinking Water Pipeline Repair - Temporary Disruption | जलवाहिनी दुरुस्ती",
      description: "Due to urgent valve replacement near Ward 3, water supply will remain suspended tomorrow between 8:00 AM to 2:00 PM. Citizens are requested to store sufficient water in advance.",
      date: "2026-10-29",
      category: "Water Supply",
      important: true
    },
    {
      announcementId: "ANN-2026-003",
      title: "Free Village Health Camp & Ayushman Golden Card Drive | मोफत आरोग्य शिबिर",
      description: "Primary Health Centre (PHC) in collaboration with Zilla Parishad is organizing a free health screening camp and on-the-spot Ayushman Bharat Golden Card registration at Samaj Mandir.",
      date: "2026-11-05",
      category: "Public Health",
      important: false
    },
    {
      announcementId: "ANN-2026-004",
      title: "MSEDCL Electricity Substation Maintenance | वीज पुरवठा दुरुस्ती",
      description: "Scheduled feeder maintenance by MSEDCL on Saturday from 11:00 AM to 4:00 PM. Power supply to agricultural pumps and domestic feeders will be affected.",
      date: "2026-11-02",
      category: "Electricity",
      important: false
    },
    {
      announcementId: "ANN-2026-005",
      title: "Sant Gadge Baba Cleanliness Campaign | संत गाडगेबाबा स्वच्छता मोहीम",
      description: "Village-wide cleanliness and tree plantation drive starts this Sunday. Active participation from youth clubs, self-help groups, and all villagers is requested.",
      date: "2026-11-08",
      category: "Sanitation",
      important: false
    }
  ],

  schemes: [
    {
      schemeId: "SCH-PMAY-G",
      schemeName: "Pradhan Mantri Awas Yojana - Gramin (PMAY-G)",
      description: "Financial assistance of ₹1,20,000 for constructing a pucca house with basic amenities for homeless rural families and those living in kutcha houses.",
      eligibility: "Rural families with no pucca house, SECC 2011 Deprivation list or Awas+ verified list, BPL / low-income households.",
      requiredDocuments: "Aadhaar Card, Bank Passbook, Land ownership proof / 7/12 extract or Gram Panchayat consent, Job Card, Passport size photos.",
      lastDate: "2026-12-31",
      category: "Housing",
      subsidy: "₹1,20,000 + 90 days MGNREGA wages",
      createdAt: "2026-01-15"
    },
    {
      schemeId: "SCH-PM-KISAN",
      schemeName: "PM Kisan Samman Nidhi (पीएम-किसान)",
      description: "Income support of ₹6,000 per year in three equal installments directly transferred to bank accounts of small and marginal landholding farmer families.",
      eligibility: "Landholding farmer families with cultivable land in their names. Valid e-KYC completed.",
      requiredDocuments: "Aadhaar Card, 7/12 Extract & 8A Holdings, Bank Account details linked to Aadhaar, Mobile Number.",
      lastDate: "Ongoing / Continual",
      category: "Agriculture",
      subsidy: "₹6,000 / year (3 installments)",
      createdAt: "2026-01-10"
    },
    {
      schemeId: "SCH-SBM-G",
      schemeName: "Swachh Bharat Mission (Gramin) - Individual Latrine",
      description: "Incentive of ₹12,000 for construction of an Individual Household Latrine (IHHL) to ensure 100% open defecation free village status.",
      eligibility: "Rural households without sanitary toilets, BPL families, identified APL families (SC/ST, women-headed, physically challenged).",
      requiredDocuments: "Aadhaar Card, Bank Account linked to Aadhaar, Ration Card, Pre-construction photo.",
      lastDate: "2026-11-30",
      category: "Sanitation",
      subsidy: "₹12,000 Direct Benefit Transfer",
      createdAt: "2026-02-01"
    },
    {
      schemeId: "SCH-JJM",
      schemeName: "Jal Jeevan Mission - Har Ghar Nal Se Jal",
      description: "Subsidized piped drinking water tap connection to every rural household with assured quality and adequate pressure.",
      eligibility: "All permanent residents of the Gram Panchayat with property tax clearance.",
      requiredDocuments: "Property Tax Receipt, Aadhaar Card, Water Connection Application Form.",
      lastDate: "2026-12-15",
      category: "Water Supply",
      subsidy: "Free connection pipe & meter setup",
      createdAt: "2026-02-20"
    },
    {
      schemeId: "SCH-PMUY",
      schemeName: "Pradhan Mantri Ujjwala Yojana 2.0 (मोफत गॅस योजना)",
      description: "Deposit-free LPG connection including security deposit, pressure regulator, LPG hose, domestic gas consumer card and first cylinder refill.",
      eligibility: "Adult woman belonging to poor rural family having no existing LPG connection in the household.",
      requiredDocuments: "Aadhaar of applicant & family members, Ration card, Bank IFSC & Account number, Supplementary KYC.",
      lastDate: "2026-11-20",
      category: "Women & Child",
      subsidy: "100% Free LPG kit + Stove support",
      createdAt: "2026-03-01"
    },
    {
      schemeId: "SCH-DRIP",
      schemeName: "MahaDBT Micro-Irrigation Drip Subsidy (ठिबक सिंचन योजना)",
      description: "Up to 80% capital subsidy on Drip and Sprinkler irrigation systems for small and marginal farmers to conserve groundwater.",
      eligibility: "Farmers with verified agricultural land holding, functional water source (well/borewell/canal).",
      requiredDocuments: "7/12 & 8-A extract, Water source certificate, Soil/Water test report, Quotation from authorized dealer.",
      lastDate: "2026-12-20",
      category: "Agriculture",
      subsidy: "75% to 80% of total system cost",
      createdAt: "2026-03-10"
    }
  ],

  complaints: [
    {
      complaintId: "GP-CMP-2026-1001",
      userId: "user_rajesh",
      userName: "Rajesh Ramdas Patil",
      userMobile: "9822104523",
      category: "Electricity",
      title: "Broken Street Light in Ward 2 Ambedkar Chowk",
      description: "Street light pole no. 14 has been unlit for 5 days. It is causing darkness and safety hazards for pedestrians and children in the evening.",
      location: "Ward No. 2, Near Ambedkar Chowk",
      imageUrl: "https://images.unsplash.com/photo-1516245834210-c4c142787335?auto=format&fit=crop&w=600&q=80",
      status: "In Progress",
      officerRemarks: "Field electrician Shri Gaikwad assigned on 28th Oct. Replacement bulb and wiring in progress.",
      createdAt: "2026-10-26T10:15:00.000Z"
    },
    {
      complaintId: "GP-CMP-2026-1002",
      userId: "user_sunita",
      userName: "Sunita Mahadev Shinde",
      userMobile: "9422319801",
      category: "Water Supply",
      title: "Major water pipeline leakage near Bus Stand",
      description: "Fresh drinking water pipeline has ruptured and is flooding the road since morning. Drinking water is getting wasted.",
      location: "Main Road, Opposite S.T. Bus Stand",
      imageUrl: "https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80",
      status: "Resolved",
      officerRemarks: "Repair crew dispatched at 11:30 AM. Broken collar replaced and leak plugged successfully. Water pressure restored.",
      createdAt: "2026-10-24T08:30:00.000Z"
    },
    {
      complaintId: "GP-CMP-2026-1003",
      userId: "user_anand",
      userName: "Anand Vitthal Deshmukh",
      userMobile: "9881123490",
      category: "Drainage",
      title: "Open drainage overflow near Z.P. Primary School",
      description: "Drainage channel is blocked with plastic waste and overflowing onto the pedestrian pathway. Pungent smell and mosquito menace.",
      location: "Zilla Parishad Primary School Road, Ward 4",
      imageUrl: "https://images.unsplash.com/photo-1621451537084-482c73073a0f?auto=format&fit=crop&w=600&q=80",
      status: "Under Review",
      officerRemarks: "Noted by Sanitation Inspector. Sanitation truck scheduled for tomorrow morning cleaning.",
      createdAt: "2026-10-27T14:45:00.000Z"
    },
    {
      complaintId: "GP-CMP-2026-1004",
      userId: "user_rajesh",
      userName: "Rajesh Ramdas Patil",
      userMobile: "9822104523",
      category: "Roads",
      title: "Deep pothole at Market Yard entry",
      description: "A large pothole has formed following recent rains. Two-wheelers are skidding frequently.",
      location: "Weekly Bazaar Yard, South Gate",
      imageUrl: "https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=600&q=80",
      status: "Submitted",
      officerRemarks: "Application received. Forwarded to Engineering Section for gravel filling.",
      createdAt: "2026-10-28T09:20:00.000Z"
    }
  ],

  certificates: [
    {
      certificateId: "GP-CERT-2026-5001",
      userId: "user_rajesh",
      certificateType: "Income Certificate",
      applicantName: "Rajesh Ramdas Patil",
      mobile: "9822104523",
      aadhar: "4412 8890 1234",
      address: "House No. 142, Shivaji Galli, Ward No. 1",
      ward: "Ward 1",
      dob: "1988-04-12",
      incomeAmount: "65,000",
      occupation: "Farmer / Agriculture",
      documentUrls: ["sample_ration_card.pdf", "sample_aadhar.pdf"],
      status: "Approved",
      adminRemarks: "Documents verified with Talathi record. Issued valid for 1 year.",
      createdAt: "2026-10-22T11:00:00.000Z",
      approvedDate: "2026-10-24"
    },
    {
      certificateId: "GP-CERT-2026-5002",
      userId: "user_sunita",
      certificateType: "Residence Certificate",
      applicantName: "Sunita Mahadev Shinde",
      mobile: "9422319801",
      aadhar: "8890 2234 5512",
      address: "Plot 18, Ganpati Mandir Marg, Ward 3",
      ward: "Ward 3",
      dob: "1994-08-19",
      incomeAmount: "",
      occupation: "Self Employed",
      documentUrls: ["electricity_bill.pdf"],
      status: "Under Review",
      adminRemarks: "Physical verification of residence under process by Gram Sevak.",
      createdAt: "2026-10-26T16:20:00.000Z"
    },
    {
      certificateId: "GP-CERT-2026-5003",
      userId: "user_rajesh",
      certificateType: "Birth Certificate",
      applicantName: "Aarav Rajesh Patil (Child)",
      parentName: "Rajesh Ramdas Patil & Meena Patil",
      mobile: "9822104523",
      aadhar: "Parent Aadhaar: 4412 8890 1234",
      address: "House No. 142, Shivaji Galli, Ward No. 1",
      ward: "Ward 1",
      dob: "2026-09-15",
      placeOfBirth: "PHC Rural Hospital, Ward 2",
      documentUrls: ["hospital_birth_discharge.pdf"],
      status: "Approved",
      adminRemarks: "Matched with Birth Register Vol 12, Page 88. Digitally Stamped.",
      createdAt: "2026-10-18T10:00:00.000Z",
      approvedDate: "2026-10-20"
    }
  ],

  users: [
    {
      userId: "user_citizen_demo",
      name: "Rajesh Ramdas Patil",
      email: "citizen@grampanchayat.gov.in",
      mobile: "9822104523",
      address: "House No. 142, Shivaji Galli, Ward No. 1",
      ward: "Ward 1",
      role: "citizen",
      createdAt: "2026-01-01T00:00:00.000Z"
    },
    {
      userId: "user_admin_demo",
      name: "Anand Kulkarni (Gram Sevak)",
      email: "admin@grampanchayat.gov.in",
      mobile: "9422001122",
      address: "Gram Panchayat Bhavan Official Quarters",
      ward: "Admin HQ",
      role: "admin",
      createdAt: "2026-01-01T00:00:00.000Z"
    }
  ]
};

class DatabaseService {
  constructor() {
    this.initStorage();
  }

  initStorage() {
    // If local storage is empty, initialize with rich seed data
    ['announcements', 'schemes', 'complaints', 'certificates', 'users'].forEach(key => {
      const stored = localStorage.getItem(`gp_${key}`);
      if (!stored) {
        localStorage.setItem(`gp_${key}`, JSON.stringify(SEED_DATA[key]));
      }
    });
  }

  // Generic local store helper
  getLocal(collection) {
    try {
      const data = localStorage.getItem(`gp_${collection}`);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.error(`Error reading ${collection}:`, e);
      return [];
    }
  }

  saveLocal(collection, data) {
    try {
      localStorage.setItem(`gp_${collection}`, JSON.stringify(data));
    } catch (e) {
      console.error(`Error writing ${collection}:`, e);
    }
  }

  /* ----------------- ANNOUNCEMENTS ----------------- */
  async getAnnouncements() {
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('announcements').orderBy('date', 'desc').get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ ...d.data(), id: d.id }));
        }
      } catch (e) {
        console.warn("Firestore announcements read fallback:", e.message);
      }
    }
    return this.getLocal('announcements');
  }

  async addAnnouncement(announcement) {
    const newDoc = {
      announcementId: `ANN-2026-${String(Date.now()).slice(-4)}`,
      createdAt: new Date().toISOString(),
      ...announcement
    };

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        await window.fbFirestore.collection('announcements').add(newDoc);
      } catch (e) {
        console.warn("Firestore announcement add fallback:", e.message);
      }
    }

    const items = this.getLocal('announcements');
    items.unshift(newDoc);
    this.saveLocal('announcements', items);
    return newDoc;
  }

  async deleteAnnouncement(announcementId) {
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('announcements').where('announcementId', '==', announcementId).get();
        snap.forEach(d => d.ref.delete());
      } catch (e) {
        console.warn("Firestore announcement delete fallback:", e.message);
      }
    }

    const items = this.getLocal('announcements').filter(a => a.announcementId !== announcementId);
    this.saveLocal('announcements', items);
    return true;
  }

  /* ----------------- GOVERNMENT SCHEMES ----------------- */
  async getSchemes() {
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('schemes').get();
        if (!snap.empty) {
          return snap.docs.map(d => ({ ...d.data(), id: d.id }));
        }
      } catch (e) {
        console.warn("Firestore schemes read fallback:", e.message);
      }
    }
    return this.getLocal('schemes');
  }

  async addScheme(scheme) {
    const newDoc = {
      schemeId: `SCH-${String(Date.now()).slice(-5)}`,
      createdAt: new Date().toISOString(),
      ...scheme
    };

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        await window.fbFirestore.collection('schemes').add(newDoc);
      } catch (e) {
        console.warn("Firestore scheme add fallback:", e.message);
      }
    }

    const items = this.getLocal('schemes');
    items.push(newDoc);
    this.saveLocal('schemes', items);
    return newDoc;
  }

  async updateScheme(schemeId, updatedFields) {
    const items = this.getLocal('schemes');
    const index = items.findIndex(s => s.schemeId === schemeId);
    if (index !== -1) {
      items[index] = { ...items[index], ...updatedFields };
      this.saveLocal('schemes', items);
    }
    return true;
  }

  async deleteScheme(schemeId) {
    const items = this.getLocal('schemes').filter(s => s.schemeId !== schemeId);
    this.saveLocal('schemes', items);
    return true;
  }

  /* ----------------- COMPLAINTS ----------------- */
  async getComplaints(filter = {}) {
    let items = [];
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('complaints').orderBy('createdAt', 'desc').get();
        if (!snap.empty) {
          items = snap.docs.map(d => ({ ...d.data(), id: d.id }));
        }
      } catch (e) {
        console.warn("Firestore complaints fallback:", e.message);
      }
    }

    if (items.length === 0) {
      items = this.getLocal('complaints');
    }

    if (filter.userId) {
      items = items.filter(c => c.userId === filter.userId);
    }
    if (filter.status && filter.status !== 'All') {
      items = items.filter(c => c.status === filter.status);
    }
    if (filter.category && filter.category !== 'All') {
      items = items.filter(c => c.category === filter.category);
    }
    return items;
  }

  async getComplaintById(complaintId) {
    const complaints = await this.getComplaints();
    return complaints.find(c => c.complaintId.toUpperCase() === complaintId.toUpperCase().trim());
  }

  async addComplaint(complaint) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newDoc = {
      complaintId: `GP-CMP-2026-${randomSuffix}`,
      status: "Submitted",
      officerRemarks: "Grievance registered. Forwarded to respective department officer for preliminary inspection.",
      createdAt: new Date().toISOString(),
      ...complaint
    };

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        await window.fbFirestore.collection('complaints').add(newDoc);
      } catch (e) {
        console.warn("Firestore complaint add fallback:", e.message);
      }
    }

    const items = this.getLocal('complaints');
    items.unshift(newDoc);
    this.saveLocal('complaints', items);
    return newDoc;
  }

  async updateComplaintStatus(complaintId, status, officerRemarks) {
    const items = this.getLocal('complaints');
    const index = items.findIndex(c => c.complaintId === complaintId);
    if (index !== -1) {
      items[index].status = status;
      if (officerRemarks !== undefined) {
        items[index].officerRemarks = officerRemarks;
      }
      items[index].updatedAt = new Date().toISOString();
      this.saveLocal('complaints', items);
    }

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('complaints').where('complaintId', '==', complaintId).get();
        snap.forEach(d => d.ref.update({ status, officerRemarks, updatedAt: new Date().toISOString() }));
      } catch (e) {
        console.warn("Firestore complaint update fallback:", e.message);
      }
    }

    return true;
  }

  /* ----------------- CERTIFICATES ----------------- */
  async getCertificates(filter = {}) {
    let items = [];
    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('certificates').orderBy('createdAt', 'desc').get();
        if (!snap.empty) {
          items = snap.docs.map(d => ({ ...d.data(), id: d.id }));
        }
      } catch (e) {
        console.warn("Firestore certificates fallback:", e.message);
      }
    }

    if (items.length === 0) {
      items = this.getLocal('certificates');
    }

    if (filter.userId) {
      items = items.filter(c => c.userId === filter.userId);
    }
    if (filter.status && filter.status !== 'All') {
      items = items.filter(c => c.status === filter.status);
    }
    return items;
  }

  async getCertificateById(certificateId) {
    const certs = await this.getCertificates();
    return certs.find(c => c.certificateId.toUpperCase() === certificateId.toUpperCase().trim());
  }

  async addCertificate(certData) {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const newDoc = {
      certificateId: `GP-CERT-2026-${randomSuffix}`,
      status: "Pending",
      adminRemarks: "Application received and queued for scrutiny by the Gram Sevak.",
      createdAt: new Date().toISOString(),
      ...certData
    };

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        await window.fbFirestore.collection('certificates').add(newDoc);
      } catch (e) {
        console.warn("Firestore certificate add fallback:", e.message);
      }
    }

    const items = this.getLocal('certificates');
    items.unshift(newDoc);
    this.saveLocal('certificates', items);
    return newDoc;
  }

  async updateCertificateStatus(certificateId, status, adminRemarks) {
    const items = this.getLocal('certificates');
    const index = items.findIndex(c => c.certificateId === certificateId);
    if (index !== -1) {
      items[index].status = status;
      if (adminRemarks !== undefined) {
        items[index].adminRemarks = adminRemarks;
      }
      if (status === 'Approved') {
        items[index].approvedDate = new Date().toISOString().split('T')[0];
      }
      this.saveLocal('certificates', items);
    }

    if (window.FIREBASE_READY && window.fbFirestore) {
      try {
        const snap = await window.fbFirestore.collection('certificates').where('certificateId', '==', certificateId).get();
        snap.forEach(d => d.ref.update({ status, adminRemarks, updatedAt: new Date().toISOString() }));
      } catch (e) {
        console.warn("Firestore cert update fallback:", e.message);
      }
    }

    return true;
  }

  /* ----------------- USERS ----------------- */
  async getUsers() {
    return this.getLocal('users');
  }

  async addUser(user) {
    const items = this.getLocal('users');
    items.push(user);
    this.saveLocal('users', items);
    return user;
  }

  /* ----------------- FILE UPLOAD HELPER ----------------- */
  async uploadFile(file, folder = 'documents') {
    // If live Firebase Storage is active
    if (window.FIREBASE_READY && window.fbStorage && file instanceof File) {
      try {
        const storageRef = window.fbStorage.ref(`${folder}/${Date.now()}_${file.name}`);
        const snapshot = await storageRef.put(file);
        const downloadUrl = await snapshot.ref.getDownloadURL();
        return downloadUrl;
      } catch (e) {
        console.warn("Firebase Storage upload error, falling back to data URL:", e.message);
      }
    }

    // High fidelity data URL fallback for instant file preview
    return new Promise((resolve) => {
      if (!file) {
        resolve("https://images.unsplash.com/photo-1584824486509-112e4181ff6b?auto=format&fit=crop&w=600&q=80");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = () => resolve("sample_document_uploaded.pdf");
      reader.readAsDataURL(file);
    });
  }

  /* ----------------- RESET / RE-SEED DATA ----------------- */
  resetDemoData() {
    localStorage.removeItem('gp_announcements');
    localStorage.removeItem('gp_schemes');
    localStorage.removeItem('gp_complaints');
    localStorage.removeItem('gp_certificates');
    localStorage.removeItem('gp_users');
    this.initStorage();
    return true;
  }
}

window.db = new DatabaseService();
