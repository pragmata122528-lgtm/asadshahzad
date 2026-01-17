"use client";

import { useRef, useEffect, ReactNode } from "react";
import { gsap } from "gsap";

interface FloatingButtonProps {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "gold" | "blue";
  onClick?: () => void;
  href?: string;
}

export function FloatingButton({
  children,
  className = "",
  color = "cyan",
  onClick,
  href,
}: FloatingButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  const colors = {
    cyan: {
      border: "rgba(0, 212, 255, 0.4)",
      glow: "rgba(0, 212, 255, 0.6)",
      bg: "rgba(0, 212, 255, 0.08)",
      bgHover: "rgba(0, 212, 255, 0.15)",
      text: "#00d4ff",
    },
    gold: {
      border: "rgba(212, 165, 116, 0.4)",
      glow: "rgba(212, 165, 116, 0.6)",
      bg: "rgba(212, 165, 116, 0.08)",
      bgHover: "rgba(212, 165, 116, 0.15)",
      text: "#d4a574",
    },
    blue: {
      border: "rgba(59, 130, 246, 0.4)",
      glow: "rgba(59, 130, 246, 0.6)",
      bg: "rgba(59, 130, 246, 0.08)",
      bgHover: "rgba(59, 130, 246, 0.15)",
      text: "#3b82f6",
    },
  };

  const c = colors[color];

  useEffect(() => {
    const button = buttonRef.current;
    const glow = glowRef.current;
    const light = lightRef.current;
    if (!button) return;

    // Floating Z-space animation
    gsap.to(button, {
      z: 10,
      duration: 2,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    // Light edge hover effect
    const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      if (light) {
        light.style.background = `radial-gradient(circle 80px at ${percentX}% ${percentY}%, ${c.glow}, transparent)`;
        light.style.opacity = "1";
      }

      if (glow) {
        gsap.to(glow, {
          opacity: 0.8,
          scale: 1.1,
          duration: 0.3,
        });
      }
    };

    const handleMouseLeave = () => {
      if (light) {
        light.style.opacity = "0";
      }
      if (glow) {
        gsap.to(glow, {
          opacity: 0,
          scale: 1,
          duration: 0.5,
        });
      }
    };

    const handleMouseEnter = () => {
      gsap.to(button, {
        scale: 1.05,
        z: 30,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeaveScale = () => {
      gsap.to(button, {
        scale: 1,
        z: 10,
        duration: 0.5,
        ease: "elastic.out(1, 0.5)",
      });
    };

    button.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeaveScale);

    return () => {
      button.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeaveScale);
    };
  }, [c.glow]);

  const buttonStyles = {
    background: c.bg,
    border: `1px solid ${c.border}`,
    clipPath: "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
    color: c.text,
    transformStyle: "preserve-3d" as const,
  };

  const content = (
    <>
      <div
        ref={glowRef}
        className="absolute inset-0 opacity-0 pointer-events-none"
        style={{
          clipPath: buttonStyles.clipPath,
          background: `linear-gradient(135deg, ${c.glow}, transparent)`,
          filter: "blur(15px)",
          transform: "translateZ(-10px)",
        }}
      />
      <div
        ref={lightRef}
        className="absolute inset-0 opacity-0 pointer-events-none transition-opacity duration-200"
        style={{
          clipPath: buttonStyles.clipPath,
        }}
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </>
  );

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        className={`relative inline-flex items-center justify-center px-8 py-4 font-body tracking-wider transition-all duration-300 transform-gpu ${className}`}
        style={buttonStyles}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center px-8 py-4 font-body tracking-wider transition-all duration-300 transform-gpu ${className}`}
      style={buttonStyles}
    >
      {content}
    </button>
  );
}

interface GlowingBorderProps {
  children: ReactNode;
  className?: string;
  color?: "cyan" | "gold" | "blue";
}

export function GlowingBorder({
  children,
  className = "",
  color = "cyan",
}: GlowingBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const borderRef = useRef<HTMLDivElement>(null);

  const colors = {
    cyan: "#00d4ff",
    gold: "#d4a574",
    blue: "#3b82f6",
  };

  useEffect(() => {
    const border = borderRef.current;
    if (!border) return;

    // Animated border gradient
    gsap.to(border, {
      backgroundPosition: "200% 0",
      duration: 3,
      ease: "none",
      repeat: -1,
    });
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl"
        style={{
          padding: "1px",
          background: `linear-gradient(90deg, transparent, ${colors[color]}, transparent)`,
          backgroundSize: "200% 100%",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />
      {children}
    </div>
  );
}

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}

export function FloatingElement({
  children,
  className = "",
  amplitude = 15,
  duration = 4,
  delay = 0,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: -amplitude,
      duration: duration / 2,
      delay,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });

    gsap.to(element, {
      rotateZ: 2,
      duration: duration * 0.75,
      delay: delay + 0.5,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, [amplitude, duration, delay]);

  return (
    <div ref={elementRef} className={`transform-gpu ${className}`}>
      {children}
    </div>
  );
}

interface PulsingGlowProps {
  className?: string;
  color?: "cyan" | "gold" | "blue";
  size?: number;
}

export function PulsingGlow({
  className = "",
  color = "cyan",
  size = 400,
}: PulsingGlowProps) {
  const glowRef = useRef<HTMLDivElement>(null);

  const colors = {
    cyan: "rgba(0, 212, 255, 0.15)",
    gold: "rgba(212, 165, 116, 0.15)",
    blue: "rgba(59, 130, 246, 0.15)",
  };

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    gsap.to(glow, {
      scale: 1.2,
      opacity: 0.3,
      duration: 3,
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
    });
  }, []);

  return (
    <div
      ref={glowRef}
      className={`absolute rounded-full pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${colors[color]} 0%, transparent 70%)`,
        filter: "blur(60px)",
      }}
    />
  );
}
