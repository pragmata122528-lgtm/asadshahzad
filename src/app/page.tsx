"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

import HeroSection from "@/components/HeroSection";
import ResearchSection from "@/components/ResearchSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection, { Footer } from "@/components/ContactSection";
import { LuxuryCursor, MagneticButton } from "@/components/LuxuryCursor";
import { TapeDivider, WaveDivider, StitchDivider } from "@/components/SectionDivider";

function Background() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div ref={containerRef} className="fixed inset-0 z-0 overflow-hidden bg-[#050508] pointer-events-none">
      <div 
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 transition-transform duration-1000 ease-out"
        style={{
          background: "radial-gradient(circle, #ff6b00, transparent)",
          left: mousePos.x - 300,
          top: mousePos.y - 300,
          transform: "translate3d(0,0,0)",
        }}
      />
      
      <div className="absolute inset-0 opacity-[0.03]" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3BaseFilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/baseFilter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 opacity-[0.1]"
        style={{
          backgroundImage: `linear-gradient(#ff6b00 1px, transparent 1px), linear-gradient(90deg, #ff6b00 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[80px] opacity-10"
          style={{
            width: Math.random() * 400 + 200,
            height: Math.random() * 400 + 200,
            background: i % 2 === 0 ? "#ff6b00" : "#ffffff",
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Research", href: "#research" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-4 bg-[#050508]/80 backdrop-blur-xl border-b border-white/5" : "py-8 bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <motion.a
          href="#"
          className="text-2xl font-bold tracking-tighter flex items-center gap-2 group"
          whileHover={{ scale: 1.05 }}
        >
          <span className="text-white">ASAD</span>
          <span className="text-[#ff6b00]">SHAHZAD</span>
        </motion.a>

        <div className="hidden md:flex items-center gap-12">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-medium tracking-widest text-white/60 hover:text-[#ff6b00] transition-colors uppercase"
            >
              {item.label}
            </a>
          ))}
        </div>

        <MagneticButton
            href="#contact"
            className="relative px-6 py-2 bg-white text-black font-bold text-sm tracking-widest uppercase hover:bg-[#ff6b00] hover:text-white transition-all overflow-hidden"
            style={{
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
            }}
          >
            Get In Touch
          </MagneticButton>
      </div>
    </motion.nav>
  );
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="bg-[#050508] text-white selection:bg-[#ff6b00] selection:text-white">
      <LuxuryCursor />
      <Background />
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-[#ff6b00] z-[60] origin-left"
        style={{ scaleX }}
      />

      <Navbar />

      <main className="relative z-10">
        <HeroSection />
        <TapeDivider />
        <ResearchSection />
        <WaveDivider variant={2} />
        <SkillsSection />
        <StitchDivider />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
