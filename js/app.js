/* ==========================================================================
   Naufaldo Portfolio - Main JavaScript & Interactive Engines
   Bilingual System (ID/EN), Multi-Agent Robotics Simulation, Cold Storage Calculator
   ========================================================================== */

// --- Translations Dictionary (ID & EN) ---
const i18n = {
  id: {
    // Nav
    "nav-home": "Beranda",
    "nav-about": "Tentang",
    "nav-sim": "Simulasi Robotika",
    "nav-calc": "Kalkulator Pendingin",
    "nav-exp": "Pengalaman",
    "nav-edu": "Pendidikan",
    "nav-pub": "Publikasi",
    "nav-projects": "Proyek",
    "nav-skills": "Keahlian",
    "nav-contact": "Kontak",

    // Hero
    "hero-badge": "Magister Teknik Mekatronika (M.Sc.)",
    "hero-title-prefix": "Halo, Saya ",
    "hero-subtitle": "Cold Storage & Automation Engineer | Peneliti Robotika",
    "hero-desc": "Direktur CV. Dingin Lestari Teknik & Lulusan NTUT Taiwan. Berpengalaman dalam perancangan sistem cold storage industri, otomatisasi panel kontrol, serta riset kendali robot multi-agent dan navigasi otonom.",
    "hero-btn-contact": "Hubungi Saya",
    "hero-btn-calc": "Kalkulator Cold Storage",
    "hero-btn-sim": "Uji Simulasi Robot",
    "stat-exp": "Tahun Pengalaman",
    "stat-pub": "Publikasi Ilmiah",
    "stat-proj": "Proyek Rekayasa",

    // About
    "about-title": "Profil & Keahlian Utama",
    "about-sub": "Menggabungkan pengalaman praktis industri pendingin dengan riset akademik robotika tingkat lanjut",
    "about-text-1": "Saya adalah seorang insinyur mekatronika dan otomatisasi yang berfokus pada dua bidang utama: rekayasa sistem cold storage industri dan riset sistem kendali robotika otonom. Saat ini saya memimpin **CV. Dingin Lestari Teknik** di Bandung, mengelola perancangan, instalasi, dan optimasi energi untuk freezer room, chiller room, dan Air Blast Freezer (ABF).",
    "about-text-2": "Di bidang akademik, saya meraih gelar Magister Sains (M.Sc.) Mechatronics Engineering dari National Taipei University of Technology (NTUT), Taiwan. Riset saya berfokus pada kendali formasi robot multi-agent, penghindaran rintangan cerdas, dan navigasi otonom berbasis LiDAR & SLAM.",

    // Multi-Agent Simulation
    "sim-title": "Simulasi Robotika Multi-Agent",
    "sim-sub": "Demonstrasi interaktif algoritma kendali formasi Leader-Follower & APF Obstacle Avoidance (Sesuai Riset Tesis M.Sc. Naufaldo)",
    "sim-label-formation": "Pilih Formasi Robot",
    "sim-btn-triangle": "Formasi Segitiga",
    "sim-btn-circle": "Formasi Lingkaran",
    "sim-btn-line": "Formasi Garis",
    "sim-label-actions": "Aksi Interaktif",
    "sim-btn-obstacle": "Tambah Rintangan",
    "sim-btn-reset": "Reset Simulasi",
    "sim-btn-pause": "Jeda / Jalan",
    "sim-status-title": "TELEMETRI SWARM:",
    "sim-status-leader": "Posisi Leader:",
    "sim-status-mode": "Mode Formasi:",
    "sim-status-obs": "Rintangan Aktif:",
    "sim-instructions": "* Klik pada area kanvas untuk menentukan lokasi target pergerakan robot Leader.",

    // Cold Storage Calculator
    "calc-title": "Kalkulator Estimasi Cold Storage",
    "calc-sub": "Hitung estimasi kapasitas pendinginan (Cooling Load) & spesifikasi kompresor untuk kebutuhan industri Anda",
    "calc-label-room": "Tipe Ruangan Pendingin",
    "calc-opt-chiller": "Chiller Room (+2°C s/d +8°C) - Buah, Sayur, Obat",
    "calc-opt-freezer": "Freezer Room (-18°C s/d -25°C) - Daging, Daging Beku",
    "calc-opt-abf": "Air Blast Freezer (-35°C s/d -40°C) - Pembekuan Cepat",
    "calc-label-dim": "Dimensi Ruangan (Meter)",
    "calc-label-length": "Panjang (m)",
    "calc-label-width": "Lebar (m)",
    "calc-label-height": "Tinggi (m)",
    "calc-label-ambient": "Suhu Lingkungan (°C)",
    "calc-btn-compute": "Hitung Beban Pendinginan",
    "calc-res-title": "HASIL ESTIMASI REKAYASA",
    "calc-res-volume": "Volume Ruangan:",
    "calc-res-load-kw": "Beban Pendingin (kW):",
    "calc-res-load-btu": "Kapasitas BTU/hr:",
    "calc-res-hp": "Rekomendasi Kompresor:",
    "calc-res-note": "* Estimasi standar rekayasa CV. Dingin Lestari Teknik. Hubungi kami untuk konsultasi teknis & detail spesifikasi kompresor Bitzer/Copeland.",

    // Work Experience
    "exp-title": "Pengalaman Kerja Industri",
    "exp-sub": "Rekam jejak kepemimpinan eksekutif dan pengerjaan teknis di bidang kelistrikan & otomatisasi",
    "exp-1-title": "Direktur",
    "exp-1-company": "CV. Dingin Lestari Teknik | Bandung",
    "exp-1-date": "Juni 2025 - Sekarang",
    "exp-1-desc": "Memimpin dan mengarahkan strategi perusahaan keluarga di bidang sistem pendingin industri & cold storage. Bertanggung jawab atas desain sistem termal, pemilihan kompresor & evaporator, optimasi efisiensi energi, manajemen proyek dari commissioning hingga pemeliharaan.",
    
    "exp-2-title": "Industrial Electrician (Project-Based)",
    "exp-2-company": "CV. Dingin Lestari Teknik",
    "exp-2-date": "Nov 2018 - Juni 2025",
    "exp-2-desc": "Merancang dan mendesain panel kontrol listrik industri, instalasi pengkabelan 3-phase, troubleshooting sistem kontrol freezer/chiller room, dan integrasi HVAC.",

    "exp-3-title": "Co-founder",
    "exp-3-company": "Beantrack (Smart Agriculture Startup)",
    "exp-3-date": "Sept 2023 - Nov 2024",
    "exp-3-desc": "Mendirikan startup pertanian cerdas. Mengembangkan produk pengering kopi berbasis energi surya yang terintegrasi dengan pemantauan sensor IoT.",

    "exp-4-title": "Peserta Cloud Computing (Distinction)",
    "exp-4-company": "Bangkit Academy by Google, GoTo, Traveloka",
    "exp-4-date": "Feb 2023 - Juli 2023",
    "exp-4-desc": "Lulus predikat Distinction. Memimpin arsitektur cloud untuk Capstone Project yang berhasil masuk TOP 20 Nasional dan memperoleh inkubasi bisnis.",

    "exp-5-title": "Engineer Intern",
    "exp-5-company": "Asperio",
    "exp-5-date": "Feb 2022 - Sept 2022",
    "exp-5-desc": "Terlibat dalam 7 proyek rekayasa mencakup desain mekanikal, elektrikal, pelatihan kontrol industri, dan manajemen inventaris alat.",

    // Education
    "edu-title": "Pendidikan Akademik",
    "edu-sub": "Latar belakang pendidikan formal dalam Mekatronika & Otomasi Industri",
    "edu-1-title": "Magister Sains (M.Sc.) Teknik Mekatronika",
    "edu-1-school": "National Taipei University of Technology (NTUT), Taiwan",
    "edu-1-date": "2024 - 2025",
    "edu-1-desc": "Fokus Riset: Multi-Agent System Robot Formation Control, Mobile Robotics, dan Autonomous Navigation. Tesis: Intelligent Control Strategies for Mobile Robotics: Multi-Agent System Robot Control Formation.",

    "edu-2-title": "Sarjana Terapan Teknik (S.Tr.T) Teknik Otomasi",
    "edu-2-school": "Politeknik Manufaktur Bandung (POLMAN)",
    "edu-2-date": "2019 - 2023",
    "edu-2-desc": "Fokus pada sistem kontrol otomasi industri, PLC, SCADA, dan robotika. Tugas Akhir: Sistem Navigasi Robot SAR Berkaki Enam Menggunakan Sensor LiDAR dengan Metode SLAM.",

    "edu-3-title": "Teknik Otomasi Industri",
    "edu-3-school": "SMKN 4 Bandung",
    "edu-3-date": "2017 - 2019",
    "edu-3-desc": "Dasar kelistrikan industri, kontrol motor listrik, pneumatik, dan aktif di Robotik Club.",

    // Publications
    "pub-title": "Publikasi Ilmiah & Jurnal",
    "pub-sub": "Karya tulis riset terpublikasi di jurnal & konferensi internasional terindeks",
    "pub-filter-all": "Semua",
    "pub-filter-robotics": "Robotika & Multi-Agent",
    "pub-filter-control": "Kontrol & Otomasi",
    "pub-filter-iot": "IoT & Sistem Pendingin",
    "pub-search-ph": "Cari judul jurnal atau DOI...",
    "pub-btn-copy": "Salin Sitasi",

    // Projects
    "proj-title": "Galeri Proyek Rekayasa",
    "proj-sub": "Dokumentasi portofolio fisik robot, panel kelistrikan, dan simulator",
    "proj-1-title": "Hexapod Search & Rescue Robot",
    "proj-1-cat": "Robotika & SLAM",
    "proj-1-desc": "Robot berkaki enam berfasilitas LiDAR SLAM untuk pemetaan lingkungan dan navigasi otonom medan berat.",
    
    "proj-2-title": "Ice Cream Service Robot",
    "proj-2-cat": "Robotika Servis",
    "proj-2-desc": "Sistem lengan robotik otomatis untuk penyajian es krim secara presisi.",

    "proj-3-title": "BAS Simulator & Control Panel",
    "proj-3-cat": "Building Automation",
    "proj-3-desc": "Simulator Building Automation System (BAS) untuk kontrol HVAC dan efisiensi energi gedung.",

    "proj-4-title": "DCS Industrial Training System",
    "proj-4-cat": "Otomasi Industri",
    "proj-4-desc": "Modul simulasi Distributed Control System (DCS) untuk pelatihan kontrol proses industri.",

    "proj-5-title": "IoT Power & Cold Storage Panel",
    "proj-5-cat": "IoT & Kelistrikan",
    "proj-5-desc": "Panel listrik kontrol cold storage yang dilengkapi pemantauan suhu dan arus berbasis IoT.",

    "proj-6-title": "Forklift Simulator Station",
    "proj-6-cat": "Simulator Industri",
    "proj-6-desc": "Stasiun simulator sistem pengangkut industri untuk pengujian kendali motor presisi.",

    // Skills & Certs
    "skills-title": "Keahlian Teknis & Sertifikasi",
    "skills-sub": "Kompetensi utama di bidang teknik elektro, otomasi, dan cloud",
    "skill-cat-eng": "Keahlian Pendingin & Industri",
    "skill-cat-rob": "Robotika & Sistem Kendali",
    "skill-cat-prog": "Pemrograman & Software",
    "cert-google": "Google Cloud Certified Professional Cloud Engineer (2023 - 2026)",
    "cert-sysadmin": "System Administration and IT Infrastructure Services (2023)",
    "cert-auto": "Automation Maintenance Junior Engineer (2022 - 2025)",
    "cert-elec": "Electricity Maintenance / Industrial Electricity (2021 - 2024)",

    // Contact
    "contact-title": "Hubungi Saya",
    "contact-sub": "Diskusi proyek cold storage, konsultasi teknis, atau kolaborasi riset robotika",
    "contact-loc-title": "Lokasi Utama",
    "contact-loc-desc": "Bandung, Jawa Barat, Indonesia",
    "contact-email-title": "Email Rekayasa",
    "contact-wa-title": "WhatsApp Direct",
    "contact-company-title": "Perusahaan",
    "contact-company-desc": "CV. Dingin Lestari Teknik",
    "contact-form-name": "Nama Anda",
    "contact-form-email": "Email Anda",
    "contact-form-subject": "Subjek Pesan",
    "contact-form-message": "Tuliskan Pesan Anda...",
    "contact-form-btn": "Kirim Pesan WhatsApp",
    "footer-text": "Dibuat oleh Naufaldo, M.Sc. | Hak Cipta Dilindungi."
  },

  en: {
    // Nav
    "nav-home": "Home",
    "nav-about": "About",
    "nav-sim": "Robotics Sim",
    "nav-calc": "Cold Storage Calc",
    "nav-exp": "Experience",
    "nav-edu": "Education",
    "nav-pub": "Publications",
    "nav-projects": "Projects",
    "nav-skills": "Skills",
    "nav-contact": "Contact",

    // Hero
    "hero-badge": "M.Sc. Mechatronics Engineering",
    "hero-title-prefix": "Hi, I am ",
    "hero-subtitle": "Cold Storage & Automation Engineer | Robotics Researcher",
    "hero-desc": "Director of CV. Dingin Lestari Teknik & M.Sc. Graduate from NTUT Taiwan. Specialized in industrial refrigeration design, electrical control panels, multi-agent robotics control, and autonomous navigation.",
    "hero-btn-contact": "Contact Me",
    "hero-btn-calc": "Cold Storage Calculator",
    "hero-btn-sim": "Try Robotics Sim",
    "stat-exp": "Years Experience",
    "stat-pub": "Scientific Papers",
    "stat-proj": "Engineering Projects",

    // About
    "about-title": "Profile & Core Expertise",
    "about-sub": "Bridging practical industrial refrigeration engineering with advanced academic robotics research",
    "about-text-1": "I am a Mechatronics and Automation Engineer specializing in industrial cold storage engineering and autonomous robotics control. I currently serve as Director of **CV. Dingin Lestari Teknik** in Bandung, leading refrigeration system design, installation, and energy optimization for freezer rooms, chiller rooms, and Air Blast Freezers (ABF).",
    "about-text-2": "In academia, I earned my Master of Science (M.Sc.) in Mechatronics Engineering from National Taipei University of Technology (NTUT), Taiwan. My research centers on multi-agent system formation control, APF obstacle avoidance, and LiDAR SLAM-based autonomous navigation.",

    // Multi-Agent Simulation
    "sim-title": "Multi-Agent Robotics Simulation",
    "sim-sub": "Interactive 2D demonstration of Leader-Follower Formation Control & APF Obstacle Avoidance (Based on Naufaldo's M.Sc. Thesis Research)",
    "sim-label-formation": "Select Formation Mode",
    "sim-btn-triangle": "Triangle Formation",
    "sim-btn-circle": "Circle Formation",
    "sim-btn-line": "Line Formation",
    "sim-label-actions": "Interactive Actions",
    "sim-btn-obstacle": "Add Obstacle",
    "sim-btn-reset": "Reset Simulation",
    "sim-btn-pause": "Pause / Resume",
    "sim-status-title": "SWARM TELEMETRY:",
    "sim-status-leader": "Leader Position:",
    "sim-status-mode": "Formation Mode:",
    "sim-status-obs": "Active Obstacles:",
    "sim-instructions": "* Click anywhere on the canvas grid to set target goal destination for the Leader robot.",

    // Cold Storage Calculator
    "calc-title": "Cold Storage Sizing Calculator",
    "calc-sub": "Estimate required cooling load (kW/BTU) & compressor horsepower for your industrial facility",
    "calc-label-room": "Storage Temperature Target",
    "calc-opt-chiller": "Chiller Room (+2°C to +8°C) - Fruits, Veggies, Pharma",
    "calc-opt-freezer": "Freezer Room (-18°C to -25°C) - Frozen Meat & Food",
    "calc-opt-abf": "Air Blast Freezer (-35°C to -40°C) - Rapid Freezing",
    "calc-label-dim": "Room Dimensions (Meters)",
    "calc-label-length": "Length (m)",
    "calc-label-width": "Width (m)",
    "calc-label-height": "Height (m)",
    "calc-label-ambient": "Ambient Temp (°C)",
    "calc-btn-compute": "Calculate Cooling Load",
    "calc-res-title": "ENGINEERING LOAD ESTIMATE",
    "calc-res-volume": "Room Volume:",
    "calc-res-load-kw": "Cooling Load (kW):",
    "calc-res-load-btu": "Capacity (BTU/hr):",
    "calc-res-hp": "Recommended Compressor:",
    "calc-res-note": "* Standard engineering estimation by CV. Dingin Lestari Teknik. Contact us for detailed Bitzer/Copeland compressor sizing & design.",

    // Work Experience
    "exp-title": "Industrial Experience",
    "exp-sub": "Proven track record in executive leadership & engineering project execution",
    "exp-1-title": "Director",
    "exp-1-company": "CV. Dingin Lestari Teknik | Bandung",
    "exp-1-date": "June 2025 - Present",
    "exp-1-desc": "Lead and expand family business specializing in industrial refrigeration & cold storage systems. Responsible for thermodynamic design, compressor/evaporator selection, energy efficiency, and full project lifecycle.",
    
    "exp-2-title": "Industrial Electrician (Project-Based)",
    "exp-2-company": "CV. Dingin Lestari Teknik",
    "exp-2-date": "Nov 2018 - June 2025",
    "exp-2-desc": "Designed industrial control panels, 3-phase power wiring, troubleshooting cold room control logic, and HVAC maintenance.",

    "exp-3-title": "Co-founder",
    "exp-3-company": "Beantrack (Smart Agriculture Startup)",
    "exp-3-date": "Sept 2023 - Nov 2024",
    "exp-3-desc": "Co-founded smart agriculture startup. Developed an IoT-integrated solar dryer for coffee bean processing to optimize quality and yield.",

    "exp-4-title": "Cloud Computing Participant (Distinction)",
    "exp-4-company": "Bangkit Academy by Google, GoTo, Traveloka",
    "exp-4-date": "Feb 2023 - July 2023",
    "exp-4-desc": "Graduated with Distinction. Led cloud infrastructure architecture for Capstone project awarded TOP 20 National & business incubation.",

    "exp-5-title": "Engineer Intern",
    "exp-5-company": "Asperio",
    "exp-5-date": "Feb 2022 - Sept 2022",
    "exp-5-desc": "Engineered 7 projects covering mechanical/electrical design, user training modules, wiring, and inventory management.",

    // Education
    "edu-title": "Academic Education",
    "edu-sub": "Formal academic degrees in Mechatronics & Industrial Automation Engineering",
    "edu-1-title": "M.Sc. in Mechatronics Engineering",
    "edu-1-school": "National Taipei University of Technology (NTUT), Taiwan",
    "edu-1-date": "2024 - 2025",
    "edu-1-desc": "Research focus: Multi-Agent System Robot Formation Control, Mobile Robotics, & Autonomous Navigation. Thesis: Intelligent Control Strategies for Mobile Robotics: Multi-Agent System Robot Control Formation.",

    "edu-2-title": "Bachelor of Engineering (S.Tr.T) Automation Engineering",
    "edu-2-school": "Politeknik Manufaktur Bandung (POLMAN)",
    "edu-2-date": "2019 - 2023",
    "edu-2-desc": "Focused on PLC, SCADA, industrial automation, and robotics. Final Project: Hexa-Legged SAR Robot Navigation System using LiDAR with SLAM.",

    "edu-3-title": "Industrial Automation Engineering",
    "edu-3-school": "SMKN 4 Bandung",
    "edu-3-date": "2017 - 2019",
    "edu-3-desc": "Industrial electrical fundamentals, motor control, pneumatics, and active Robotics Club member.",

    // Publications
    "pub-title": "Publications & Journals",
    "pub-sub": "Peer-reviewed scientific journal articles & international conference papers",
    "pub-filter-all": "All Papers",
    "pub-filter-robotics": "Robotics & Swarm",
    "pub-filter-control": "Control & Automation",
    "pub-filter-iot": "IoT & Cold Storage",
    "pub-search-ph": "Search paper title or DOI...",
    "pub-btn-copy": "Copy Citation",

    // Projects
    "proj-title": "Engineering Projects",
    "proj-sub": "Visual showcase of physical robots, control panels, and simulation stations",
    "proj-1-title": "Hexapod Search & Rescue Robot",
    "proj-1-cat": "Robotics & SLAM",
    "proj-1-desc": "LiDAR SLAM hexa-legged robot designed for indoor exploration and rough terrain navigation.",
    
    "proj-2-title": "Ice Cream Service Robot",
    "proj-2-cat": "Service Robotics",
    "proj-2-desc": "Automated robotic arm system for precision ice cream dispensing.",

    "proj-3-title": "BAS Simulator & Control Panel",
    "proj-3-cat": "Building Automation",
    "proj-3-desc": "Building Automation System (BAS) simulator for HVAC management and energy conservation.",

    "proj-4-title": "DCS Industrial Training System",
    "proj-4-cat": "Industrial Automation",
    "proj-4-desc": "Distributed Control System (DCS) training rig for process control simulation.",

    "proj-5-title": "IoT Power & Cold Storage Panel",
    "proj-5-cat": "IoT & Electrical",
    "proj-5-desc": "Industrial control panel integrated with IoT telemetry for cold room temperature monitoring.",

    "proj-6-title": "Forklift Simulator Station",
    "proj-6-cat": "Simulator Rig",
    "proj-6-desc": "Heavy machinery control simulator for precision motor control evaluation.",

    // Skills & Certs
    "skills-title": "Technical Skills & Credentials",
    "skills-sub": "Core competencies across mechatronics, refrigeration, and cloud engineering",
    "skill-cat-eng": "Refrigeration & Industrial",
    "skill-cat-rob": "Robotics & Control Systems",
    "skill-cat-prog": "Programming & Languages",
    "cert-google": "Google Cloud Certified Professional Cloud Engineer (2023 - 2026)",
    "cert-sysadmin": "System Administration and IT Infrastructure Services (2023)",
    "cert-auto": "Automation Maintenance Junior Engineer (2022 - 2025)",
    "cert-elec": "Electricity Maintenance / Industrial Electricity (2021 - 2024)",

    // Contact
    "contact-title": "Contact Me",
    "contact-sub": "Discuss cold storage engineering, technical consulting, or robotics research collaboration",
    "contact-loc-title": "Location",
    "contact-loc-desc": "Bandung, West Java, Indonesia",
    "contact-email-title": "Engineering Email",
    "contact-wa-title": "WhatsApp Direct",
    "contact-company-title": "Company",
    "contact-company-desc": "CV. Dingin Lestari Teknik",
    "contact-form-name": "Your Name",
    "contact-form-email": "Your Email",
    "contact-form-subject": "Subject",
    "contact-form-message": "Write your message...",
    "contact-form-btn": "Send WhatsApp Message",
    "footer-text": "Designed by Naufaldo, M.Sc. | All Rights Reserved."
  }
};

