/* ==========================================================================
   Naufaldo Portfolio - Main JavaScript & Interactive Engines
   Bilingual System (ID/EN), Official CV Integrated Dataset,
   YouTube Embedded Video Support, Multi-Page Engine & Cold Storage Calculator
   ========================================================================== */

// --- Translations Dictionary (ID & EN) ---
const i18n = {
  id: {
    // Nav
    "nav-home": "Beranda",
    "nav-about": "Tentang",
    "nav-tools": "Fitur & Tool",
    "nav-projects": "Proyek",
    "nav-pub": "Publikasi",
    "nav-contact": "Kontak",

    // Hero
    "hero-badge": "Magister Teknik Mekatronika (M.Sc.) | Asesor LSP TPTU",
    "hero-title-prefix": "Halo, Saya ",
    "hero-subtitle": "Cold Storage & Automation Engineer | Asesor LSP TPTU | Peneliti Robotika",
    "hero-desc": "Direktur CV. Dingin Lestari Teknik & Asesor Kompetensi PT. LSP TPTU (No. Reg. MET.000.002933 2026). Pemegang Sertifikasi Teknis Refrigerasi F-Gas Tingkat 4, Paten Software MATLAB Direct Air Capture (DAC), & Lulusan M.Sc. NTUT Taiwan.",
    "hero-btn-contact": "Hubungi Saya",
    "hero-btn-calc": "Kalkulator Cold Storage",
    "hero-btn-erp": "Demo Web ERP",
    "hero-btn-sim": "Lab Simulasi Robot",
    "stat-exp": "Tahun Pengalaman",
    "stat-pub": "Publikasi Ilmiah",
    "stat-proj": "Proyek Rekayasa",

    // About
    "about-title": "Profil, Pengalaman & Keahlian",
    "about-sub": "Rekam jejak profesional sebagai insinyur cold storage, asesor kompetensi resmi, dan peneliti robotika",
    "about-text-1": "Lulusan Magister Teknik Mekatronika dari <strong>National Taipei University of Technology (NTUT), Taiwan</strong> dengan latar belakang kuat di bidang rekayasa sistem, otomasi, dan kontrol. Saat ini aktif sebagai <strong>Direktur CV. Dingin Lestari Teknik</strong> di Bandung, perusahaan yang bergerak di bidang perancangan, instalasi, dan pemeliharaan sistem cold storage (Freezer Room, Chiller Room, & ABF), serta <strong>Asesor Kompetensi Resmi PT. LSP TPTU (No. Reg. MET.000.002933 2026)</strong> dengan <strong>Sertifikasi Teknis Refrigerasi F-Gas Tingkat 4</strong>.",
    "about-text-2": "Didukung oleh pemahaman mendalam di bidang kontrol, IoT, dan otomasi industri, saya berfokus pada pengembangan solusi cold storage yang andal, efisien, dan berkelanjutan, pengembang platform digital <a href=\"https://demo.dinginlestariteknik.com/\" target=\"_blank\" rel=\"noopener\">demo.dinginlestariteknik.com</a>, pemegang <strong>Hak Cipta Paten Software MATLAB Direct Air Capture (DAC)</strong>, serta periset kendali formasi robot multi-agent & swarm drone.",

    // Experience Items
    "exp-title": "Pengalaman Kerja",
    
    "exp-1-role": "Direktur Utama",
    "exp-1-org": "CV. Dingin Lestari Teknik (Bandung)",
    "exp-1-date": "Juni 2025 – Sekarang",
    "exp-1-desc": "Memimpin perusahaan sistem pendingin cold storage. Bertanggung jawab atas perencanaan sistem, pemilihan kompresor/evaporator, optimasi energi, pengelolaan Freezer Room, Chiller Room, & ABF dari desain hingga commissioning.",

    "exp-2-role": "Industrial Electrician (Freelance / Project-Based)",
    "exp-2-org": "CV. Dingin Lestari Teknik",
    "exp-2-date": "Nov 2018 – Juni 2025",
    "exp-2-desc": "Merancang dan memasang panel kontrol listrik sistem freezer & chiller, pengkabelan listrik industri, instalasi panel, troubleshooting, serta proyek HVAC.",

    "exp-3-role": "Asesor Kompetensi Resmi",
    "exp-3-org": "PT. LSP TPTU (Lembaga Sertifikasi Profesi)",
    "exp-3-date": "2026 – Sekarang",
    "exp-3-desc": "Penguji dan asesor lisensi sertifikasi kompetensi profesi insinyur teknik pendingin dan tata udara (Reg. MET.000.002933 2026).",

    "exp-4-role": "Co-founder & Hardware Engineer",
    "exp-4-org": "Beantrack (Smart Agriculture Startup)",
    "exp-4-date": "Sept 2023 – Nov 2024",
    "exp-4-desc": "Mendirikan startup pertanian cerdas, meriset dan mengoptimalkan sistem pengering kopi berbasis tenaga surya terintegrasi sensor IoT.",

    "exp-5-role": "Peserta Bangkit Academy – Cloud Computing",
    "exp-5-org": "Bangkit Academy by Google, GoTo, Traveloka",
    "exp-5-date": "Feb 2023 – Juli 2023",
    "exp-5-desc": "Menyelesaikan jalur Cloud Computing dengan predikat Distinction. Kontribusi Capstone Project masuk TOP 20 & inkubasi bisnis.",

    "exp-6-role": "Engineer Intern",
    "exp-6-org": "Asperio & CV Akuratama Berkat Anugrah",
    "exp-6-date": "2018 & 2022",
    "exp-6-desc": "Merancang komponen mekanikal/elektrikal, manajemen inventaris proyek, serta perakitan panel listrik Water Treatment Plant (WTP).",

    // Education Items
    "edu-title": "Riwayat Pendidikan",
    
    "edu-1-degree": "Magister Sains (M.Sc.) — Teknik Mekatronika",
    "edu-1-school": "National Taipei University of Technology (NTUT), Taiwan",
    "edu-1-date": "2024 – 2025",
    "edu-1-desc": "Institut Teknik Mekatronika. Tesis: <em>Intelligent Control Strategies for Mobile Robotics: Multi-Agent System Robot Control Formation</em>. Riset robot eksplorasi indoor otonom & kendali formasi multi-agent.",

    "edu-2-degree": "Sarjana Terapan Teknik (S.Tr.T) — Teknik Otomasi & Mekatronika",
    "edu-2-school": "Politeknik Manufaktur Bandung (POLMAN), Indonesia",
    "edu-2-date": "2019 – 2023",
    "edu-2-desc": "Tugas Akhir: <em>Sistem Navigasi Robot SAR Berkaki Enam Menggunakan Sensor LiDAR dengan Metode SLAM</em>.",

    "edu-3-degree": "Sekolah Menengah Kejuruan (SMK) — Teknik Otomasi Industri",
    "edu-3-school": "SMKN 4 Bandung",
    "edu-3-date": "2017 – 2019",
    "edu-3-desc": "Dasar kelistrikan industri, perakitan kontrol motor, dan kelistrikan otomasi.",

    // Awards & Certifications
    "awards-title": "Penghargaan & Prestasi",
    "cert-title": "Sertifikasi Profesi & Lisensi",
    "skills-title": "Keahlian Teknis & Skill",

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

    "proj-cs1-title": "Cold Storage & Freezer Room Project #1",
    "proj-cs1-cat": "Cold Storage & Engineering",
    "proj-cs1-desc": "Perancangan sistem termal, perakitan panel listrik 3-phase, pemilihan kompresor Bitzer, dan commissioning Freezer Room industri. Portofolio lengkap di dinginlestariteknik.com.",

    "proj-cs2-title": "Chiller Room Refrigeration System #2",
    "proj-cs2-cat": "Cold Storage & Engineering",
    "proj-cs2-desc": "Instalasi kamar dingin Chiller Room untuk produk komersial dengan optimasi efisiensi energi kompresor & evaporator.",

    "proj-cs3-title": "Air Blast Freezer (ABF) System #3",
    "proj-cs3-cat": "Cold Storage & Engineering",
    "proj-cs3-desc": "Sistem pembekuan cepat Air Blast Freezer (ABF) kapasitas industri dengan pengontrol suhu presisi.",

    "proj-dac1-title": "Direct Air Capture (DAC) CO₂ Prototype #1",
    "proj-dac1-cat": "Green Tech & Hak Cipta Paten",
    "proj-dac1-desc": "Perancangan fisik sistem penangkap CO₂ di udara menggunakan media biochar, pembuatan instrumen hardware, dan pengujian laju penyerapan gas.",

    "proj-dac2-title": "DAC Telemetry Control & MATLAB Software Patent #2",
    "proj-dac2-cat": "Green Tech & Hak Cipta Paten",
    "proj-dac2-desc": "Pemrograman kendali telemetri terintegrasi MATLAB untuk sistem Direct Air Capture (DAC) dengan **Hak Cipta Paten Software Resmi**.",

    "proj-swarm-title": "Swarm Quadcopters Flight Control (SICE FES 2025)",
    "proj-swarm-cat": "Riset Swarm Drone & Flocking",
    "proj-swarm-desc": "Video riset kendali terbang kawanan quadcopter dengan dinamika flocking, penyesuaian target dinamis, dan modulasi ketinggian sinusoidal. Tonton video eksperimennya langsung di modal lightbox!",

    "proj-lemniscate-title": "Multi-Agent Lemniscate Formation Control (M.Sc. Thesis)",
    "proj-lemniscate-cat": "Riset Tesis M.Sc. NTUT Taiwan",
    "proj-lemniscate-desc": "Video eksperimen kendali formasi robot multi-agent mengikuti trajektori Lemniscate (angka 8) pada riset Tesis Magister NTUT Taiwan.",

    "proj-circular-title": "Multi-Agent Circular Formation Control (M.Sc. Thesis)",
    "proj-circular-cat": "Riset Tesis M.Sc. NTUT Taiwan",
    "proj-circular-desc": "Video eksperimen kendali formasi robot multi-agent mengikuti trajektori melingkar (circular trajectory) pada riset Tesis Magister NTUT Taiwan.",

    "proj-gazebo-follow-title": "Robot Following Gazebo Simulation (OpenCV & ROS)",
    "proj-gazebo-follow-cat": "Simulasi Gazebo & ROS",
    "proj-gazebo-follow-desc": "Riset simulasi lingkungan Gazebo & ROS untuk kendali robot pengikut (Robot Following) berfasilitas pemrosesan citra kamera OpenCV.",

    "proj-gazebo-ball-title": "Ball Tracking Gazebo Simulation (OpenCV & ROS)",
    "proj-gazebo-ball-cat": "Simulasi Gazebo & ROS",
    "proj-gazebo-ball-desc": "Riset simulasi Gazebo & ROS pelacakan & pengikutan bola warna secara otonom berbasis visi kamera OpenCV.",

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
    "contact-sub": "Diskusi proyek cold storage, sertifikasi & sertifikasi kompetensi, atau kolaborasi riset robotika",
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
    // Nav
    "nav-home": "Home",
    "nav-about": "About",
    "nav-tools": "Tools & Sim",
    "nav-projects": "Projects",
    "nav-pub": "Publications",
    "nav-contact": "Contact",

    // Hero
    "hero-badge": "M.Sc. Mechatronics Engineering | LSP TPTU Assessor",
    "hero-title-prefix": "Hi, I am ",
    "hero-subtitle": "Cold Storage & Automation Engineer | LSP TPTU Assessor | Robotics Researcher",
    "hero-desc": "Director of CV. Dingin Lestari Teknik & Official Competency Assessor at PT. LSP TPTU (Reg. MET.000.002933 2026). Holder of F-Gas Level 4 Technical Refrigeration Certification, MATLAB Software Patent for Direct Air Capture (DAC), & M.Sc. from NTUT Taiwan.",
    "hero-btn-contact": "Contact Me",
    "hero-btn-calc": "Cold Storage Calculator",
    "hero-btn-erp": "Web ERP Demo",
    "hero-btn-sim": "Robotics Sim Lab",
    "stat-exp": "Years Experience",
    "stat-pub": "Scientific Papers",
    "stat-proj": "Engineering Projects",

    // About
    "about-title": "Profile, Experience & Expertise",
    "about-sub": "Professional track record as cold storage engineer, official competency assessor, and robotics researcher",
    "about-text-1": "M.Sc. Mechatronics Engineering graduate from <strong>National Taipei University of Technology (NTUT), Taiwan</strong> with a strong background in system engineering, automation, and control. Currently active as <strong>Director of CV. Dingin Lestari Teknik</strong> in Bandung, specializing in industrial refrigeration design, installation, and maintenance (Freezer Rooms, Chiller Rooms, & ABF), and an <strong>Official Competency Assessor at PT. LSP TPTU (Reg. No. MET.000.002933 2026)</strong> with <strong>F-Gas Level 4 Technical Refrigeration Certification</strong>.",
    "about-text-2": "Backed by deep expertise in control systems, IoT, and industrial automation, I focus on developing reliable, energy-efficient, and sustainable refrigeration solutions, developer of <a href=\"https://demo.dinginlestariteknik.com/\" target=\"_blank\" rel=\"noopener\">demo.dinginlestariteknik.com</a> ERP, holder of a <strong>Registered Software Patent for MATLAB Direct Air Capture (DAC) CO₂ Systems</strong>, and multi-agent robotics & swarm drone researcher.",

    // Experience Items
    "exp-title": "Work Experience",

    "exp-1-role": "Managing Director",
    "exp-1-org": "CV. Dingin Lestari Teknik (Bandung)",
    "exp-1-date": "June 2025 – Present",
    "exp-1-desc": "Leading company operations in industrial refrigeration. Directing thermodynamic system engineering, compressor/evaporator selection, energy efficiency, and managing Freezer Room, Chiller Room, & ABF projects from design to commissioning.",

    "exp-2-role": "Industrial Electrician (Freelance / Project-Based)",
    "exp-2-org": "CV. Dingin Lestari Teknik",
    "exp-2-date": "Nov 2018 – June 2025",
    "exp-2-desc": "Designing and installing electrical control panels for freezer & chiller systems, industrial wiring, panel installation, troubleshooting, and HVAC projects.",

    "exp-3-role": "Official Competency Assessor",
    "exp-3-org": "PT. LSP TPTU (Professional Certification Body)",
    "exp-3-date": "2026 – Present",
    "exp-3-desc": "Official examiner and competency assessor for HVAC and industrial refrigeration engineering certifications (Reg. MET.000.002933 2026).",

    "exp-4-role": "Co-founder & Hardware Engineer",
    "exp-4-org": "Beantrack (Smart Agriculture Startup)",
    "exp-4-date": "Sept 2023 – Nov 2024",
    "exp-4-desc": "Co-founded a smart agriculture startup, developing solar-powered IoT coffee dryer systems.",

    "exp-5-role": "Bangkit Academy Participant – Cloud Computing",
    "exp-5-org": "Bangkit Academy by Google, GoTo, Traveloka",
    "exp-5-date": "Feb 2023 – July 2023",
    "exp-5-desc": "Completed Cloud Computing track with Distinction grade. Capstone Project selected in TOP 20 & awarded business incubation.",

    "exp-6-role": "Engineer Intern",
    "exp-6-org": "Asperio & CV Akuratama Berkat Anugrah",
    "exp-6-date": "2018 & 2022",
    "exp-6-desc": "Designed mechanical/electrical components, managed project inventory, and wired electrical panels for Water Treatment Plant (WTP) installations.",

    // Education Items
    "edu-title": "Education Background",

    "edu-1-degree": "Master of Science (M.Sc.) — Mechatronics Engineering",
    "edu-1-school": "National Taipei University of Technology (NTUT), Taiwan",
    "edu-1-date": "2024 – 2025",
    "edu-1-desc": "Institute of Mechatronics Engineering. Thesis: <em>Intelligent Control Strategies for Mobile Robotics: Multi-Agent System Robot Control Formation</em>. Research on autonomous indoor exploration & multi-agent system formation.",

    "edu-2-degree": "Bachelor of Applied Engineering (S.Tr.T) — Automation Engineering",
    "edu-2-school": "Politeknik Manufaktur Bandung (POLMAN), Indonesia",
    "edu-2-date": "2019 – 2023",
    "edu-2-desc": "Thesis: <em>Hexa-Legged SAR Robot Autonomous Navigation System Using LiDAR Sensor via SLAM Method</em>.",

    "edu-3-degree": "Vocational High School (SMK) — Industrial Automation",
    "edu-3-school": "SMKN 4 Bandung",
    "edu-3-date": "2017 – 2019",
    "edu-3-desc": "Industrial electrical fundamentals, motor control wiring, and automation systems.",

    // Awards & Certifications
    "awards-title": "Awards & Honors",
    "cert-title": "Professional Certifications",
    "skills-title": "Technical Skills & Competencies",

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

    "proj-cs1-title": "Cold Storage & Freezer Room Project #1",
    "proj-cs1-cat": "Cold Storage & Engineering",
    "proj-cs1-desc": "Thermodynamic design, Bitzer compressor sizing, 3-phase electrical panel integration, and commissioning for industrial Freezer Room. Full portfolio at dinginlestariteknik.com.",

    "proj-cs2-title": "Chiller Room Refrigeration System #2",
    "proj-cs2-cat": "Cold Storage & Engineering",
    "proj-cs2-desc": "Chiller Room installation for commercial perishable products with compressor energy efficiency optimization.",

    "proj-cs3-title": "Air Blast Freezer (ABF) System #3",
    "proj-cs3-cat": "Cold Storage & Engineering",
    "proj-cs3-desc": "Industrial capacity Air Blast Freezer (ABF) system engineered for rapid freezing with precision temperature control.",

    "proj-dac1-title": "Direct Air Capture (DAC) CO₂ Prototype #1",
    "proj-dac1-cat": "Green Tech & Software Patent",
    "proj-dac1-desc": "Physical system engineering for ambient CO₂ capture via biochar, hardware fabrication, and gas absorption rate evaluation.",

    "proj-dac2-title": "DAC Telemetry Control & MATLAB Software Patent #2",
    "proj-dac2-cat": "Green Tech & Software Patent",
    "proj-dac2-desc": "MATLAB telemetry & control logic programming for Direct Air Capture (DAC) holding a **Registered Official Software Patent**.",

    "proj-swarm-title": "Swarm Quadcopters Flight Control (SICE FES 2025)",
    "proj-swarm-cat": "Swarm Drone Research",
    "proj-swarm-desc": "Research video on quadcopter swarm flight control featuring flocking dynamics and sinusoidal altitude modulation. Watch the experiment video in the modal lightbox!",

    "proj-lemniscate-title": "Multi-Agent Lemniscate Formation Control (M.Sc. Thesis)",
    "proj-lemniscate-cat": "M.Sc. Thesis Research NTUT",
    "proj-lemniscate-desc": "Experimental video of multi-agent robot formation control tracking a Lemniscate (8-figure) trajectory from M.Sc. thesis research.",

    "proj-circular-title": "Multi-Agent Circular Formation Control (M.Sc. Thesis)",
    "proj-circular-cat": "M.Sc. Thesis Research NTUT",
    "proj-circular-desc": "Experimental video of multi-agent robot formation control tracking a circular trajectory from M.Sc. thesis research.",

    "proj-gazebo-follow-title": "Robot Following Gazebo Simulation (OpenCV & ROS)",
    "proj-gazebo-follow-cat": "Gazebo & ROS Simulation",
    "proj-gazebo-follow-desc": "Gazebo & ROS simulation research for robot following control using OpenCV camera vision processing.",

    "proj-gazebo-ball-title": "Ball Tracking Gazebo Simulation (OpenCV & ROS)",
    "proj-gazebo-ball-cat": "Gazebo & ROS Simulation",
    "proj-gazebo-ball-desc": "Gazebo & ROS simulation for autonomous colored ball tracking and following using OpenCV camera vision.",

    "proj-erp-title": "DLT ERP Platform (demo.dinginlestariteknik.com)",
    "proj-erp-cat": "SaaS & Web Software",
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
    langBtn.replaceChildren();
    const flagSpan = document.createElement("span");
    flagSpan.textContent = lang === "id" ? "🇮🇩" : "🇬🇧";
    const textNode = document.createTextNode(lang === "id" ? " ID" : " EN");
    langBtn.appendChild(flagSpan);
    langBtn.appendChild(textNode);
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

  const resVol = document.getElementById("resVolume");
  const resKw = document.getElementById("resLoadKw");
  const resBtu = document.getElementById("resLoadBtu");
  const resHp = document.getElementById("resHp");

  if (resVol) resVol.textContent = `${volume.toFixed(1)} m³`;
  if (resKw) resKw.textContent = `${kwEstimate} kW`;
  if (resBtu) resBtu.textContent = `${Math.round(btuHr).toLocaleString()} BTU/h`;
  if (resHp) resHp.textContent = `${hpEstimate} HP`;
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

  container.replaceChildren();

  if (filtered.length === 0) {
    const emptyBox = document.createElement("div");
    emptyBox.className = "glass-card text-center";
    emptyBox.style.padding = "2rem";
    emptyBox.style.color = "var(--text-dim)";
    emptyBox.textContent = "No publications found matching your search criteria.";
    container.appendChild(emptyBox);
    return;
  }

  filtered.forEach(pub => {
    const card = document.createElement("div");
    card.className = "glass-card pub-card";

    const titleEl = document.createElement("h3");
    titleEl.className = "pub-title";
    titleEl.textContent = pub.title;

    const metaEl = document.createElement("div");
    metaEl.className = "pub-meta";
    
    const venueSpan = document.createElement("span");
    venueSpan.className = "pub-venue";
    venueSpan.innerHTML = `<i class="fa fa-book"></i> ${pub.venue}`;

    const yearBadge = document.createElement("span");
    yearBadge.className = "badge badge-purple";
    yearBadge.textContent = pub.year;

    metaEl.appendChild(venueSpan);
    metaEl.appendChild(yearBadge);

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "0.75rem";
    btnRow.style.marginTop = "0.5rem";
    btnRow.style.flexWrap = "wrap";

    const doiLink = document.createElement("a");
    doiLink.href = pub.doi;
    doiLink.target = "_blank";
    doiLink.className = "btn btn-outline btn-sm";
    doiLink.innerHTML = `<i class="fa fa-external-link"></i> DOI Article`;

    const copyBtn = document.createElement("button");
    copyBtn.className = "btn btn-outline btn-sm";
    copyBtn.innerHTML = `<i class="fa fa-copy"></i> ${i18n[currentLang]["pub-btn-copy"]}`;
    copyBtn.addEventListener("click", () => copyCitation(pub.title, pub.venue));

    btnRow.appendChild(doiLink);
    btnRow.appendChild(copyBtn);

    card.appendChild(titleEl);
    card.appendChild(metaEl);
    card.appendChild(btnRow);

    container.appendChild(card);
  });
}

function copyCitation(title, venue) {
  const citation = `Naufaldo. "${title}." ${venue}.`;
  navigator.clipboard.writeText(citation).then(() => {
    alert(currentLang === "id" ? "Kutipan sitasi telah disalin!" : "Citation copied to clipboard!");
  });
}

// --- Projects & Innovations Gallery Engine ---
const projectsData = [
  // Swarm Drone YouTube Video (SICE FES 2025)
  {
    titleKey: "proj-swarm-title",
    catKey: "proj-swarm-cat",
    descKey: "proj-swarm-desc",
    img: "https://img.youtube.com/vi/JKuoD_4qvYw/hqdefault.jpg",
    youtubeId: "JKuoD_4qvYw",
    isVideo: true,
    category: "swarm",
    tags: ["Swarm Drone", "Flight Control", "Flocking Dynamics", "SICE FES 2025", "YouTube Video"],
    link: "https://doi.org/10.23919/SICEFES67750.2025.11236621",
    linkText: "SICE FES 2025 Paper"
  },

  // Gazebo OpenCV Robot Following
  {
    titleKey: "proj-gazebo-follow-title",
    catKey: "proj-gazebo-follow-cat",
    descKey: "proj-gazebo-follow-desc",
    img: "https://img.youtube.com/vi/tfDiMlBXNsY/hqdefault.jpg",
    youtubeId: "tfDiMlBXNsY",
    isVideo: true,
    category: "swarm",
    tags: ["Gazebo", "ROS", "OpenCV", "Robot Following", "YouTube Video"],
    link: "https://www.youtube.com/watch?v=tfDiMlBXNsY",
    linkText: "Watch on YouTube"
  },

  // Gazebo OpenCV Ball Tracking
  {
    titleKey: "proj-gazebo-ball-title",
    catKey: "proj-gazebo-ball-cat",
    descKey: "proj-gazebo-ball-desc",
    img: "https://img.youtube.com/vi/AqM-iCrh1rQ/hqdefault.jpg",
    youtubeId: "AqM-iCrh1rQ",
    isVideo: true,
    category: "swarm",
    tags: ["Gazebo", "ROS", "OpenCV", "Ball Tracking", "YouTube Video"],
    link: "https://www.youtube.com/watch?v=AqM-iCrh1rQ",
    linkText: "Watch on YouTube"
  },

  // M.Sc. Thesis YouTube Video #1 - Lemniscate Trajectory
  {
    titleKey: "proj-lemniscate-title",
    catKey: "proj-lemniscate-cat",
    descKey: "proj-lemniscate-desc",
    img: "https://img.youtube.com/vi/SJYSznTkrM0/hqdefault.jpg",
    youtubeId: "SJYSznTkrM0",
    isVideo: true,
    category: "swarm",
    tags: ["Leader-Follower", "Lemniscate Trajectory", "M.Sc. Thesis", "NTUT Taiwan", "YouTube Video"],
    link: "https://doi.org/10.1007/s12555-026-00119-1",
    linkText: "IJCAS 2026 Paper"
  },

  // M.Sc. Thesis YouTube Video #2 - Circular Trajectory
  {
    titleKey: "proj-circular-title",
    catKey: "proj-circular-cat",
    descKey: "proj-circular-desc",
    img: "https://img.youtube.com/vi/iG-kYV0TVr8/hqdefault.jpg",
    youtubeId: "iG-kYV0TVr8",
    isVideo: true,
    category: "swarm",
    tags: ["Leader-Follower", "Circular Formation", "M.Sc. Thesis", "NTUT Taiwan", "YouTube Video"],
    link: "https://doi.org/10.1080/02533839.2025.2503867",
    linkText: "JCIE 2025 Paper"
  },

  // Cold Storage CS_1
  {
    titleKey: "proj-cs1-title",
    catKey: "proj-cs1-cat",
    descKey: "proj-cs1-desc",
    img: "img/New/CS_1.jpg",
    isVideo: false,
    category: "cs",
    tags: ["Cold Storage", "Freezer Room", "Compressor", "Panel 3-Phase"],
    link: "https://dinginlestariteknik.com/",
    linkText: "dinginlestariteknik.com"
  },
  // CS_2
  {
    titleKey: "proj-cs2-title",
    catKey: "proj-cs2-cat",
    descKey: "proj-cs2-desc",
    img: "img/New/CS_2.jpg",
    isVideo: false,
    category: "cs",
    tags: ["Chiller Room", "Refrigeration", "Evaporator", "HVAC"],
    link: "https://dinginlestariteknik.com/",
    linkText: "dinginlestariteknik.com"
  },
  // CS_3
  {
    titleKey: "proj-cs3-title",
    catKey: "proj-cs3-cat",
    descKey: "proj-cs3-desc",
    img: "img/New/CS_3.jpg",
    isVideo: false,
    category: "cs",
    tags: ["Air Blast Freezer", "Rapid Freezing", "Control Panel", "Bitzer"],
    link: "https://dinginlestariteknik.com/",
    linkText: "dinginlestariteknik.com"
  },

  // DAC_1
  {
    titleKey: "proj-dac1-title",
    catKey: "proj-dac1-cat",
    descKey: "proj-dac1-desc",
    img: "img/New/DAC_1.jpg",
    isVideo: false,
    category: "dac",
    tags: ["Direct Air Capture", "CO2 Capture", "Biochar Media", "Hardware Prototype"],
    link: "https://www.researchgate.net/profile/Naufaldo-2",
    linkText: "ResearchGate Details"
  },
  // DAC_2
  {
    titleKey: "proj-dac2-title",
    catKey: "proj-dac2-cat",
    descKey: "proj-dac2-desc",
    img: "img/New/DAC_2.jpg",
    isVideo: false,
    category: "dac",
    tags: ["MATLAB Software Patent", "Telemetry Control", "CO2 Sensor", "Paten Resmi"],
    link: "https://www.researchgate.net/profile/Naufaldo-2",
    linkText: "Patent Document"
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

  grid.replaceChildren();

  filtered.forEach((p) => {
    const realIndex = projectsData.indexOf(p);
    const title = i18n[currentLang][p.titleKey] || p.titleKey;
    const cat = i18n[currentLang][p.catKey] || p.catKey;
    const desc = i18n[currentLang][p.descKey] || p.descKey;

    const card = document.createElement("div");
    card.className = "glass-card project-card";
    card.addEventListener("click", () => openProjectModal(realIndex));

    const imgWrapper = document.createElement("div");
    imgWrapper.className = "project-img-wrapper";

    const imgEl = document.createElement("img");
    imgEl.src = p.img;
    imgEl.alt = title;
    imgEl.className = "project-img";
    imgEl.loading = "lazy";
    imgWrapper.appendChild(imgEl);

    if (p.isVideo) {
      const vidBadge = document.createElement("div");
      vidBadge.style.cssText = "position:absolute; top:10px; right:10px; background:rgba(239, 68, 68, 0.9); color:#fff; padding:0.25rem 0.68rem; border-radius:20px; font-size:0.75rem; font-weight:700; display:flex; align-items:center; gap:4px; box-shadow:0 0 10px rgba(239, 68, 68, 0.5);";
      vidBadge.innerHTML = `<i class="fa fa-youtube-play"></i> YOUTUBE`;
      imgWrapper.appendChild(vidBadge);
    }

    const overlay = document.createElement("div");
    overlay.className = "project-overlay";
    const tagSpan = document.createElement("span");
    tagSpan.className = "project-tag";
    tagSpan.textContent = cat;
    overlay.appendChild(tagSpan);
    imgWrapper.appendChild(overlay);

    const titleEl = document.createElement("h3");
    titleEl.className = "project-title";
    titleEl.textContent = title;

    const descEl = document.createElement("p");
    descEl.style.cssText = "font-size:0.88rem; color:var(--text-secondary); line-height:1.5;";
    descEl.textContent = desc;

    card.appendChild(imgWrapper);
    card.appendChild(titleEl);
    card.appendChild(descEl);

    if (p.link) {
      const linkDiv = document.createElement("div");
      linkDiv.style.marginTop = "0.75rem";
      const linkAnchor = document.createElement("a");
      linkAnchor.href = p.link;
      linkAnchor.target = "_blank";
      linkAnchor.className = "badge badge-purple";
      linkAnchor.style.fontSize = "0.78rem";
      linkAnchor.innerHTML = `<i class="fa fa-external-link"></i> ${p.linkText}`;
      linkAnchor.addEventListener("click", (e) => e.stopPropagation());
      linkDiv.appendChild(linkAnchor);
      card.appendChild(linkDiv);
    }

    grid.appendChild(card);
  });
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

  const modalImgWrapper = document.querySelector(".modal-img-wrapper");

  if (p.youtubeId) {
    modalImg.style.display = "none";
    modalVideo.style.display = "none";
    
    const prevIframe = modalImgWrapper.querySelector("iframe");
    if (prevIframe) prevIframe.remove();

    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube.com/embed/${p.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${p.youtubeId}`;
    iframe.style.cssText = "width:100%; height:400px; border:none;";
    iframe.allow = "autoplay; encrypted-media; picture-in-picture";
    iframe.allowFullscreen = true;
    modalImgWrapper.appendChild(iframe);
  } else {
    const prevIframe = modalImgWrapper.querySelector("iframe");
    if (prevIframe) prevIframe.remove();

    modalVideo.style.display = "none";
    modalImg.style.display = "block";
    modalImg.src = p.img;
  }

  modalTitle.textContent = i18n[currentLang][p.titleKey] || p.titleKey;
  modalCat.textContent = i18n[currentLang][p.catKey] || p.catKey;
  modalDesc.textContent = i18n[currentLang][p.descKey] || p.descKey;

  // Tags
  modalTags.replaceChildren();
  p.tags.forEach(t => {
    const badge = document.createElement("span");
    badge.className = "badge";
    badge.textContent = t;
    modalTags.appendChild(badge);
  });

  // Link Box
  modalLinkBox.replaceChildren();
  if (p.link) {
    modalLinkBox.style.display = "block";
    const linkBtn = document.createElement("a");
    linkBtn.href = p.link;
    linkBtn.target = "_blank";
    linkBtn.className = "btn btn-primary btn-sm";
    linkBtn.innerHTML = `<i class="fa fa-external-link"></i> ${p.linkText}`;
    modalLinkBox.appendChild(linkBtn);
  } else {
    modalLinkBox.style.display = "none";
  }

  modal.classList.add("active");
}

function closeProjectModal() {
  const modal = document.getElementById("projectModal");
  const modalImgWrapper = document.querySelector(".modal-img-wrapper");
  if (modalImgWrapper) {
    const iframe = modalImgWrapper.querySelector("iframe");
    if (iframe) iframe.remove();
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
      e.currentTarget.classList.add("active");
      const cat = e.currentTarget.dataset.cat;
      const query = document.getElementById("pubSearchInput")?.value || "";
      renderPublications(cat, query);
    });
  });

  // Projects Render & Filter
  renderProjects("all");

  document.querySelectorAll(".proj-filter-tags .filter-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      document.querySelectorAll(".proj-filter-tags .filter-btn").forEach(b => b.classList.remove("active"));
      e.currentTarget.classList.add("active");
      renderProjects(e.currentTarget.dataset.cat);
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
