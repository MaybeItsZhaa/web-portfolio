"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { MapPin, Phone, Mail, Menu, X, ChevronRight, Award, Briefcase, GraduationCap, ArrowRight, MessageSquare, Send, Bot, User, Loader2, Sparkles, RefreshCw } from 'lucide-react';

// ---------------------------------------------------------
// DATA CV
// ---------------------------------------------------------
const CV_DATA = {
  personal: {
    name: "Aurelio Rafel Purnomo",
    role: "Administrasi & Pengolahan Data",
    email: "aureliorafell@gmail.com",
    phone: "+62 821-3261-8477",
    whatsapp: "6282132618477",
    location: "Tuban, Jawa Timur",
    linkedin: "Aurelio Rafel",
    summary: "Lulusan SMK dengan pengalaman di bidang administrasi, pelayanan pelanggan, dan digital marketing. Memiliki ketertarikan yang tinggi terhadap pengolahan data menggunakan Microsoft Excel serta sedang mengembangkan kemampuan melalui pelatihan Practical Office Advance. Teliti, cepat belajar, mampu bekerja di bawah tekanan, dan memiliki motivasi untuk berkembang sebagai profesional di bidang administrasi dan pengolahan data."
  },
  experience: [
    {
      id: 1,
      role: "Customer Service & Digital Marketing",
      company: "Blackprint Studio",
      period: "2024 - 2025",
      tasks: [
        "Mengelola komunikasi dengan pelanggan melalui berbagai media.",
        "Menangani administrasi pesanan dan pencatatan data pelanggan.",
        "Membantu kegiatan pemasaran digital melalui media sosial.",
        "Berkoordinasi dengan tim produksi untuk memastikan pesanan berjalan sesuai jadwal.",
        "Menyusun laporan sederhana terkait aktivitas operasional."
      ]
    },
    {
      id: 2,
      role: "Pramuniaga",
      company: "Laskar Buah",
      period: "2023 - 2024",
      tasks: [
        "Melayani pelanggan dengan ramah dan profesional.",
        "Menata, mengecek, dan mengelola stok barang.",
        "Membantu proses transaksi penjualan.",
        "Menjaga kebersihan dan kerapian area kerja."
      ]
    }
  ],
  education: [
    {
      id: 1,
      institution: "SMK Taruna Jaya Prawira Tuban",
      major: "Jurusan Teknik Otomotif",
      period: "2023 - 2024",
      type: "Pendidikan Formal"
    }
  ],
  training: [
    {
      id: 1,
      title: "Practical Office Advance",
      institution: "Balai Latihan Kerja (BLK) Tuban",
      year: "2025",
      type: "Pelatihan & Sertifikasi",
      isCertificate: true
    }
  ],
  skills: [
    "Microsoft Excel", "Microsoft Word", "Microsoft PowerPoint",
    "Administrasi Perkantoran", "Pengolahan Data", "Pembuatan Dashboard Excel",
    "Lookup & Dynamic Array", "Pivot Table", "Customer Service", "Digital Marketing"
  ]
};

// ---------------------------------------------------------
// ANIMATION VARIANTS
// ---------------------------------------------------------
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