// --- Language Switching Engine ---
let currentLang = localStorage.getItem("naufaldo_lang") || "id";

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("naufaldo_lang", lang);
  
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (i18n[lang] && i18n[lang][key]) {
      el.innerHTML = i18n[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-ph]").forEach(el => {
    const key = el.getAttribute("data-i18n-ph");
    if (i18n[lang] && i18n[lang][key]) {
      el.placeholder = i18n[lang][key];
    }
  });

  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.innerHTML = lang === "id" ? `<span>🇮🇩</span> ID` : `<span>🇬🇧</span> EN`;
  }
}

// --- Multi-Agent Robotics Simulation Engine ---
class MultiAgentSimulation {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    
    this.width = this.canvas.width = this.canvas.clientWidth;
    this.height = this.canvas.height = this.canvas.clientHeight;
    
    this.isRunning = true;
    this.formation = "triangle"; // triangle, circle, line
    
    // Leader Robot
    this.leader = {
      x: this.width * 0.4,
      y: this.height * 0.5,
      targetX: this.width * 0.6,
      targetY: this.height * 0.5,
      angle: 0,
      speed: 2.2,
      radius: 12
    };

    // Follower Robots (3 Followers)
    this.followers = [
      { x: this.leader.x - 40, y: this.leader.y - 40, angle: 0, radius: 9, color: "#00f2fe" },
      { x: this.leader.x - 40, y: this.leader.y + 40, angle: 0, radius: 9, color: "#4facfe" },
      { x: this.leader.x - 70, y: this.leader.y, angle: 0, radius: 9, color: "#8b5cf6" }
    ];

