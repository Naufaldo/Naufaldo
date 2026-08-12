/* ==========================================================================
   Naufaldo Portfolio - Main JavaScript & Interactive Engines
   Bilingual System (ID/EN), Performance Optimized Multi-Page Engine,
   Lazy Lightbox Modal Video & Image Viewer, Cold Storage Sizing Calculator
   ========================================================================== */

// --- Translations Dictionary (ID & EN) ---
const i18n = {
  id: {
    // Nav (Simplified & Compact)
    "nav-home": "Beranda",
    "nav-about": "Tentang",
    "nav-tools": "Fitur & Tool",
    "nav-projects": "Proyek",
    "nav-pub": "Publikasi",
    "nav-contact": "Kontak",

    // Hero
    "hero-badge": "Magister Teknik Mekatronika (M.Sc.)",
    "hero-title-prefix": "Halo, Saya ",
    "hero-subtitle": "Cold Storage & Automation Engineer | Peneliti Robotika",
    "hero-desc": "Direktur CV. Dingin Lestari Teknik & Lulusan NTUT Taiwan. Pengembang Sistem ERP Cold Storage, Pemegang Hak Cipta Paten Software MATLAB Direct Air Capture (DAC), dan Peneliti Robotika Multi-Agent & Swarm Drone.",
    "hero-btn-contact": "Hubungi Saya",
    "hero-btn-calc": "Kalkulator Cold Storage",
    "hero-btn-erp": "Demo Web ERP",
    "hero-btn-sim": "Lab Simulasi Robot",
    "stat-exp": "Tahun Pengalaman",
    "stat-pub": "Publikasi Ilmiah",
    "stat-proj": "Proyek Rekayasa",

    // About
    "about-title": "Profil & Keahlian Utama",
    "about-sub": "Menggabungkan pengalaman praktis industri pendingin dengan riset akademik robotika tingkat lanjut",
    "about-text-1": "Saya adalah seorang insinyur mekatronika dan otomatisasi yang berfokus pada rekayasa cold storage industri, sistem kendali robotika otonom, serta pengembangan perangkat lunak ERP industri. Saat ini saya memimpin **CV. Dingin Lestari Teknik** di Bandung ([dinginlestariteknik.com](https://dinginlestariteknik.com/)), mengelola perancangan, instalasi, dan optimasi energi untuk freezer room, chiller room, dan Air Blast Freezer (ABF). Saya juga mengembangkan platform digital ERP khusus industri pendingin di **[demo.dinginlestariteknik.com](https://demo.dinginlestariteknik.com/)**.",
    "about-text-2": "Di bidang akademik & inovasi, saya meraih gelar M.Sc. Mechatronics Engineering dari National Taipei University of Technology (NTUT), Taiwan. Saya memegang **Hak Cipta Paten Program MATLAB** untuk kontrol sistem Direct Air Capture (DAC) penangkap CO₂ udara, serta meriset kendali formasi robot multi-agent dan swarm drone (SICE FES 2025).",

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
    "calc-res-note": "* Estimasi standar rekayasa CV. Dingin Lestari Teknik. Hubungi kami di dinginlestariteknik.com untuk konsultasi teknis & detail spesifikasi.",

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
    "proj-title": "Galeri Proyek & Inovasi Rekayasa",
    "proj-sub": "Portofolio sistem cold storage terbaru, paten Direct Air Capture (DAC), riset swarm drone, dan web ERP industri",
    "proj-filter-all": "Semua Proyek",
    "proj-filter-cs": "Cold Storage & ERP",
    "proj-filter-dac": "Direct Air Capture (Paten)",
    "proj-filter-swarm": "Robotika & Swarm Drone",
    "proj-filter-auto": "Otomasi & Panel",

    "proj-cs-title": "Industrial Cold Storage Systems",
    "proj-cs-cat": "Cold Storage & Engineering",
    "proj-cs-desc": "Perancangan, pemilihan kompresor Bitzer/Copeland, perakitan panel kelistrikan, dan commissioning sistem Freezer Room, Chiller Room, & ABF. Lihat portofolio lengkap di dinginlestariteknik.com.",

    "proj-dac-title": "Direct Air Capture (DAC) CO₂ System with Biochar",
    "proj-dac-cat": "Green Tech & Hak Cipta Paten",
    "proj-dac-desc": "Perancangan fisik sistem penangkap CO₂ di udara menggunakan media biochar, pembuatan instrumen hardware, pemrograman kendali telemetri terintegrasi MATLAB, dan memiliki Hak Cipta Paten untuk Software MATLAB.",

    "proj-swarm-title": "Swarm Quadcopters Flight Control (SICE FES 2025)",
    "proj-swarm-cat": "Riset Swarm Drone & Flocking",
    "proj-swarm-desc": "Riset kendali terbang kawanan quadcopter (Swarm Drone) dengan dinamika flocking, penyesuaian target dinamis, dan modulasi ketinggian sinusoidal. Tonton video eksperimennya langsung di modal lightbox!",

    "proj-erp-title": "DLT ERP Platform (demo.dinginlestariteknik.com)",
    "proj-erp-cat": "SaaS & Web Software",
    "proj-erp-desc": "Sistem Enterprise Resource Planning (ERP) khusus operasional perusahaan pendingin & HVAC mencakup manajemen teknisi, jadwal servis, inventaris spare part, estimasi biaya, & penagihan.",

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

    // Contact
    "contact-title": "Hubungi Saya",
    "contact-sub": "Diskusi proyek cold storage, konsultasi teknis, atau kolaborasi riset robotika",
    "contact-loc-title": "Lokasi Utama",
    "contact-loc-desc": "Bandung, Jawa Barat, Indonesia",
    "contact-email-title": "Email Rekayasa",
    "contact-wa-title": "WhatsApp Direct",
    "contact-company-title": "Perusahaan Utama",
    "contact-company-desc": "CV. Dingin Lestari Teknik (dinginlestariteknik.com)",
    "contact-erp-title": "Demo ERP System",
    "contact-erp-desc": "demo.dinginlestariteknik.com",
    "contact-form-name": "Nama Anda",
    "contact-form-email": "Email Anda",
    "contact-form-subject": "Subjek Pesan",
    "contact-form-message": "Tuliskan Pesan Anda...",
    "contact-form-btn": "Kirim Pesan WhatsApp",
    "footer-text": "Dibuat oleh Naufaldo, M.Sc. | Hak Cipta Dilindungi."
  },

  en: {
    // Nav (Simplified & Compact)
    "nav-home": "Home",
    "nav-about": "About",
    "nav-tools": "Tools & Sim",
    "nav-projects": "Projects",
    "nav-pub": "Publications",
    "nav-contact": "Contact",

    // Hero
    "hero-badge": "M.Sc. Mechatronics Engineering",
    "hero-title-prefix": "Hi, I am ",
    "hero-subtitle": "Cold Storage & Automation Engineer | Robotics Researcher",
    "hero-desc": "Director of CV. Dingin Lestari Teknik & M.Sc. Graduate from NTUT Taiwan. Developer of Cold Storage ERP Software, Software Patent Holder for MATLAB Direct Air Capture (DAC) Control, and Multi-Agent Robotics & Swarm Drone Researcher.",
    "hero-btn-contact": "Contact Me",
    "hero-btn-calc": "Cold Storage Calculator",
    "hero-btn-erp": "Web ERP Demo",
    "hero-btn-sim": "Robotics Sim Lab",
    "stat-exp": "Years Experience",
    "stat-pub": "Scientific Papers",
    "stat-proj": "Engineering Projects",

    // About
    "about-title": "Profile & Core Expertise",
    "about-sub": "Bridging practical industrial refrigeration engineering with advanced academic robotics research",
    "about-text-1": "I am a Mechatronics and Automation Engineer specializing in industrial cold storage engineering, autonomous robotics control, and enterprise software engineering. I currently serve as Director of **CV. Dingin Lestari Teknik** in Bandung ([dinginlestariteknik.com](https://dinginlestariteknik.com/)), leading refrigeration design and energy optimization for freezer rooms, chiller rooms, and Air Blast Freezers (ABF). I also developed an industrial ERP platform live at **[demo.dinginlestariteknik.com](https://demo.dinginlestariteknik.com/)**.",
    "about-text-2": "In academia & innovation, I earned my M.Sc. in Mechatronics Engineering from National Taipei University of Technology (NTUT), Taiwan. I hold a **Registered Software Patent for MATLAB Control Logic** in Direct Air Capture (DAC) CO₂ systems, and conduct research on multi-agent formation control and swarm quadcopters (SICE FES 2025).",

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
    "calc-res-note": "* Standard engineering estimation by CV. Dingin Lestari Teknik. Visit dinginlestariteknik.com for detailed Bitzer/Copeland compressor sizing.",

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
    "proj-title": "Engineering Projects & Innovations",
    "proj-sub": "Featured cold storage projects, Direct Air Capture (DAC) patent, swarm drone research, and industrial web ERP",
    "proj-filter-all": "All Projects",
    "proj-filter-cs": "Cold Storage & ERP",
    "proj-filter-dac": "Direct Air Capture (Patent)",
    "proj-filter-swarm": "Robotics & Swarm Drone",
    "proj-filter-auto": "Automation & Panels",

    "proj-cs-title": "Industrial Cold Storage Systems",
    "proj-cs-cat": "Cold Storage & Engineering",
    "proj-cs-desc": "Thermodynamic design, Bitzer/Copeland compressor sizing, 3-phase electrical panel integration, and commissioning for Freezer & Chiller rooms. Explore full portfolio at dinginlestariteknik.com.",

    "proj-dac-title": "Direct Air Capture (DAC) CO₂ System with Biochar",
    "proj-dac-cat": "Green Tech & Software Patent",
    "proj-dac-desc": "Physical system engineering for ambient CO₂ capture via biochar, hardware fabrication, telemetry control system connected to MATLAB, holding a Registered Software Patent for MATLAB Control Logic.",

    "proj-swarm-title": "Swarm Quadcopters Flight Control (SICE FES 2025)",
    "proj-swarm-cat": "Swarm Drone Research",
    "proj-swarm-desc": "Research on quadcopter swarm flight control featuring flocking dynamics, dynamic goal shifting, and sinusoidal altitude modulation. Watch the experiment video directly in the modal lightbox!",

    "proj-erp-title": "DLT ERP Platform (demo.dinginlestariteknik.com)",
    "proj-erp-cat": "SaaS & Enterprise Web",
    "proj-erp-desc": "Enterprise Resource Planning (ERP) platform custom-built for HVAC and cold storage operations covering technician dispatch, service scheduling, spare parts inventory, costing, and invoicing.",

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

    // Contact
    "contact-title": "Contact Me",
    "contact-sub": "Discuss cold storage engineering, technical consulting, or robotics research collaboration",
    "contact-loc-title": "Main Location",
    "contact-loc-desc": "Bandung, West Java, Indonesia",
    "contact-email-title": "Engineering Email",
    "contact-wa-title": "WhatsApp Direct",
    "contact-company-title": "Main Company",
    "contact-company-desc": "CV. Dingin Lestari Teknik (dinginlestariteknik.com)",
    "contact-erp-title": "ERP System Demo",
    "contact-erp-desc": "demo.dinginlestariteknik.com",
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

// --- Cold Storage Sizing Calculator Engine ---
function calculateCoolingLoad() {
  const roomType = document.getElementById("calcRoomType")?.value || "chiller";
  const length = parseFloat(document.getElementById("calcLength")?.value) || 0;
  const width = parseFloat(document.getElementById("calcWidth")?.value) || 0;
  const height = parseFloat(document.getElementById("calcHeight")?.value) || 0;
  const ambient = parseFloat(document.getElementById("calcAmbient")?.value) || 32;

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

  const deltaT = ambient - targetTemp;
  const totalWatts = volume * baseHeatGainWPerM3 * (deltaT / 30) * 1.2;
  const btuHr = totalWatts * 3.412;
  const hpEstimate = (btuHr / 9000).toFixed(1);
  const kwEstimate = (totalWatts / 1000).toFixed(2);

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
      <div style="display: flex; gap: 0.75rem; margin-top: 0.5rem; flex-wrap: wrap;">
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

// --- Projects & Innovations Gallery Engine (Performance Optimized - Zero Auto-Video Load) ---
const projectsData = [
  // Cold Storage CS_1~3
  {
    titleKey: "proj-cs-title",
    catKey: "proj-cs-cat",
    descKey: "proj-cs-desc",
    img: "img/New/CS_1.jpg",
    isVideo: false,
    category: "cs",
    tags: ["Cold Storage", "Refrigeration", "Freezer Room", "Chiller", "ABF", "Bitzer/Copeland"],
    link: "https://dinginlestariteknik.com/",
    linkText: "dinginlestariteknik.com"
  },

  // Direct Air Capture DAC_1~2 (Patent)
  {
    titleKey: "proj-dac-title",
    catKey: "proj-dac-cat",
    descKey: "proj-dac-desc",
    img: "img/New/DAC_1.jpg",
    isVideo: false,
    category: "dac",
    tags: ["Direct Air Capture", "CO2 Capture", "Biochar", "MATLAB Software Patent", "Hardware Design"],
    link: "https://www.researchgate.net/profile/Naufaldo-2",
    linkText: "Patent & Research Details"
  },

  // Drone Swarm Video (SICE FES 2025) - Lightweight Poster Card in Grid
  {
    titleKey: "proj-swarm-title",
    catKey: "proj-swarm-cat",
    descKey: "proj-swarm-desc",
    img: "img/Header.jpeg", // Poster image! Fast load!
    videoSrc: "img/New/Drone_Swarm.avi",
    isVideo: true,
    category: "swarm",
    tags: ["Swarm Drone", "Flight Control", "Flocking Dynamics", "SICE FES 2025", "Simulink"],
    link: "https://doi.org/10.23919/SICEFES67750.2025.11236621",
    linkText: "SICE FES 2025 Paper"
  },

  // DLT ERP Software Demo
  {
    titleKey: "proj-erp-title",
    catKey: "proj-erp-cat",
    descKey: "proj-erp-desc",
    img: "img/IMG-20230503-WA0015.jpg",
    isVideo: false,
    category: "cs",
    tags: ["ERP Software", "SaaS Platform", "HVAC Operations", "Field Service", "Cloud"],
    link: "https://demo.dinginlestariteknik.com/",
    linkText: "demo.dinginlestariteknik.com"
  },

  // Hexapod
  {
    titleKey: "proj-1-title",
    catKey: "proj-1-cat",
    descKey: "proj-1-desc",
    img: "img/IMG-20230503-WA0016.jpg",
    isVideo: false,
    category: "swarm",
    tags: ["ROS", "LiDAR", "SLAM", "Hexapod", "Arduino"]
  },

  // Ice Cream Robot
  {
    titleKey: "proj-2-title",
    catKey: "proj-2-cat",
    descKey: "proj-2-desc",
    img: "img/IMG-20230503-WA0017.jpg",
    isVideo: false,
    category: "auto",
    tags: ["Robotics", "Servo Control", "Automation", "PLC"]
  },

  // BAS Simulator
  {
    titleKey: "proj-3-title",
    catKey: "proj-3-cat",
    descKey: "proj-3-desc",
    img: "img/IMG-20230503-WA0019.jpg",
    isVideo: false,
    category: "auto",
    tags: ["BAS", "HVAC", "Building Automation", "SCADA"]
  },

  // DCS Training System
  {
    titleKey: "proj-4-title",
    catKey: "proj-4-cat",
    descKey: "proj-4-desc",
    img: "img/IMG-20230503-WA0021.jpg",
    isVideo: false,
    category: "auto",
    tags: ["DCS", "Process Control", "Modbus", "PLC"]
  }
];

function renderProjects(filterCategory = "all") {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const filtered = projectsData.filter(p => filterCategory === "all" || p.category === filterCategory);

  grid.innerHTML = filtered.map((p) => {
    const realIndex = projectsData.indexOf(p);
    const title = i18n[currentLang][p.titleKey] || p.titleKey;
    const cat = i18n[currentLang][p.catKey] || p.catKey;
    const desc = i18n[currentLang][p.descKey] || p.descKey;

    return `
      <div class="glass-card project-card" onclick="openProjectModal(${realIndex})">
        <div class="project-img-wrapper">
          <img src="${p.img}" alt="${title}" class="project-img" loading="lazy">
          ${p.isVideo ? `
            <div style="position:absolute; top:10px; right:10px; background:rgba(239, 68, 68, 0.9); color:#fff; padding:0.25rem 0.68rem; border-radius:20px; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px; box-shadow:0 0 10px rgba(239, 68, 68, 0.5);">
              <i class="fa fa-play-circle"></i> VIDEO DEMO
            </div>
          ` : ''}
          <div class="project-overlay">
            <span class="project-tag">${cat}</span>
          </div>
        </div>
        <h3 class="project-title">${title}</h3>
        <p style="font-size:0.88rem; color:var(--text-secondary); line-height:1.5;">${desc}</p>
        ${p.link ? `
          <div style="margin-top:0.75rem;">
            <a href="${p.link}" target="_blank" onclick="event.stopPropagation();" class="badge badge-purple" style="font-size:0.78rem;">
              <i class="fa fa-external-link"></i> ${p.linkText}
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }).join("");
}

function openProjectModal(index) {
  const p = projectsData[index];
  if (!p) return;

  const modal = document.getElementById("projectModal");
  const modalImg = document.getElementById("modalImg");
  const modalVideo = document.getElementById("modalVideo");
  const modalTitle = document.getElementById("modalTitle");
  const modalCat = document.getElementById("modalCat");
  const modalDesc = document.getElementById("modalDesc");
  const modalTags = document.getElementById("modalTags");
  const modalLinkBox = document.getElementById("modalLinkBox");

  if (p.isVideo && p.videoSrc) {
    modalImg.style.display = "none";
    modalVideo.style.display = "block";
    modalVideo.src = p.videoSrc; // Set video source ONLY when user opens modal!
    modalVideo.play().catch(() => {});
  } else {
    modalVideo.style.display = "none";
    if (modalVideo.src) modalVideo.pause();
    modalImg.style.display = "block";
    modalImg.src = p.img;
  }

  modalTitle.textContent = i18n[currentLang][p.titleKey] || p.titleKey;
  modalCat.textContent = i18n[currentLang][p.catKey] || p.catKey;
  modalDesc.textContent = i18n[currentLang][p.descKey] || p.descKey;
  modalTags.innerHTML = p.tags.map(t => `<span class="badge">${t}</span>`).join(" ");

  if (p.link) {
    modalLinkBox.style.display = "block";
    modalLinkBox.innerHTML = `
      <a href="${p.link}" target="_blank" class="btn btn-primary btn-sm">
        <i class="fa fa-external-link"></i> ${p.linkText}
      </a>
    `;
  } else {
    modalLinkBox.style.display = "none";
  }

  modal.classList.add("active");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalVideo = document.getElementById("modalVideo");
  if (modalVideo) {
    modalVideo.pause();
    modalVideo.removeAttribute("src"); // Clear source to free memory!
  }
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
      renderProjects(document.querySelector(".proj-filter-tags .filter-btn.active")?.dataset.cat || "all");
    });
  }

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

  // Projects Render & Filter
  renderProjects("all");

  document.querySelectorAll(".proj-filter-tags .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".proj-filter-tags .filter-btn").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");
      renderProjects(e.target.dataset.cat);
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

  // Mobile Navigation Menu Toggle & Auto Close on Click
  const navToggle = document.getElementById("mobileNavToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Sticky Navbar Blur on Scroll
  window.addEventListener("scroll", () => {
    const navbar = document.getElementById("navbar");
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    }
  });
});
