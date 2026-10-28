/**
 * Digital Grampanchayat - UI Component Framework & Interactive Widgets
 * Includes: Reusable Navigation, Footer, Toast Notifications, Modals, and AI "Gram Sahayak" Chatbot
 */

class UIManager {
  constructor() {
    this.initNavbar();
    this.initFooter();
    this.initChatbot();
    this.initAccessibility();
    this.initToasts();
  }

  /* ----------------- TOPBAR & NAVBAR ----------------- */
  initNavbar() {
    const navPlaceholder = document.getElementById('navbar-container');
    if (!navPlaceholder) return;

    const currentUser = window.auth ? window.auth.getUser() : null;
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    const userPillHtml = currentUser
      ? `
        <div class="relative group">
          <button class="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg border border-white/20 text-sm font-medium transition">
            <span class="w-7 h-7 rounded-full bg-amber-400 text-gov-navy flex items-center justify-center font-bold text-xs uppercase">
              ${currentUser.name.charAt(0)}
            </span>
            <span class="hidden md:inline max-w-[120px] truncate">${currentUser.name}</span>
            <i class="fa-solid fa-chevron-down text-xs opacity-75"></i>
          </button>
          
          <div class="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block transition z-50">
            <div class="px-4 py-2 border-b border-slate-100">
              <p class="text-xs text-slate-500">Signed in as</p>
              <p class="text-sm font-semibold text-slate-800 truncate">${currentUser.name}</p>
              <span class="inline-block mt-1 px-2 py-0.5 text-[10px] uppercase font-bold rounded ${currentUser.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-emerald-100 text-emerald-700'}">
                ${currentUser.role}
              </span>
            </div>
            
            ${currentUser.role === 'admin' 
              ? `<a href="admin.html" class="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-gauge-high text-gov-navy w-4"></i> Admin Console</a>`
              : `<a href="dashboard.html" class="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-user-circle text-gov-navy w-4"></i> Citizen Dashboard</a>`
            }
            <a href="apply-certificate.html" class="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-file-signature text-gov-navy w-4"></i> Apply Certificate</a>
            <a href="submit-complaint.html" class="flex items-center gap-2.5 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"><i class="fa-solid fa-bullhorn text-gov-navy w-4"></i> Register Grievance</a>
            <div class="border-t border-slate-100 my-1"></div>
            <button onclick="window.auth.logout()" class="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm text-rose-600 hover:bg-rose-50"><i class="fa-solid fa-arrow-right-from-bracket w-4"></i> Logout</button>
          </div>
        </div>
      `
      : `
        <div class="flex items-center gap-2">
          <a href="login.html" class="px-3.5 py-1.5 rounded-lg text-sm font-semibold text-white hover:bg-white/10 transition border border-white/20">
            <i class="fa-solid fa-right-to-bracket mr-1.5"></i>
            <span data-i18n="navLogin">Login</span>
          </a>
          <a href="register.html" class="px-3.5 py-1.5 rounded-lg text-sm font-semibold bg-gov-saffron hover:bg-amber-600 text-white transition shadow-sm">
            <i class="fa-solid fa-user-plus mr-1.5"></i>
            <span data-i18n="navRegister">Register</span>
          </a>
        </div>
      `;

    navPlaceholder.innerHTML = `
      <!-- Tiranga Banner Strip -->
      <div class="tiranga-strip"></div>

      <!-- Official Top Announcement & Accessibility Bar -->
      <div class="bg-gov-navy-dark text-slate-200 text-xs py-1.5 px-4 border-b border-slate-700/50">
        <div class="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div class="flex items-center gap-3">
            <span class="flex items-center gap-1.5 text-amber-300 font-medium">
              <i class="fa-solid fa-landmark text-[11px]"></i>
              <span data-i18n="govtDept">Rural Development & Panchayati Raj Dept. | Government of Maharashtra</span>
            </span>
          </div>

          <div class="flex items-center gap-4">
            <!-- Helpline -->
            <span class="hidden lg:inline text-slate-300">
              <i class="fa-solid fa-phone-volume text-emerald-400 mr-1"></i>
              <span data-i18n="helpline">Helpline: 1800-120-8040 (Toll Free)</span>
            </span>

            <!-- Font Size Accessibility -->
            <div class="flex items-center gap-1 bg-white/10 rounded px-1.5 py-0.5 text-[11px]">
              <button onclick="window.ui.changeFontSize(-1)" title="Decrease Font" class="px-1 hover:text-white">A-</button>
              <button onclick="window.ui.resetFontSize()" title="Reset Font" class="px-1 font-bold text-amber-300 hover:text-white">A</button>
              <button onclick="window.ui.changeFontSize(1)" title="Increase Font" class="px-1 hover:text-white">A+</button>
            </div>

            <!-- Language Switcher Pill -->
            <div class="flex items-center bg-white/15 p-0.5 rounded-lg border border-white/20 text-xs">
              <button class="lang-btn px-2 py-0.5 rounded-md transition font-medium" data-lang="en">English</button>
              <button class="lang-btn px-2 py-0.5 rounded-md transition font-medium" data-lang="mr">मराठी</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Navigation Header -->
      <header class="bg-gov-navy text-white sticky top-0 z-50 shadow-md">
        <div class="max-w-7xl mx-auto px-4 sm:px-6">
          <div class="flex items-center justify-between h-20">
            
            <!-- Logo & Title -->
            <a href="index.html" class="flex items-center gap-3.5 group">
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center p-1.5 shadow-md border-2 border-amber-400 group-hover:scale-105 transition">
                <svg viewBox="0 0 100 100" class="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <!-- Emblematical Village / Chakra / Sun Design -->
                  <circle cx="50" cy="50" r="46" stroke="#0b3b60" stroke-width="4" fill="#fffdfa"/>
                  <circle cx="50" cy="50" r="16" fill="#f37021"/>
                  <path d="M50 12 L50 22 M50 78 L50 88 M12 50 L22 50 M78 50 L88 50 M24 24 L31 31 M69 69 L76 76 M24 76 L31 69 M69 31 L76 24" stroke="#0b3b60" stroke-width="3" stroke-linecap="round"/>
                  <path d="M26 68 C36 56 64 56 74 68 L74 74 L26 74 Z" fill="#138808"/>
                  <path d="M50 40 L40 54 L60 54 Z" fill="#0b3b60"/>
                </svg>
              </div>
              <div>
                <span class="block text-xl font-bold tracking-tight text-white flex items-center gap-2">
                  <span data-i18n="portalTitle">Digital Grampanchayat</span>
                  <span class="hidden sm:inline-block bg-amber-400 text-gov-navy text-[10px] font-extrabold uppercase px-1.5 py-0.5 rounded">e-Portal</span>
                </span>
                <span class="block text-xs text-amber-200/90 font-medium" data-i18n="portalSubtitle">Services at Your Fingertips</span>
              </div>
            </a>

            <!-- Desktop Nav Links -->
            <nav class="hidden lg:flex items-center gap-1 font-medium text-sm">
              <a href="index.html" class="px-3 py-2 rounded-lg hover:bg-white/10 transition ${currentPath === 'index.html' ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                <i class="fa-solid fa-house-chimney text-xs mr-1 opacity-80"></i>
                <span data-i18n="navHome">Home</span>
              </a>

              <div class="relative group">
                <button class="px-3 py-2 rounded-lg hover:bg-white/10 transition flex items-center gap-1.5 ${['services.html', 'apply-certificate.html', 'submit-complaint.html', 'tax-payment.html'].includes(currentPath) ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                  <i class="fa-solid fa-shapes text-xs opacity-80"></i>
                  <span data-i18n="navServices">Services</span>
                  <i class="fa-solid fa-chevron-down text-[10px] opacity-70"></i>
                </button>
                <div class="absolute left-0 mt-1 w-56 bg-white text-slate-800 rounded-xl shadow-xl border border-slate-100 py-2 hidden group-hover:block transition z-50">
                  <a href="apply-certificate.html" class="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm">
                    <i class="fa-solid fa-certificate text-gov-navy w-4"></i>
                    <span data-i18n="navCertificates">Certificates</span>
                  </a>
                  <a href="submit-complaint.html" class="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm">
                    <i class="fa-solid fa-triangle-exclamation text-gov-navy w-4"></i>
                    <span data-i18n="navComplaints">Complaints</span>
                  </a>
                  <a href="tax-payment.html" class="flex items-center gap-2 px-4 py-2 hover:bg-slate-50 text-sm">
                    <i class="fa-solid fa-receipt text-gov-navy w-4"></i>
                    <span data-i18n="navTax">Tax Payments</span>
                  </a>
                </div>
              </div>

              <a href="schemes.html" class="px-3 py-2 rounded-lg hover:bg-white/10 transition ${currentPath === 'schemes.html' ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                <i class="fa-solid fa-hand-holding-heart text-xs mr-1 opacity-80"></i>
                <span data-i18n="navSchemes">Government Schemes</span>
              </a>

              <a href="announcements.html" class="px-3 py-2 rounded-lg hover:bg-white/10 transition ${currentPath === 'announcements.html' ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                <i class="fa-solid fa-bullhorn text-xs mr-1 opacity-80"></i>
                <span data-i18n="navAnnouncements">Announcements</span>
              </a>

              <a href="about.html" class="px-3 py-2 rounded-lg hover:bg-white/10 transition ${currentPath === 'about.html' ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                <i class="fa-solid fa-circle-info text-xs mr-1 opacity-80"></i>
                <span data-i18n="navAbout">About Us</span>
              </a>

              <a href="contact.html" class="px-3 py-2 rounded-lg hover:bg-white/10 transition ${currentPath === 'contact.html' ? 'text-amber-300 font-bold bg-white/10' : 'text-slate-100'}">
                <i class="fa-solid fa-address-book text-xs mr-1 opacity-80"></i>
                <span data-i18n="navContact">Contact</span>
              </a>
            </nav>

            <!-- User Auth Buttons & Mobile Menu Toggle -->
            <div class="flex items-center gap-3">
              ${userPillHtml}

              <!-- Mobile Hamburger Button -->
              <button id="mobile-menu-btn" class="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition">
                <i class="fa-solid fa-bars text-lg"></i>
              </button>
            </div>

          </div>
        </div>

        <!-- Mobile Drawer Navigation -->
        <div id="mobile-menu" class="hidden lg:hidden bg-gov-navy-dark border-t border-slate-700 px-4 pt-3 pb-6 space-y-2">
          <a href="index.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-house-chimney mr-2 w-4"></i> <span data-i18n="navHome">Home</span></a>
          <a href="apply-certificate.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-certificate mr-2 w-4"></i> <span data-i18n="navCertificates">Certificates</span></a>
          <a href="submit-complaint.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-triangle-exclamation mr-2 w-4"></i> <span data-i18n="navComplaints">Complaints</span></a>
          <a href="schemes.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-hand-holding-heart mr-2 w-4"></i> <span data-i18n="navSchemes">Government Schemes</span></a>
          <a href="announcements.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-bullhorn mr-2 w-4"></i> <span data-i18n="navAnnouncements">Announcements</span></a>
          <a href="tax-payment.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-receipt mr-2 w-4"></i> <span data-i18n="navTax">Tax Payments</span></a>
          <a href="about.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-circle-info mr-2 w-4"></i> <span data-i18n="navAbout">About Us</span></a>
          <a href="contact.html" class="block px-3 py-2 rounded-md font-medium text-slate-100 hover:bg-white/10"><i class="fa-solid fa-address-book mr-2 w-4"></i> <span data-i18n="navContact">Contact</span></a>
          
          <div class="pt-2 border-t border-slate-700/60">
            ${currentUser 
              ? `<a href="${currentUser.role === 'admin' ? 'admin.html' : 'dashboard.html'}" class="block px-3 py-2 rounded-md font-semibold text-amber-300 hover:bg-white/10"><i class="fa-solid fa-gauge mr-2"></i> Dashboard</a>
                 <button onclick="window.auth.logout()" class="w-full text-left px-3 py-2 rounded-md font-semibold text-rose-400 hover:bg-white/10"><i class="fa-solid fa-arrow-right-from-bracket mr-2"></i> Logout</button>`
              : `<a href="login.html" class="block px-3 py-2 rounded-md font-semibold text-amber-300 hover:bg-white/10"><i class="fa-solid fa-right-to-bracket mr-2"></i> Citizen / Admin Login</a>`
            }
          </div>
        </div>
      </header>
    `;

    // Toggle mobile menu
    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });
    }

    if (window.langManager) {
      window.langManager.applyLanguage(window.langManager.currentLang);
    }
  }

  /* ----------------- FOOTER ----------------- */
  initFooter() {
    const footerPlaceholder = document.getElementById('footer-container');
    if (!footerPlaceholder) return;

    footerPlaceholder.innerHTML = `
      <footer class="bg-gov-navy-dark text-slate-300 mt-auto border-t-4 border-gov-saffron">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
            
            <!-- Col 1: About Portal -->
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-10 h-10 rounded-full bg-white flex items-center justify-center p-1 border-2 border-amber-400">
                  <i class="fa-solid fa-landmark text-gov-navy text-lg"></i>
                </div>
                <div>
                  <h4 class="text-white font-bold text-base" data-i18n="portalTitle">Digital Grampanchayat</h4>
                  <p class="text-xs text-amber-300/80">Government of Maharashtra</p>
                </div>
              </div>
              <p class="text-xs text-slate-300 leading-relaxed mb-4" data-i18n="footerAbout">
                Digital Grampanchayat is an online governance initiative designed to deliver transparent, accountable, and prompt administrative services to rural citizens.
              </p>
              <div class="flex items-center gap-2 text-xs text-emerald-400 font-medium">
                <i class="fa-solid fa-shield-halved"></i>
                <span>SSL Encrypted & Certified e-Governance</span>
              </div>
            </div>

            <!-- Col 2: Citizen Services -->
            <div>
              <h5 class="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2">
                Citizen Services
              </h5>
              <ul class="space-y-2 text-xs">
                <li><a href="apply-certificate.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Apply for Income Certificate</a></li>
                <li><a href="apply-certificate.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Apply for Residence Certificate</a></li>
                <li><a href="apply-certificate.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Birth & Death Certificate</a></li>
                <li><a href="submit-complaint.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Register Public Grievance</a></li>
                <li><a href="my-complaints.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Track Complaint Status</a></li>
                <li><a href="tax-payment.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Online Property / Water Tax</a></li>
              </ul>
            </div>

            <!-- Col 3: Government Links -->
            <div>
              <h5 class="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2" data-i18n="footerImportantLinks">
                Important Links
              </h5>
              <ul class="space-y-2 text-xs">
                <li><a href="schemes.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Pradhan Mantri Awas Yojana (PMAY)</a></li>
                <li><a href="schemes.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> PM-KISAN Samman Nidhi</a></li>
                <li><a href="schemes.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Swachh Bharat Mission (Gramin)</a></li>
                <li><a href="announcements.html" class="hover:text-amber-300 transition flex items-center gap-1.5"><i class="fa-solid fa-angle-right text-[10px]"></i> Gram Sabha Resolutions & Circulars</a></li>
                <li><a href="admin.html" class="text-amber-400 font-semibold hover:underline flex items-center gap-1.5"><i class="fa-solid fa-lock text-[10px]"></i> Panchayat Official / Admin Portal</a></li>
              </ul>
            </div>

            <!-- Col 4: Contact & Office -->
            <div>
              <h5 class="text-white font-semibold text-sm uppercase tracking-wider mb-4 border-b border-slate-700 pb-2" data-i18n="footerContactInfo">
                Panchayat Office
              </h5>
              <ul class="space-y-2.5 text-xs text-slate-300">
                <li class="flex items-start gap-2">
                  <i class="fa-solid fa-location-dot text-amber-400 mt-0.5"></i>
                  <span data-i18n="footerAddress">Gram Panchayat Bhavan, Main Market Road, District Pune, Maharashtra - 412411</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fa-solid fa-phone text-emerald-400"></i>
                  <span data-i18n="footerPhone">+91 2135-224455 / 1800-120-8040</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fa-solid fa-envelope text-blue-400"></i>
                  <span data-i18n="footerEmail">contact@digitalgrampanchayat.gov.in</span>
                </li>
                <li class="flex items-center gap-2">
                  <i class="fa-solid fa-clock text-amber-300"></i>
                  <span data-i18n="officeHours">Office Hours: Mon - Sat: 10:00 AM - 5:00 PM</span>
                </li>
              </ul>
            </div>

          </div>

          <!-- Bottom Bar -->
          <div class="pt-6 mt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <p data-i18n="copyright">© 2026 Digital Grampanchayat Portal. Rural Development & Panchayati Raj Dept. All Rights Reserved.</p>
            <div class="flex items-center gap-4">
              <span class="text-slate-300 font-medium">Developed for IT Mini Project / Community Engagement</span>
            </div>
          </div>
        </div>
      </footer>
    `;

    if (window.langManager) {
      window.langManager.applyLanguage(window.langManager.currentLang);
    }
  }

  /* ----------------- ACCESSIBILITY FONT RESIZE ----------------- */
  initAccessibility() {
    this.currentFontSize = 16;
  }

  changeFontSize(delta) {
    this.currentFontSize = Math.min(22, Math.max(13, this.currentFontSize + delta));
    document.documentElement.style.setProperty('--base-font-size', `${this.currentFontSize}px`);
  }

  resetFontSize() {
    this.currentFontSize = 16;
    document.documentElement.style.setProperty('--base-font-size', `16px`);
  }

  /* ----------------- TOAST NOTIFICATIONS ----------------- */
  initToasts() {
    if (!document.getElementById('toast-container')) {
      const container = document.createElement('div');
      container.id = 'toast-container';
      document.body.appendChild(container);
    }
  }

  showToast(message, type = 'success') {
    this.initToasts();
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast-item flex items-center p-4 bg-white border border-slate-200 shadow-xl rounded-xl';

    const icons = {
      success: '<i class="fa-solid fa-circle-check text-emerald-500 text-xl mr-3"></i>',
      error: '<i class="fa-solid fa-circle-xmark text-rose-500 text-xl mr-3"></i>',
      warning: '<i class="fa-solid fa-triangle-exclamation text-amber-500 text-xl mr-3"></i>',
      info: '<i class="fa-solid fa-circle-info text-blue-500 text-xl mr-3"></i>'
    };

    toast.innerHTML = `
      ${icons[type] || icons.info}
      <div class="flex-1 text-sm font-medium text-slate-800">${message}</div>
      <button class="ml-3 text-slate-400 hover:text-slate-600 transition" onclick="this.parentElement.remove()">
        <i class="fa-solid fa-xmark"></i>
      </button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      toast.style.transition = 'all 0.3s ease-out';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  /* ----------------- AI CHATBOT: GRAM SAHAYAK (ग्राम सहाय्यक) ----------------- */
  initChatbot() {
    if (document.getElementById('gram-sahayak-widget')) return;

    const widget = document.createElement('div');
    widget.id = 'gram-sahayak-widget';
    widget.innerHTML = `
      <!-- Floating Action Bubble -->
      <button id="chatbot-toggle-btn" class="chatbot-bubble bg-gov-navy text-white w-14 h-14 rounded-full flex items-center justify-center border-2 border-amber-400 hover:bg-gov-navy-dark focus:outline-none">
        <i class="fa-solid fa-robot text-2xl text-amber-300"></i>
        <span class="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full"></span>
      </button>

      <!-- Chat Window Dialog -->
      <div id="chatbot-window" class="chatbot-window hidden">
        <!-- Header -->
        <div class="bg-gov-navy text-white px-4 py-3 flex items-center justify-between border-b-2 border-amber-400">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-white flex items-center justify-center p-1 text-gov-navy shadow">
              <i class="fa-solid fa-robot text-gov-navy text-lg"></i>
            </div>
            <div>
              <h4 class="text-sm font-bold leading-tight">Gram Sahayak AI</h4>
              <p class="text-[11px] text-amber-200">ग्राम सहाय्यक (Virtual Helpdesk)</p>
            </div>
          </div>
          <button id="chatbot-close-btn" class="text-white/80 hover:text-white transition p-1">
            <i class="fa-solid fa-xmark text-lg"></i>
          </button>
        </div>

        <!-- Message History -->
        <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50 text-xs">
          <!-- Initial Welcome Message -->
          <div class="flex items-start gap-2">
            <div class="w-7 h-7 rounded-full bg-gov-navy text-white flex items-center justify-center text-xs shrink-0 font-bold">
              GP
            </div>
            <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-slate-800 space-y-1.5 max-w-[85%]">
              <p class="font-semibold text-gov-navy">Namaskar! / नमस्कार! 🙏</p>
              <p>I am your Digital Grampanchayat Virtual Assistant. You can ask me questions in <strong>English</strong> or <strong>मराठी</strong>.</p>
              <div class="pt-1 flex flex-wrap gap-1">
                <button onclick="window.ui.handleChatQuickPrompt('How to apply for Income Certificate?')" class="bg-slate-100 hover:bg-amber-100 text-slate-700 text-[10px] px-2 py-1 rounded-full border border-slate-200 transition">📄 Income Certificate</button>
                <button onclick="window.ui.handleChatQuickPrompt('तक्रार कशी नोंदवायची?')" class="bg-slate-100 hover:bg-amber-100 text-slate-700 text-[10px] px-2 py-1 rounded-full border border-slate-200 transition">📢 तक्रार नोंदणी</button>
                <button onclick="window.ui.handleChatQuickPrompt('PMAY housing scheme details')" class="bg-slate-100 hover:bg-amber-100 text-slate-700 text-[10px] px-2 py-1 rounded-full border border-slate-200 transition">🏡 PMAY Yojana</button>
                <button onclick="window.ui.handleChatQuickPrompt('Office hours and helpline')" class="bg-slate-100 hover:bg-amber-100 text-slate-700 text-[10px] px-2 py-1 rounded-full border border-slate-200 transition">🕒 Office Timing</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Chat Input Form -->
        <form id="chat-form" class="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input type="text" id="chat-input" placeholder="Type your query (English / मराठी)..." class="flex-1 px-3 py-2 text-xs border border-slate-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-gov-navy" required autocomplete="off" />
          <button type="submit" class="bg-gov-navy text-white px-3 py-2 rounded-lg hover:bg-gov-navy-dark transition text-xs font-semibold">
            <i class="fa-solid fa-paper-plane"></i>
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(widget);

    // Event listeners for chatbot
    const toggleBtn = document.getElementById('chatbot-toggle-btn');
    const closeBtn = document.getElementById('chatbot-close-btn');
    const windowEl = document.getElementById('chatbot-window');
    const formEl = document.getElementById('chat-form');

    toggleBtn.addEventListener('click', () => {
      windowEl.classList.toggle('hidden');
    });

    closeBtn.addEventListener('click', () => {
      windowEl.classList.add('hidden');
    });

    formEl.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('chat-input');
      const text = input.value.trim();
      if (!text) return;
      this.sendChatMessage(text);
      input.value = '';
    });
  }

  handleChatQuickPrompt(text) {
    this.sendChatMessage(text);
  }

  sendChatMessage(userText) {
    const container = document.getElementById('chat-messages');
    
    // Append user bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'flex items-end justify-end gap-2';
    userBubble.innerHTML = `
      <div class="bg-gov-navy text-white p-3 rounded-2xl rounded-tr-none shadow-sm text-xs max-w-[85%]">
        ${userText}
      </div>
    `;
    container.appendChild(userBubble);
    container.scrollTop = container.scrollHeight;

    // Simulate thinking state
    const thinkingId = 'thinking-' + Date.now();
    const thinkingBubble = document.createElement('div');
    thinkingBubble.id = thinkingId;
    thinkingBubble.className = 'flex items-start gap-2';
    thinkingBubble.innerHTML = `
      <div class="w-7 h-7 rounded-full bg-gov-navy text-white flex items-center justify-center text-xs shrink-0">GP</div>
      <div class="bg-white p-2.5 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-slate-500 italic text-[11px]">
        <i class="fa-solid fa-spinner fa-spin mr-1"></i> Thinking...
      </div>
    `;
    container.appendChild(thinkingBubble);
    container.scrollTop = container.scrollHeight;

    setTimeout(() => {
      const el = document.getElementById(thinkingId);
      if (el) el.remove();
      const reply = this.generateBotResponse(userText);

      const botBubble = document.createElement('div');
      botBubble.className = 'flex items-start gap-2';
      botBubble.innerHTML = `
        <div class="w-7 h-7 rounded-full bg-gov-navy text-white flex items-center justify-center text-xs shrink-0 font-bold">GP</div>
        <div class="bg-white p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-200 text-slate-800 text-xs leading-relaxed max-w-[85%]">
          ${reply}
        </div>
      `;
      container.appendChild(botBubble);
      container.scrollTop = container.scrollHeight;
    }, 600);
  }

  generateBotResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('income') || q.includes('उत्पन्न')) {
      return `<strong>Income Certificate (उत्पन्न दाखला):</strong><br>
        1. Click <a href="apply-certificate.html" class="text-blue-600 underline font-semibold">Apply Certificate</a>.<br>
        2. Choose <em>Income Certificate</em>.<br>
        3. Upload Ration Card and Aadhaar Card copy.<br>
        4. Application is typically verified by Gram Sevak within 2 working days.`;
    }

    if (q.includes('complaint') || q.includes('तक्रार') || q.includes('grievance') || q.includes('water') || q.includes('light') || q.includes('road')) {
      return `<strong>Grievance Registration:</strong><br>
        You can report water pipeline leaks, damaged street lights, drainage issues, or road potholes under <a href="submit-complaint.html" class="text-blue-600 underline font-semibold">Submit Complaint</a>.<br>
        You can also upload a live photo of the issue for faster resolution.`;
    }

    if (q.includes('pmay') || q.includes('awas') || q.includes('घरकुल') || q.includes('योजना') || q.includes('scheme') || q.includes('kisan')) {
      return `<strong>Government Schemes:</strong><br>
        Active welfare schemes include <strong>PMAY-G</strong> (₹1.20 Lakh house subsidy), <strong>PM-KISAN</strong> (₹6,000/yr for farmers), and <strong>Swachh Bharat Latrine Subsidy</strong> (₹12,000).<br>
        Check eligibility & required documents in our <a href="schemes.html" class="text-blue-600 underline font-semibold">Schemes Portal</a>.`;
    }

    if (q.includes('office') || q.includes('timing') || q.includes('वेळ') || q.includes('phone') || q.includes('contact') || q.includes('संपर्क')) {
      return `<strong>Panchayat Office Details:</strong><br>
        📍 <strong>Location:</strong> Gram Panchayat Bhavan, Main Market Road<br>
        🕒 <strong>Hours:</strong> Mon - Sat: 10:00 AM to 5:00 PM (Closed on 2nd/4th Saturdays & Public Holidays)<br>
        📞 <strong>Helpline:</strong> 1800-120-8040 (Toll Free)`;
    }

    if (q.includes('tax') || q.includes('कर') || q.includes('पट्टी') || q.includes('payment')) {
      return `<strong>Online Tax Payment:</strong><br>
        Citizens can pay Annual Property Tax (घरपट्टी) and Water Charges (पाणीपट्टी) securely online with instant downloadable receipt on our <a href="tax-payment.html" class="text-blue-600 underline font-semibold">Tax Payment Portal</a>.`;
    }

    return `Thank you for your question! For specific assistance regarding certificates, schemes, or village grievances, please visit our respective portals or call our Toll-Free Helpline at <strong>1800-120-8040</strong>. You can also meet the Gram Sevak at the Panchayat Bhavan from 10:00 AM to 5:00 PM.`;
  }

  /* ----------------- ANIMATED COUNTER HELPER ----------------- */
  animateCounters() {
    const counters = document.querySelectorAll('.counter-val');
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const duration = 1200;
      const stepTime = 20;
      const steps = duration / stepTime;
      const increment = target / steps;
      let current = 0;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          counter.textContent = target.toLocaleString();
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }
      }, stepTime);
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.ui = new UIManager();
});