    // Obstacles
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.35, radius: 24 },
      { x: this.width * 0.5, y: this.height * 0.65, radius: 20 }
    ];

    this.bindEvents();
    this.loop();
  }

  bindEvents() {
    window.addEventListener("resize", () => {
      if (!this.canvas) return;
      this.width = this.canvas.width = this.canvas.clientWidth;
      this.height = this.canvas.height = this.canvas.clientHeight;
    });

    this.canvas.addEventListener("click", (e) => {
      const rect = this.canvas.getBoundingClientRect();
      this.leader.targetX = e.clientX - rect.left;
      this.leader.targetY = e.clientY - rect.top;
    });
  }

  setFormation(type) {
    this.formation = type;
    const statusMode = document.getElementById("simStatusMode");
    if (statusMode) statusMode.textContent = type.toUpperCase();
  }

  addObstacle() {
    this.obstacles.push({
      x: Math.random() * (this.width - 100) + 50,
      y: Math.random() * (this.height - 100) + 50,
      radius: Math.floor(Math.random() * 15) + 15
    });
    const statusObs = document.getElementById("simStatusObs");
    if (statusObs) statusObs.textContent = this.obstacles.length;
  }

  reset() {
    this.obstacles = [
      { x: this.width * 0.5, y: this.height * 0.35, radius: 24 },
      { x: this.width * 0.5, y: this.height * 0.65, radius: 20 }
    ];
    this.leader.x = this.width * 0.3;
    this.leader.y = this.height * 0.5;
    this.leader.targetX = this.width * 0.7;
    this.leader.targetY = this.height * 0.5;
    const statusObs = document.getElementById("simStatusObs");
    if (statusObs) statusObs.textContent = this.obstacles.length;
  }

  togglePause() {
    this.isRunning = !this.isRunning;
  }

  getFormationOffsets() {
    const dist = 45;
    if (this.formation === "triangle") {
      return [
        { dx: -dist, dy: -dist * 0.8 },
        { dx: -dist, dy: dist * 0.8 },
        { dx: -dist * 1.7, dy: 0 }
      ];
    } else if (this.formation === "circle") {
      return [
        { dx: Math.cos(0) * dist, dy: Math.sin(0) * dist },
        { dx: Math.cos((2*Math.PI)/3) * dist, dy: Math.sin((2*Math.PI)/3) * dist },
        { dx: Math.cos((4*Math.PI)/3) * dist, dy: Math.sin((4*Math.PI)/3) * dist }
      ];
    } else { // Line formation
      return [
        { dx: -dist, dy: 0 },
        { dx: -dist * 2, dy: 0 },
        { dx: -dist * 3, dy: 0 }
      ];
    }
  }

  update() {
    if (!this.isRunning) return;

    // Leader movement toward target
    const dx = this.leader.targetX - this.leader.x;
    const dy = this.leader.targetY - this.leader.y;
    const dist = Math.hypot(dx, dy);

    if (dist > 3) {
      this.leader.angle = Math.atan2(dy, dx);
      let moveX = Math.cos(this.leader.angle) * this.leader.speed;
      let moveY = Math.sin(this.leader.angle) * this.leader.speed;

      // Repulsive potential field from obstacles
      this.obstacles.forEach(obs => {
        const odx = this.leader.x - obs.x;
        const ody = this.leader.y - obs.y;
        const odist = Math.hypot(odx, ody);
        const minSafety = obs.radius + this.leader.radius + 35;
        if (odist < minSafety && odist > 0) {
          const force = (minSafety - odist) / minSafety * 3.5;
          moveX += (odx / odist) * force;
          moveY += (ody / odist) * force;
        }
      });

      this.leader.x += moveX;
      this.leader.y += moveY;
    }

    // Follower movement (Formation + APF)
    const offsets = this.getFormationOffsets();
    this.followers.forEach((fol, idx) => {
      const off = offsets[idx];
      // Rotate offset by leader orientation
      const targetX = this.leader.x + (off.dx * Math.cos(this.leader.angle) - off.dy * Math.sin(this.leader.angle));
      const targetY = this.leader.y + (off.dx * Math.sin(this.leader.angle) + off.dy * Math.cos(this.leader.angle));

      const fdx = targetX - fol.x;
      const fdy = targetY - fol.y;
      let fMoveX = fdx * 0.1;
      let fMoveY = fdy * 0.1;

      // Obstacle repulsion for followers
      this.obstacles.forEach(obs => {
        const odx = fol.x - obs.x;
        const ody = fol.y - obs.y;
        const odist = Math.hypot(odx, ody);
        const minSafety = obs.radius + fol.radius + 25;
        if (odist < minSafety && odist > 0) {
          const force = (minSafety - odist) / minSafety * 3.0;
          fMoveX += (odx / odist) * force;
          fMoveY += (ody / odist) * force;
        }
      });

      fol.x += fMoveX;
      fol.y += fMoveY;
      fol.angle = Math.atan2(fdy, fdx);
    });

    // Update Telemetry Display
    const statusLeader = document.getElementById("simStatusLeader");
    if (statusLeader) {
      statusLeader.textContent = `X:${Math.round(this.leader.x)} Y:${Math.round(this.leader.y)}`;
    }
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // Draw Grid lines
    this.ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    this.ctx.lineWidth = 1;
    for (let x = 0; x < this.width; x += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(x, 0);
      this.ctx.lineTo(x, this.height);
      this.ctx.stroke();
    }
    for (let y = 0; y < this.height; y += 30) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }

    // Draw Target Destination
    this.ctx.strokeStyle = "#00f2fe";
    this.ctx.lineWidth = 2;
    this.ctx.setLineDash([4, 4]);
    this.ctx.beginPath();
    this.ctx.arc(this.leader.targetX, this.leader.targetY, 14, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.setLineDash([]);

    // Draw Target line from Leader
    this.ctx.strokeStyle = "rgba(0, 242, 254, 0.25)";
    this.ctx.beginPath();
    this.ctx.moveTo(this.leader.x, this.leader.y);
    this.ctx.lineTo(this.leader.targetX, this.leader.targetY);
    this.ctx.stroke();

    // Draw Obstacles
    this.obstacles.forEach(obs => {
      this.ctx.fillStyle = "rgba(239, 68, 68, 0.25)";
      this.ctx.strokeStyle = "#ef4444";
      this.ctx.lineWidth = 2;
      this.ctx.beginPath();
      this.ctx.arc(obs.x, obs.y, obs.radius, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.stroke();

      // Warning cross
      this.ctx.beginPath();
      this.ctx.moveTo(obs.x - 6, obs.y - 6);
      this.ctx.lineTo(obs.x + 6, obs.y + 6);
      this.ctx.moveTo(obs.x + 6, obs.y - 6);
      this.ctx.lineTo(obs.x - 6, obs.y + 6);
      this.ctx.stroke();
    });

    // Draw Formation Communication Lines
    this.followers.forEach(fol => {
      this.ctx.strokeStyle = "rgba(0, 242, 254, 0.35)";
      this.ctx.lineWidth = 1.5;
      this.ctx.beginPath();
      this.ctx.moveTo(this.leader.x, this.leader.y);
      this.ctx.lineTo(fol.x, fol.y);
      this.ctx.stroke();
    });

    // Draw Follower Robots
    this.followers.forEach((fol, idx) => {
      this.ctx.save();
      this.ctx.translate(fol.x, fol.y);
      this.ctx.rotate(fol.angle);

      this.ctx.fillStyle = fol.color;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, fol.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Direction pointer
      this.ctx.strokeStyle = "#fff";
      this.ctx.beginPath();
      this.ctx.moveTo(0, 0);
      this.ctx.lineTo(fol.radius + 4, 0);
      this.ctx.stroke();

      this.ctx.restore();
    });

    // Draw Leader Robot (Gold/Cyan Glow)
    this.ctx.save();
    this.ctx.translate(this.leader.x, this.leader.y);
    this.ctx.rotate(this.leader.angle);

    this.ctx.shadowColor = "#00f2fe";
    this.ctx.shadowBlur = 12;
    this.ctx.fillStyle = "#f59e0b";
    this.ctx.beginPath();
    this.ctx.arc(0, 0, this.leader.radius, 0, Math.PI * 2);
    this.ctx.fill();

    // Direction Triangle Pointer
    this.ctx.fillStyle = "#fff";
    this.ctx.beginPath();
    this.ctx.moveTo(this.leader.radius + 6, 0);
    this.ctx.lineTo(-4, -6);
    this.ctx.lineTo(-4, 6);
    this.ctx.closePath();
    this.ctx.fill();

    this.ctx.restore();
  }

  loop() {
    this.update();
    this.draw();
    requestAnimationFrame(() => this.loop());
  }
}

