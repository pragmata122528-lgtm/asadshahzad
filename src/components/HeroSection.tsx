"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";

const equations = [
  "∂u/∂t + u·∇u = -∇p + ν∇²u",
  "∇·u = 0",
  "∂T/∂t + u·∇T = α∇²T",
  "Re = ρuL/μ",
  "Nu = hL/k",
  "∇²ψ = -ω",
  "E = mc²",
  "Pr = ν/α",
  "∂ρ/∂t + ∇·(ρu) = 0",
];

const rotatingWords = [
  "CFD",
  "Machine Learning",
  "Fluid Dynamics",
  "Heat Transfer",
  "Numerical Methods",
  "AI Simulations",
];

function TypewriterText({ text, className, delay = 0 }: { text: string; className?: string; delay?: number }) {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let cursorInterval: NodeJS.Timeout;

    const startTyping = () => {
      let currentIndex = 0;
      
      const typeChar = () => {
        if (currentIndex <= text.length) {
          setDisplayedText(text.slice(0, currentIndex));
          currentIndex++;
          timeout = setTimeout(typeChar, 100 + Math.random() * 80);
        } else {
          setIsComplete(true);
        }
      };
      
      typeChar();
    };

    const initialDelay = setTimeout(startTyping, delay);

    cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);

    return () => {
      clearTimeout(timeout);
      clearTimeout(initialDelay);
      clearInterval(cursorInterval);
    };
  }, [text, delay]);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-[4px] md:w-[6px] h-[0.9em] ml-1 align-middle"
        style={{ 
          backgroundColor: "currentColor",
          opacity: showCursor ? 1 : 0,
          display: isComplete ? "none" : "inline-block"
        }}
      />
    </span>
  );
}

function RotatingWord({ words, className }: { words: string[]; className?: string }) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const currentWord = words[currentWordIndex];
  const typeTime = 100;

  const tick = useCallback(() => {
    if (displayedText.length < currentWord.length) {
      setDisplayedText(currentWord.slice(0, displayedText.length + 1));
    } else {
      setTimeout(() => {
        setDisplayedText("");
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }, 300);
    }
  }, [displayedText, currentWord, words.length]);

  useEffect(() => {
    const speed = typeTime / currentWord.length;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, currentWord.length]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <span className={className}>
      {displayedText}
      <motion.span
        className="inline-block w-[3px] md:w-[4px] h-[1.1em] ml-1 align-middle bg-[#ff6b00]"
        style={{ opacity: showCursor ? 1 : 0 }}
      />
    </span>
  );
}

export default function HeroSection() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {mounted && equations.map((eq, i) => (
          <motion.div
            key={i}
            className="absolute font-mono text-[#ff6b00]/20 text-sm md:text-base whitespace-nowrap"
            initial={{ 
              x: Math.random() * 100 + "%", 
              y: Math.random() * 100 + "%",
              opacity: 0 
            }}
            animate={{ 
              y: [null, "-100%"],
              opacity: [0, 1, 1, 0]
            }}
            transition={{ 
              duration: 20 + Math.random() * 20, 
              repeat: Infinity, 
              ease: "linear",
              delay: Math.random() * 10
            }}
          >
            {eq}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 mb-8"
          >
            <div className="w-12 h-[1px] bg-[#ff6b00]" />
            <span className="text-[#ff6b00] font-bold tracking-[0.4em] uppercase text-sm">
              Mathematics Researcher
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-7xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-12"
          >
            <span className="block text-white">
              <TypewriterText text="ASAD" delay={800} />
            </span>
            <span className="block text-[#ff6b00]">
              <TypewriterText text="SHAHZAD" delay={1400} />
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-white/70 max-w-3xl leading-relaxed mb-16 font-light"
          >
            Specializing in{" "}
            <span className="text-[#ff6b00] font-semibold inline-block min-w-[200px]">
              <RotatingWord words={rotatingWords} />
            </span>
            {" "}& Scientific Computing
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-8 items-center"
          >
<a 
                href="#research"
                className="group relative px-10 py-5 bg-[#ff6b00] text-white font-bold text-lg tracking-widest uppercase overflow-hidden transition-all hover:pr-14"
                style={{
                  clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
                }}
              >
                <span className="relative z-10">Explore Research</span>
                <motion.span 
                  className="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
                  initial={{ x: -10 }}
                  whileHover={{ x: 0 }}
                >
                  →
                </motion.span>
              </a>

            <a 
              href="#contact"
              className="text-white font-bold text-lg tracking-widest uppercase border-b-2 border-white/20 hover:border-[#ff6b00] transition-all pb-1"
            >
              Get In Touch
            </a>
          </motion.div>
        </div>
      </div>

      <motion.div 
        className="absolute bottom-12 right-12 hidden lg:flex flex-col items-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/20 to-white/20" />
        <span className="[writing-mode:vertical-lr] text-white/30 text-xs tracking-[0.5em] uppercase font-bold">
          Scroll Down
        </span>
      </motion.div>
    </section>
  );
}
