"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

export function LuxuryCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const trailRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const trailConfig = { damping: 35, stiffness: 150, mass: 1 };
  const trailXSpring = useSpring(cursorX, trailConfig);
  const trailYSpring = useSpring(cursorY, trailConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    const buttons = document.querySelectorAll("[data-cursor-hover]");
    buttons.forEach((btn) => {
      btn.addEventListener("mouseenter", () => setIsHovering(true));
      btn.addEventListener("mouseleave", () => setIsHovering(false));
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
      buttons.forEach((btn) => {
        btn.removeEventListener("mouseenter", () => setIsHovering(true));
        btn.removeEventListener("mouseleave", () => setIsHovering(false));
      });
    };
  }, [cursorX, cursorY, isVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      const buttons = document.querySelectorAll("[data-cursor-hover]");
      buttons.forEach((btn) => {
        btn.addEventListener("mouseenter", () => setIsHovering(true));
        btn.addEventListener("mouseleave", () => setIsHovering(false));
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (typeof window === "undefined") return null;

  return (
    <>
      <motion.div
        ref={trailRef}
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="rounded-full"
          animate={{
            width: isHovering ? 80 : 40,
            height: isHovering ? 80 : 40,
            opacity: isVisible ? (isHovering ? 0.3 : 0.15) : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          style={{
            background: "radial-gradient(circle, #ff6b00 0%, transparent 70%)",
            filter: "blur(8px)",
          }}
        />
      </motion.div>

      <motion.div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          className="relative"
          animate={{
            scale: isHovering ? 1.5 : 1,
            rotate: isHovering ? 45 : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              width: isHovering ? 24 : 12,
              height: isHovering ? 24 : 12,
              opacity: isVisible ? 1 : 0,
            }}
            transition={{ duration: 0.2 }}
            style={{
              background: isHovering 
                ? "linear-gradient(135deg, #ff6b00, #ff8533)"
                : "#ff6b00",
              boxShadow: isHovering 
                ? "0 0 30px #ff6b00, 0 0 60px #ff6b0060"
                : "0 0 15px #ff6b00",
              marginLeft: isHovering ? -12 : -6,
              marginTop: isHovering ? -12 : -6,
            }}
          />
          
          {isHovering && (
            <>
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-[#ff6b00]"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.5, 0.5],
                    x: [0, (i % 2 === 0 ? 20 : -20) * (i < 2 ? 1 : -1)],
                    y: [0, (i < 2 ? -20 : 20)],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.1,
                  }}
                  style={{
                    boxShadow: "0 0 10px #ff6b00",
                  }}
                />
              ))}
            </>
          )}
        </motion.div>
      </motion.div>

      <motion.div
        className="fixed pointer-events-none z-[9997]"
        style={{
          x: trailXSpring,
          y: trailYSpring,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        {isHovering && (
          <motion.div
            className="absolute"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <svg width="100" height="100" viewBox="0 0 100 100" className="absolute -top-[50px] -left-[50px]">
              <motion.circle
                cx="50"
                cy="50"
                r="35"
                fill="none"
                stroke="#ff6b00"
                strokeWidth="1"
                strokeDasharray="8 4"
                opacity={0.4}
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              />
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#ff6b00"
                strokeWidth="0.5"
                strokeDasharray="4 8"
                opacity={0.2}
                animate={{ rotate: -360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                style={{ transformOrigin: "center" }}
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export function MagneticButton({ 
  children, 
  className, 
  href,
  style,
  ...props 
}: { 
  children: React.ReactNode; 
  className?: string;
  href?: string;
  style?: React.CSSProperties;
}) {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * 0.3;
    const deltaY = (e.clientY - centerY) * 0.3;
    setPosition({ x: deltaX, y: deltaY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      className={className}
      style={style}
      data-cursor-hover="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 15, mass: 0.2 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      <motion.span
        className="relative z-10 flex items-center gap-2"
        animate={{ x: position.x * 0.2, y: position.y * 0.2 }}
        transition={{ type: "spring", stiffness: 350, damping: 15 }}
      >
        {children}
      </motion.span>
      
      <motion.div
        className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity"
        style={{
          background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,107,0,0.3) 0%, transparent 50%)",
        }}
      />
    </motion.a>
  );
}