// --- Cold Storage Sizing Calculator Engine ---
function calculateCoolingLoad() {
  const roomType = document.getElementById("calcRoomType").value;
  const length = parseFloat(document.getElementById("calcLength").value) || 0;
  const width = parseFloat(document.getElementById("calcWidth").value) || 0;
  const height = parseFloat(document.getElementById("calcHeight").value) || 0;
  const ambient = parseFloat(document.getElementById("calcAmbient").value) || 32;

  const volume = length * width * height;
  if (volume <= 0) {
    alert(currentLang === "id" ? "Mohon masukkan dimensi ruangan yang valid!" : "Please enter valid room dimensions!");
    return;
  }

  let baseHeatGainWPerM3 = 45; // Chiller
  let targetTemp = 4;

  if (roomType === "freezer") {
    baseHeatGainWPerM3 = 75;
    targetTemp = -20;
  } else if (roomType === "abf") {
    baseHeatGainWPerM3 = 140;
    targetTemp = -38;
  }

  // Temp delta factor
  const deltaT = ambient - targetTemp;
  const totalWatts = volume * baseHeatGainWPerM3 * (deltaT / 30) * 1.2; // 1.2 Safety Factor
  const btuHr = totalWatts * 3.412;
  const hpEstimate = (btuHr / 9000).toFixed(1);
  const kwEstimate = (totalWatts / 1000).toFixed(2);

  // Update UI outputs
  document.getElementById("resVolume").textContent = `${volume.toFixed(1)} m³`;
  document.getElementById("resLoadKw").textContent = `${kwEstimate} kW`;
  document.getElementById("resLoadBtu").textContent = `${Math.round(btuHr).toLocaleString()} BTU/h`;
  document.getElementById("resHp").textContent = `${hpEstimate} HP`;
}