// ---------------------------------------------------------
// COMPONENTS
// ---------------------------------------------------------
const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updateMousePosition = (e: any) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleMouseOver = (e: any) => {
      if (e.target.tagName.toLowerCase() === 'button' || e.target.tagName.toLowerCase() === 'a' || e.target.closest('button') || e.target.closest('a')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 rounded-full border border-yellow-500/50 pointer-events-none z-[9999] mix-blend-screen hidden md:flex items-center justify-center shadow-[0_0_10px_rgba(234,179,8,0.3)]"
      animate={{
        x: mousePosition.x - 12,
        y: mousePosition.y - 12,
        scale: isHovering ? 1.5 : 1,
        backgroundColor: isHovering ? 'rgba(234,179,8,0.2)' : 'rgba(0,0,0,0)',
      }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
    >
      <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full shadow-[0_0_5px_rgba(234,179,8,0.8)]" />
    </motion.div>
  );
};

const Preloader = ({ setLoading }: { setLoading: any }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [setLoading]);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] flex items-center justify-center bg-[#0a0a0a]"
      initial={{ y: 0 }}
      exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
    >
      <div className="flex flex-col items-center gap-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          className="w-16 h-16 border-t-2 border-r-2 border-yellow-600 rounded-full"
          style={{ boxShadow: '0 0 20px rgba(202, 138, 4, 0.2)' }}
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="text-yellow-600/80 text-sm tracking-[0.4em] uppercase font-light"
        >
          Memuat
        </motion.p>
      </div>
    </motion.div>
  );
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tentang', href: '#about' },
    { name: 'Pengalaman', href: '#experience' },
    { name: 'Pendidikan', href: '#education' },
    { name: 'Keahlian', href: '#skills' },
    { name: 'Kontak', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? 'py-4 bg-[#0a0a0a]/90 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)] border-b border-yellow-900/30'
          : 'py-8 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold tracking-tighter text-white">
          Hello,<span className="text-yellow-600">.</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-neutral-400 hover:text-yellow-500 transition-colors uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
        </nav>

        {/* Mobile Nav Toggle */}
        <div className="flex items-center gap-4 md:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-yellow-600 hover:text-yellow-400 transition-colors"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-yellow-900/30 shadow-2xl md:hidden py-8 px-6 flex flex-col gap-6 items-center"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-lg font-medium text-neutral-300 hover:text-yellow-500 uppercase tracking-widest w-full text-center py-2 border-b border-white/5 last:border-none"
              >
                {link.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const Hero = () => {
  const [aiGreeting, setAiGreeting] = useState('');
  const [isGeneratingGreeting, setIsGeneratingGreeting] = useState(false);

  const generateGreeting = async () => {
    setIsGeneratingGreeting(true);
    try {
      const hour = new Date().getHours();
      let timeOfDay = 'Pagi';
      if (hour >= 12 && hour < 15) timeOfDay = 'Siang';
      else if (hour >= 15 && hour < 18) timeOfDay = 'Sore';
      else if (hour >= 18) timeOfDay = 'Malam';

      const prompt = `Buat satu kalimat sapaan singkat, elegan, dan profesional dalam bahasa Indonesia untuk menyambut pengunjung di website portfolio luxury saya. Waktu saat ini adalah ${timeOfDay}. Nama saya Aurelio, seorang profesional di bidang Administrasi dan Pengolahan Data. Sapaan harus berkelas. Maksimal 15-20 kata.`;
      
      const payload = {
        contents: [{ parts: [{ text: prompt }] }],
      };
      
      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
         setAiGreeting(data.candidates[0].content.parts[0].text.replace(/["']/g, ''));
      }
    } catch (error) {
      console.error("Failed to generate greeting:", error);
      setAiGreeting("Selamat datang di portfolio eksklusif saya.");
    } finally {
      setIsGeneratingGreeting(false);
    }
  };

  useEffect(() => {
    generateGreeting();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-[#050505]">
      {/* Abstract Luxury Background Based on Reference */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
         {/* Gold glowing orbs */}
        <div className="absolute top-1/4 -left-[20%] w-[800px] h-[800px] bg-yellow-600/10 rounded-full blur-[150px] mix-blend-screen" />
        <div className="absolute bottom-[-10%] -right-[10%] w-[600px] h-[600px] bg-amber-700/10 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Subtle texture/lines hinting at the reference image flow */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.03] mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)"/>
        </svg>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
<motion.div 
  variants={fadeUp} 
  transition={{ duration: 0.8 }}
  className="mb-8 inline-block"
>
  <span className="px-4 py-1.5 border border-yellow-700/50 rounded-full text-xs md:text-sm font-medium tracking-[0.2em] uppercase text-yellow-500/80 bg-yellow-900/10 backdrop-blur-sm">
    PORTFOLIO
  </span>
</motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl lg:text-9xl font-bold tracking-tighter mb-6 leading-[1.05] text-transparent bg-clip-text bg-gradient-to-br from-yellow-100 via-yellow-500 to-yellow-800 pb-2">
            {CV_DATA.personal.name}
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl md:text-3xl text-neutral-300 mb-8 font-light tracking-wide">
          <span className="text-yellow-600 font-normal">{CV_DATA.personal.role}</span>
          </motion.p>

          <motion.div variants={fadeUp} className="mb-12 relative max-w-2xl mx-auto flex items-center justify-center gap-3">
             {isGeneratingGreeting ? (
                <div className="flex items-center gap-2 text-yellow-700/50 text-sm">
                  <Loader2 size={14} className="animate-spin" /> Mengkoneksikan...
                </div>
             ) : (
                <div className="p-4 rounded-2xl bg-gradient-to-r from-transparent via-yellow-900/10 to-transparent border-y border-yellow-900/20">
                  <p className="text-sm md:text-base text-neutral-400 italic font-light flex items-center gap-3">
                    <Sparkles size={16} className="text-yellow-600" />
                    "{aiGreeting}"
                    <button 
                      onClick={generateGreeting} 
                      className="ml-2 p-1.5 rounded-full hover:bg-yellow-900/30 text-yellow-700 transition-colors"
                      title="Sapaan baru"
                    >
                      <RefreshCw size={14} />
                    </button>
                  </p>
                </div>
             )}
          </motion.div>
          
          <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <a
              href="#contact"
              className="px-10 py-4 bg-gradient-to-r from-yellow-600 to-yellow-800 text-black rounded-none border border-yellow-500 font-semibold uppercase tracking-widest text-sm hover:from-yellow-500 hover:to-yellow-700 transition-all shadow-[0_0_20px_rgba(202,138,4,0.3)] hover:shadow-[0_0_30px_rgba(202,138,4,0.5)] flex items-center gap-3"
            >
              Hubungi Saya <ArrowRight size={16} />
            </a>
            <a
              href="#experience"
              className="px-10 py-4 bg-transparent border border-neutral-700 text-neutral-300 rounded-none font-semibold uppercase tracking-widest text-sm hover:border-yellow-600 hover:text-yellow-500 transition-colors"
            >
              Eksplorasi Profil
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll indicator - Elegant Line */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 opacity-70"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
      >
        <span className="text-[10px] uppercase tracking-[0.3em] text-yellow-700 font-medium">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-yellow-600 to-transparent" />
      </motion.div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-8 bg-[#080808] overflow-hidden border-y border-yellow-900/20 shadow-[inset_0_0_50px_rgba(0,0,0,0.8)]">
      <div className="flex whitespace-nowrap">
        <motion.div
          className="flex gap-16 px-6 items-center"
          animate={{ x: [0, -1035] }}
          transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
        >
          {[...CV_DATA.skills, ...CV_DATA.skills].map((skill, index) => (
            <div key={index} className="flex items-center gap-16">
              <span className="text-xl md:text-2xl font-light tracking-wider text-neutral-500 uppercase">
                {skill}
              </span>
              <span className="text-yellow-800 text-lg">✦</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 bg-[#050505] relative">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-900/5 rounded-full blur-[100px] mix-blend-screen pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start"
        >
          <div className="lg:col-span-5">
            <motion.div variants={fadeUp} className="sticky top-32">
              <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tighter mb-4">
                Profil<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-700">Singkat.</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-yellow-600 to-transparent mt-8" />
            </motion.div>
          </div>
          <div className="lg:col-span-7">
            <motion.p variants={fadeUp} className="text-xl md:text-2xl leading-relaxed text-neutral-400 font-light text-justify">
              {CV_DATA.personal.summary}
            </motion.p>
            
            <motion.div variants={fadeUp} className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-8 bg-[#0a0a0a] border border-neutral-800 hover:border-yellow-700/50 transition-colors group">
                <Briefcase className="text-yellow-700 group-hover:text-yellow-500 transition-colors mb-6" size={32} />
                <h3 className="text-xl font-medium text-white mb-3">Fokus Karir</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">Administrasi, Pelayanan Pelanggan & Pengolahan Data Strategis.</p>
              </div>
              <div className="p-8 bg-[#0a0a0a] border border-neutral-800 hover:border-yellow-700/50 transition-colors group">
                <Award className="text-yellow-700 group-hover:text-yellow-500 transition-colors mb-6" size={32} />
                <h3 className="text-xl font-medium text-white mb-3">Etos Kerja</h3>
                <p className="text-neutral-500 text-sm leading-relaxed">Ketelitian tinggi, adaptif, dan mampu berprestasi di bawah tekanan.</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Experience = () => {
  return (
    <section id="experience" className="py-32 bg-[#080808] border-t border-neutral-900 relative">
      <div className="absolute left-0 bottom-1/4 w-[400px] h-[400px] bg-yellow-600/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-5xl mx-auto"
        >
          <motion.div variants={fadeUp} className="text-center mb-24">
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tighter uppercase">
              PENGALAMAN <span className="text-yellow-600">KERJA</span>
            </h2>
            <div className="w-16 h-1 bg-yellow-600 mx-auto mt-6" />
          </motion.div>

          <div className="space-y-16">
            {CV_DATA.experience.map((exp, index) => (
              <motion.div key={exp.id} variants={fadeUp} className="relative">
                <div className="md:grid md:grid-cols-12 gap-12 items-start group">
                  
                  {/* Period & Company */}
                  <div className="md:col-span-4 mb-6 md:mb-0 md:text-right relative">
                    <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600 md:justify-end flex">
                      {exp.period}
                    </h3>
                    <p className="text-neutral-400 mt-2 font-medium tracking-wide uppercase text-sm">{exp.company}</p>
                    
                    {/* Minimalist Divider */}
                    <div className="hidden md:block absolute top-4 -right-6 w-12 h-[1px] bg-yellow-900/50 group-hover:bg-yellow-500 transition-colors" />
                  </div>

                  {/* Details */}
                  <div className="md:col-span-8 p-8 bg-[#0a0a0a] border border-neutral-800 group-hover:border-yellow-700/30 transition-all shadow-lg hover:shadow-[0_0_30px_rgba(202,138,4,0.05)]">
                    <h4 className="text-2xl font-semibold text-white mb-6">{exp.role}</h4>
                    <ul className="space-y-4">
                      {exp.tasks.map((task, i) => (
                        <li key={i} className="flex items-start gap-4 text-neutral-400">
                          <span className="text-yellow-700 mt-1.5 shrink-0 text-xs">◆</span>
                          <span className="leading-relaxed">{task}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Education = () => {
  return (
    <section id="education" className="py-32 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Formal Education */}
          <div className="p-10 border border-neutral-800 bg-gradient-to-b from-[#0a0a0a] to-transparent">
            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-12 border-b border-neutral-800 pb-6">
              <GraduationCap size={32} className="text-yellow-600" />
              <h2 className="text-2xl font-light text-white tracking-widest uppercase">Pendidikan Formal</h2>
            </motion.div>
            <div className="space-y-8">
              {CV_DATA.education.map((edu) => (
                <motion.div key={edu.id} variants={fadeUp} className="relative pl-6 border-l border-yellow-900/50">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 bg-[#050505] border border-yellow-600 transform rotate-45" />
                  <span className="inline-block text-yellow-600/80 text-sm font-semibold mb-2 font-mono">
                    {edu.period}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{edu.institution}</h3>
                  <p className="text-neutral-500">{edu.major}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Training & Certifications */}
          <div className="p-10 border border-neutral-800 bg-gradient-to-b from-[#0a0a0a] to-transparent">
            <motion.div variants={fadeUp} className="flex items-center gap-6 mb-12 border-b border-neutral-800 pb-6">
              <Award size={32} className="text-yellow-600" />
              <h2 className="text-2xl font-light text-white tracking-widest uppercase">Pelatihan & Sertifikasi</h2>
            </motion.div>
            <div className="space-y-8">
              {CV_DATA.training.map((train) => (
                <motion.div key={train.id} variants={fadeUp} className="relative pl-6 border-l border-yellow-900/50">
                  <div className="absolute top-2 -left-1.5 w-3 h-3 bg-[#050505] border border-yellow-600 transform rotate-45" />
                  <span className="inline-block text-yellow-600/80 text-sm font-semibold mb-2 font-mono">
                    Tahun {train.year}
                  </span>
                  <h3 className="text-xl font-bold text-white mb-1">{train.title}</h3>
                  <p className="text-neutral-500 mb-3">{train.institution}</p>
                  {train.isCertificate && (
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-yellow-900/20 border border-yellow-700/30 text-xs font-medium text-yellow-500">
                      <Award size={14} /> Tersertifikasi
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Skills = () => {
  return (
    <section id="skills" className="py-32 bg-[#080808] border-y border-neutral-900 relative">
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-yellow-900/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-4xl mx-auto mb-20"
        >
          <motion.h2 variants={fadeUp} className="text-3xl md:text-5xl font-light tracking-widest uppercase mb-6 text-white">
            Kompetensi <span className="font-bold text-yellow-600">Kunci</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="w-12 h-[2px] bg-yellow-600 mx-auto" />
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto"
        >
          {CV_DATA.skills.map((skill, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="px-8 py-4 bg-[#0a0a0a] border border-neutral-800 text-neutral-300 font-medium hover:border-yellow-600 hover:text-yellow-500 hover:shadow-[0_0_15px_rgba(202,138,4,0.15)] transition-all cursor-default uppercase text-sm tracking-wider"
            >
              {skill}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const AIFitChecker = () => {
  const [jobRole, setJobRole] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCheckFit = async (e: any) => {
    e.preventDefault();
    if (!jobRole.trim() || loading) return;

    setLoading(true);
    setResult('');

    try {
      const prompt = `Anda adalah AI asisten rekrutmen profesional bergaya luxury dan eksklusif. Berdasarkan data CV berikut: ${JSON.stringify(CV_DATA)}. 
      Rekruter sedang mencari kandidat untuk posisi: "${jobRole}". 
      Tuliskan 1 atau 2 paragraf singkat, persuasif, elegan, dan profesional dalam Bahasa Indonesia yang menjelaskan mengapa Aurelio Rafel Purnomo adalah kandidat yang relevan berdasarkan pengalaman aslinya. 
      Gunakan nada bicara yang sopan, berkelas, dan meyakinkan. Jika posisi melenceng jauh, berikan jawaban elegan bahwa fokusnya adalah administrasi/data.`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };

      const apiKey = "";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.candidates && data.candidates.length > 0) {
        setResult(data.candidates[0].content.parts[0].text);
      } else {
        setResult('Sistem sedang tidak dapat memproses analisis saat ini. Silakan coba beberapa saat lagi.');
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setResult('Terjadi gangguan koneksi saat menghubungi sistem AI. Silakan periksa jaringan Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Decorative lines */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-900/50 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-900/50 to-transparent" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="max-w-4xl mx-auto bg-[#0a0a0a]/80 backdrop-blur-xl border border-neutral-800 p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
        >
          <div className="text-center mb-12">
             <div className="inline-flex items-center justify-center p-4 bg-yellow-900/10 border border-yellow-700/30 mb-6 rounded-full">
               <Bot size={28} className="text-yellow-600" />
             </div>
             <h2 className="text-3xl md:text-4xl font-light tracking-widest text-white uppercase mb-4">
               Analisis Kecocokan <span className="font-bold text-yellow-600">AI</span>
             </h2>
             <p className="text-neutral-400 font-light max-w-2xl mx-auto">
               Evaluasi kesesuaian profil saya dengan kebutuhan spesifik posisi yang Anda cari menggunakan kecerdasan buatan.
             </p>
          </div>

          <motion.form variants={fadeUp} onSubmit={handleCheckFit} className="flex flex-col sm:flex-row gap-0 border border-neutral-700 focus-within:border-yellow-600 transition-colors bg-[#050505] mb-8">
            <input
              type="text"
              value={jobRole}
              onChange={(e) => setJobRole(e.target.value)}
              placeholder="Masukkan nama posisi incaran (ex: Data Analyst)..."
              className="flex-1 px-8 py-5 bg-transparent text-white outline-none placeholder-neutral-600 font-light"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={!jobRole.trim() || loading}
              className="px-10 py-5 bg-yellow-600 text-black font-bold uppercase tracking-widest text-sm hover:bg-yellow-500 transition-colors disabled:opacity-50 disabled:hover:bg-yellow-600 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Proses
                </>
              ) : (
                <>Analisis</>
              )}
            </button>
          </motion.form>

          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="p-8 border border-yellow-900/30 bg-gradient-to-br from-yellow-900/5 to-transparent relative">
                  <div className="absolute top-0 left-0 w-1 h-full bg-yellow-600" />
                  <h4 className="text-xs font-bold text-yellow-600 uppercase tracking-widest mb-4">Kesimpulan Sistem</h4>
                  <div className="text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                    {result}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

const Contact = () => {
  const mapUrl = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126647.78018260655!2d111.95478496464528!3d-6.897371584988775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e77a28e831ea231%3A0xc3b8417dcd872ff7!2sTuban%2C%20Tuban%20Regency%2C%20East%20Java!5e0!3m2!1sen!2sid!4v1700000000000!5m2!1sen!2sid";

  return (
    <section id="contact" className="py-32 bg-[#080808]">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <div className="mb-20">
            <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-light tracking-widest text-white uppercase mb-4">
              Jalin <span className="font-bold text-yellow-600">Koneksi</span>
            </motion.h2>
            <motion.p variants={fadeUp} className="text-neutral-500 font-light">
              Terbuka untuk diskusi profesional dan peluang kolaborasi strategis.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <motion.div variants={fadeUp} className="space-y-12">
              <div className="space-y-8">
                <a href={`mailto:${CV_DATA.personal.email}`} className="flex items-center gap-6 group">
                  <div className="w-16 h-16 border border-neutral-700 bg-[#0a0a0a] flex items-center justify-center group-hover:border-yellow-600 group-hover:bg-yellow-900/10 transition-all">
                    <Mail size={24} className="text-neutral-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Email Resmi</p>
                    <p className="font-medium text-white group-hover:text-yellow-500 transition-colors">{CV_DATA.personal.email}</p>
                  </div>
                </a>
                
                <a href={`https://wa.me/${CV_DATA.personal.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-6 group">
                  <div className="w-16 h-16 border border-neutral-700 bg-[#0a0a0a] flex items-center justify-center group-hover:border-yellow-600 group-hover:bg-yellow-900/10 transition-all">
                    <Phone size={24} className="text-neutral-400 group-hover:text-yellow-500 transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Kontak Langsung</p>
                    <p className="font-medium text-white group-hover:text-yellow-500 transition-colors">{CV_DATA.personal.phone}</p>
                  </div>
                </a>

                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 border border-neutral-700 bg-[#0a0a0a] flex items-center justify-center">
                    <MapPin size={24} className="text-neutral-400" />
                  </div>
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-1">Basis Operasional</p>
                    <p className="font-medium text-white">{CV_DATA.personal.location}</p>
                  </div>
                </div>
              </div>

              {/* Minimalist Map Embed */}
              <div className="w-full h-48 border border-neutral-800 bg-[#0a0a0a] relative grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <iframe
                  title="Lokasi Tuban"
                  src={mapUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0"
                ></iframe>
              </div>
            </motion.div>

            {/* Form */}
            <motion.div variants={fadeUp}>
              <form className="bg-[#0a0a0a] border border-neutral-800 p-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                <h3 className="text-2xl font-light text-white mb-6 uppercase tracking-wider border-b border-neutral-800 pb-4">Kirim Pesan</h3>
                
                <div className="space-y-2">
                  <label htmlFor="name" className="block text-xs font-bold text-neutral-500 uppercase tracking-widest">Nama Lengkap</label>
                  <input 
                    type="text" 
                    id="name" 
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-yellow-600 focus:outline-none text-white font-light transition-colors" 
                    placeholder="Nama Anda"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="block text-xs font-bold text-neutral-500 uppercase tracking-widest">Email</label>
                  <input 
                    type="email" 
                    id="email" 
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-yellow-600 focus:outline-none text-white font-light transition-colors" 
                    placeholder="Alamat Email"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="block text-xs font-bold text-neutral-500 uppercase tracking-widest">Pesan</label>
                  <textarea 
                    id="message" 
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-b border-neutral-700 focus:border-yellow-600 focus:outline-none text-white font-light transition-colors resize-none" 
                    placeholder="Isi pesan..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full py-5 bg-gradient-to-r from-yellow-700 to-yellow-900 text-white uppercase tracking-widest text-sm font-bold hover:from-yellow-600 hover:to-yellow-800 transition-colors mt-4">
                  Kirim Pesan
                </button>
              </form>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-10 bg-[#050505] border-t border-neutral-900">
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <a href="#" className="text-xl font-bold tracking-tighter text-white">
          Aurelio<span className="text-yellow-600">.</span>
        </a>
        <p className="text-neutral-600 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Hak Cipta Dilindungi.
        </p>
      </div>
    </footer>
  );
};

const AIChatAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', text: 'Salam hormat. Saya asisten virtual Aurelio. Adakah informasi spesifik mengenai profil profesional beliau yang ingin Anda ketahui?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendMessage = async (e: any) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `Anda adalah representasi AI eksklusif untuk portfolio Aurelio Rafel Purnomo. 
      Tugas Anda adalah menjawab pertanyaan HANYA berdasarkan data: ${JSON.stringify(CV_DATA)}.
      
      Aturan:
      1. Jawab dengan sangat profesional, elegan, dan sopan dalam Bahasa Indonesia.
      2. Dilarang mengarang informasi.
      3. Jika di luar konteks data, arahkan secara elegan untuk menghubungi email: ${CV_DATA.personal.email}.
      4. Jawaban singkat dan padat.`;

      const apiHistory = messages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      apiHistory.push({ role: 'user', parts: [{ text: userMessage.text }] });

      const payload = {
        contents: apiHistory,
        systemInstruction: { parts: [{ text: systemPrompt }] }
      };

      const apiKey = ""; 
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const result = await response.json();
      
      if (result.candidates && result.candidates.length > 0) {
        const aiText = result.candidates[0].content.parts[0].text;
        setMessages((prev) => [...prev, { role: 'model', text: aiText }]);
      } else {
        setMessages((prev) => [...prev, { role: 'model', text: 'Sistem mengalami kendala sementara. Mohon coba lagi.' }]);
      }
    } catch (error) {
      console.error("Gemini API Error:", error);
      setMessages((prev) => [...prev, { role: 'model', text: 'Koneksi ke sistem terputus. Silakan periksa jaringan.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100] flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="mb-6 w-[350px] sm:w-[400px] h-[550px] bg-[#0a0a0a] border border-yellow-900/50 shadow-[0_10px_40px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="px-6 py-5 bg-[#050505] border-b border-yellow-900/30 flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 border border-yellow-700 flex items-center justify-center bg-yellow-900/10">
                  <Bot size={20} className="text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-medium text-white tracking-widest text-sm uppercase">Concierge AI</h3>
                  <p className="text-[10px] text-yellow-600 flex items-center gap-2 mt-1 uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-500 animate-pulse shadow-[0_0_5px_rgba(234,179,8,0.8)]"></span> Aktif
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-neutral-500 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#0a0a0a]">
              {messages.map((msg, index) => (
                <div 
                  key={index} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border ${msg.role === 'user' ? 'border-neutral-700 bg-[#111]' : 'border-yellow-700 bg-yellow-900/20'}`}>
                      {msg.role === 'user' ? <User size={14} className="text-neutral-400" /> : <Bot size={14} className="text-yellow-600" />}
                    </div>
                    <div className={`p-4 text-sm leading-relaxed font-light ${msg.role === 'user' ? 'bg-neutral-900 border border-neutral-800 text-white' : 'bg-transparent border border-yellow-900/30 text-neutral-300'}`}>
                      {msg.text}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-4 max-w-[85%]">
                    <div className="w-8 h-8 border border-yellow-700 bg-yellow-900/20 flex items-center justify-center">
                      <Bot size={14} className="text-yellow-600" />
                    </div>
                    <div className="p-4 bg-transparent border border-yellow-900/30 flex items-center gap-3 text-neutral-500">
                      <Loader2 size={14} className="animate-spin" />
                      <span className="text-xs uppercase tracking-widest">Memproses...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <div className="p-0 border-t border-yellow-900/30 bg-[#050505]">
              <form onSubmit={handleSendMessage} className="flex">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ketik pesan Anda..."
                  disabled={isLoading}
                  className="flex-1 px-6 py-5 bg-transparent border-none text-sm text-white focus:outline-none focus:ring-0 font-light placeholder-neutral-600"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="px-6 bg-yellow-900/20 text-yellow-600 hover:bg-yellow-600 hover:text-black border-l border-yellow-900/30 disabled:opacity-50 disabled:hover:bg-yellow-900/20 disabled:hover:text-yellow-600 transition-colors flex items-center justify-center"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-[#0a0a0a] text-yellow-500 flex items-center justify-center border border-yellow-700/50 shadow-[0_0_20px_rgba(202,138,4,0.2)] hover:shadow-[0_0_30px_rgba(202,138,4,0.4)] transition-all"
        aria-label="Tanya AI Asisten"
      >
        {isOpen ? <X size={28} /> : <MessageSquare size={28} />}
      </motion.button>
    </div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);

  // Forced Dark Mode for Luxury Theme
  useEffect(() => {
    document.documentElement.classList.add('dark');
    document.documentElement.style.scrollBehavior = 'smooth';
    return () => { document.documentElement.style.scrollBehavior = 'auto'; };
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-yellow-600 selection:text-black">
      <AnimatePresence mode="wait">
        {loading && <Preloader setLoading={setLoading} />}
      </AnimatePresence>

      <CustomCursor />
      
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <Marquee />
            <About />
            <Experience />
            <Education />
            <Skills />
            <AIFitChecker />
            <Contact />
          </main>
          <Footer />
          <AIChatAssistant />
        </>
      )}
    </div>
  );
}