// --- Publications Data & Filter Search Engine ---
const publicationsData = [
  {
    title: "Robot Coordination in Multi-agent Systems: Leader-Dependent Following Configuration Control of Mecanum Wheeled Drive Robots",
    venue: "International Journal of Control, Automation and Systems (IJCAS), 2026",
    doi: "https://doi.org/10.1007/s12555-026-00119-1",
    category: "robotics",
    year: "2026"
  },
  {
    title: "Fuzzy-Tuned PID Control for Dynamic Formation of Differential-Wheeled Mobile Robots with APF-Based Obstacle Avoidance",
    venue: "25th International Conference on Control, Automation and Systems (ICCAS), 2025",
    doi: "https://doi.org/10.23919/ICCAS66577.2025.11301156",
    category: "robotics",
    year: "2025"
  },
  {
    title: "Dynamic Goal-Shifting and Sinusoidal Altitude Modulation for Flight Control of a Swarm of Quadcopters with Flocking Dynamics",
    venue: "SICE Festival with Annual Conference (SICE FES), 2025",
    doi: "https://doi.org/10.23919/SICEFES67750.2025.11236621",
    category: "robotics",
    year: "2025"
  },
  {
    title: "Leader-follower Configuration Based Formation Control of Multi-Agent System",
    venue: "Journal of the Chinese Institute of Engineers (JCIE), 2025",
    doi: "https://doi.org/10.1080/02533839.2025.2503867",
    category: "control",
    year: "2025"
  },
  {
    title: "Comparative Analysis of Autonomous Indoor Exploration Strategies: Floodfill Algorithm vs. Frontier-Based Method",
    venue: "24th International Conference on Control, Automation and Systems (ICCAS), 2024",
    doi: "https://doi.org/10.23919/ICCAS63016.2024.10773212",
    category: "robotics",
    year: "2024"
  },
  {
    title: "Design and Development of a Substitution Product System for Data Logging of Water Flow and Pressure in Closed Pipe Systems Using LoRaWAN Communication",
    venue: "Jurnal Teknologi Terapan (JTT), 2024",
    doi: "https://doi.org/10.31884/jtt.v10i2.624",
    category: "iot",
    year: "2024"
  },
  {
    title: "Autonomous Navigation System for Hexa-Legged Search and Rescue Robot Using LiDAR",
    venue: "IAES International Journal of Robotics and Automation (IJRA), 2024",
    doi: "https://doi.org/10.11591/ijra.v13i1.pp50-64",
    category: "robotics",
    year: "2024"
  }
];

function renderPublications(filterCategory = "all", searchQuery = "") {
  const container = document.getElementById("pubContainer");
  if (!container) return;

  const filtered = publicationsData.filter(item => {
    const matchesCat = filterCategory === "all" || item.category === filterCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div class="glass-card text-center" style="padding: 2rem; color: var(--text-dim);">No publications found matching your search criteria.</div>`;
    return;
  }

  container.innerHTML = filtered.map(pub => `
    <div class="glass-card pub-card">
      <h3 class="pub-title">${pub.title}</h3>
      <div class="pub-meta">
        <span class="pub-venue"><i class="fa fa-book"></i> ${pub.venue}</span>
        <span class="badge badge-purple">${pub.year}</span>
      </div>
      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem;">
        <a href="${pub.doi}" target="_blank" class="btn btn-outline btn-sm">
          <i class="fa fa-external-link"></i> DOI Article
        </a>
        <button class="btn btn-outline btn-sm" onclick="copyCitation('${pub.title.replace(/'/g, "\\'")}', '${pub.venue.replace(/'/g, "\\'")}')">
          <i class="fa fa-copy"></i> <span data-i18n="pub-btn-copy">${i18n[currentLang]["pub-btn-copy"]}</span>
        </button>
      </div>
    </div>
  `).join("");
}

function copyCitation(title, venue) {
  const citation = `Naufaldo. "${title}." ${venue}.`;
  navigator.clipboard.writeText(citation).then(() => {
    alert(currentLang === "id" ? "Kutipan sitasi telah disalin!" : "Citation copied to clipboard!");
  });
}

// --- Projects Modal Lightbox Engine ---
const projectsData = [
  {
    titleKey: "proj-1-title",
    catKey: "proj-1-cat",
    descKey: "proj-1-desc",
    img: "img/IMG-20230503-WA0016.jpg",
    tags: ["ROS", "LiDAR", "SLAM", "Hexapod", "Arduino"]
  },
  {
    titleKey: "proj-2-title",
    catKey: "proj-2-cat",
    descKey: "proj-2-desc",
    img: "img/IMG-20230503-WA0017.jpg",
    tags: ["Robotics", "Servo Control", "Automation", "PLC"]
  },
  {
    titleKey: "proj-3-title",
    catKey: "proj-3-cat",
    descKey: "proj-3-desc",
    img: "img/IMG-20230503-WA0019.jpg",
    tags: ["BAS", "HVAC", "Building Automation", "SCADA"]
  },
  {
    titleKey: "proj-4-title",
    catKey: "proj-4-cat",
    descKey: "proj-4-desc",
    img: "img/IMG-20230503-WA0021.jpg",
    tags: ["DCS", "Process Control", "Modbus", "PLC"]
  },
  {
    titleKey: "proj-5-title",
    catKey: "proj-5-cat",
    descKey: "proj-5-desc",
    img: "img/IMG-20230503-WA0015.jpg",
    tags: ["IoT", "3-Phase Panel", "Cold Storage", "ESP32"]
  },
  {
    titleKey: "proj-6-title",
    catKey: "proj-6-cat",
    descKey: "proj-6-desc",
    img: "img/IMG-20230503-WA0018.jpg",
    tags: ["Simulator", "VFD Drive", "Industrial Motor", "Safety"]
  }
];

function openProjectModal(index) {
  const p = projectsData[index];
  if (!p) return;

  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImg");
  const modalTitle = document.getElementById("modalTitle");
  const modalCat = document.getElementById("modalCat");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");

  modalImg.src = p.img;
  modalTitle.textContent = i18n[currentLang][p.titleKey] || p.titleKey;
  modalCat.textContent = i18n[currentLang][p.catKey] || p.catKey;
  modalDesc.textContent = i18n[currentLang][p.descKey] || p.descKey;
  modalTags.innerHTML = p.tags.map(t => `<span class="badge">${t}</span>`).join(" ");

  modal.classList.add("active");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  if (modal) modal.classList.remove("active");
}

// --- Initialization & Event Binding ---
document.addEventListener("DOMContentLoaded", () => {
  // Initialize Language
  updateLanguage(currentLang);

  const langBtn = document.getElementById("langToggleBtn");
  if (langBtn) {
    langBtn.addEventListener("click", () => {
      const nextLang = currentLang === "id" ? "en" : "id";
      updateLanguage(nextLang);
      renderPublications();
    });
  }

  // Initialize Robotics Sim
  window.simInstance = new MultiAgentSimulation("simCanvas");

  // Sim Buttons
  document.getElementById("btnTriangle")?.addEventListener("click", () => window.simInstance.setFormation("triangle"));
  document.getElementById("btnCircle")?.addEventListener("click", () => window.simInstance.setFormation("circle"));
  document.getElementById("btnLine")?.addEventListener("click", () => window.simInstance.setFormation("line"));
  document.getElementById("btnAddObs")?.addEventListener("click", () => window.simInstance.addObstacle());
  document.getElementById("btnResetSim")?.addEventListener("click", () => window.simInstance.reset());
  document.getElementById("btnPauseSim")?.addEventListener("click", () => window.simInstance.togglePause());

  // Calculator Submit
  document.getElementById("calcComputeBtn")?.addEventListener("click", calculateCoolingLoad);

  // Publications Render & Search
  renderPublications();
  
  document.getElementById("pubSearchInput")?.addEventListener("input", (e) => {
    const activeFilter = document.querySelector(".pub-filter-tags .filter-btn.active")?.dataset.cat || "all";
    renderPublications(activeFilter, e.target.value);
  });

  document.querySelectorAll(".pub-filter-tags .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".pub-filter-tags .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      const cat = e.target.dataset.cat;
      const query = document.getElementById("pubSearchInput")?.value || "";
      renderPublications(cat, query);
    });
  });

  // Contact Form Submission (Redirects to WhatsApp)
  document.getElementById("contactForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cfName").value;
    const email = document.getElementById("cfEmail").value;
    const subject = document.getElementById("cfSubject").value;
    const msg = document.getElementById("cfMessage").value;

    const waText = `Halo Naufaldo, M.Sc.%0A%0ASaya: ${encodeURIComponent(name)} (${encodeURIComponent(email)})%0ASubjek: ${encodeURIComponent(subject)}%0APesan: ${encodeURIComponent(msg)}`;
    window.open(`https://wa.me/6281320608283?text=${waText}`, "_blank");
  });

  // Mobile Navigation Menu Toggle
  const navToggle = document.getElementById("mobileNavToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });
  }

  // Sticky Navbar Blur on Scroll
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
});
