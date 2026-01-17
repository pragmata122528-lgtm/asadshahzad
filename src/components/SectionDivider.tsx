"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useState, useMemo } from "react";

export function TapeDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  const particles = useMemo(() => 
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: Math.random() * 2 + 1,
      angle: Math.random() * Math.PI * 2,
      orbit: Math.random() * 50 + 30,
    })), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = canvas.offsetWidth * 2;
    canvas.height = canvas.offsetHeight * 2;
    ctx.scale(2, 2);

    let animationId: number;
    let time = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      
      const centerX = canvas.offsetWidth / 2;
      const centerY = canvas.offsetHeight / 2;

      ctx.strokeStyle = "rgba(255, 107, 0, 0.1)";
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, 30 + i * 25, 0, Math.PI * 2);
        ctx.stroke();
      }

      particles.forEach((p) => {
        const x = centerX + Math.cos(p.angle + time * p.speed * 0.01) * p.orbit;
        const y = centerY + Math.sin(p.angle + time * p.speed * 0.01) * (p.orbit * 0.4);
        
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, p.size * 2);
        gradient.addColorStop(0, "rgba(255, 107, 0, 0.8)");
        gradient.addColorStop(0.5, "rgba(255, 107, 0, 0.3)");
        gradient.addColorStop(1, "transparent");
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
      });

      const lineGradient = ctx.createLinearGradient(0, centerY, canvas.offsetWidth, centerY);
      lineGradient.addColorStop(0, "transparent");
      lineGradient.addColorStop(0.2, "rgba(255, 107, 0, 0.6)");
      lineGradient.addColorStop(0.5, "rgba(255, 107, 0, 1)");
      lineGradient.addColorStop(0.8, "rgba(255, 107, 0, 0.6)");
      lineGradient.addColorStop(1, "transparent");
      
      ctx.strokeStyle = lineGradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      
      for (let x = 0; x <= canvas.offsetWidth; x += 5) {
        const wave = Math.sin(x * 0.02 + time * 0.05) * 8;
        ctx.lineTo(x, centerY + wave);
      }
      ctx.stroke();

      ctx.shadowColor = "#ff6b00";
      ctx.shadowBlur = 20;
      ctx.stroke();
      ctx.shadowBlur = 0;

      time++;
      animationId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animationId);
  }, [particles]);

  return (
    <motion.div 
      ref={ref} 
      className="relative h-48 md:h-64 w-full overflow-hidden"
      style={{ opacity, scale }}
    >
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full"
      />

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", stiffness: 100 }}
        >
          <motion.div
            className="w-24 h-24 rounded-full border-2 border-[#ff6b00]/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 60px rgba(255, 107, 0, 0.2), inset 0 0 30px rgba(255, 107, 0, 0.1)" }}
          />
          
          <motion.div
            className="absolute inset-2 rounded-full border border-[#ff6b00]/50"
            animate={{ rotate: -360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-4 rounded-full border border-dashed border-[#ff6b00]/40"
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b00] to-[#ff8533]"
              animate={{ 
                scale: [1, 1.2, 1],
                boxShadow: [
                  "0 0 20px #ff6b00, 0 0 40px #ff6b00",
                  "0 0 40px #ff6b00, 0 0 80px #ff6b00",
                  "0 0 20px #ff6b00, 0 0 40px #ff6b00"
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>

          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
            <motion.div
              key={angle}
              className="absolute w-2 h-2"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(-56px)`,
              }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 + i * 0.05 }}
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-[#ff6b00]"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                style={{ boxShadow: "0 0 10px #ff6b00" }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {[-1, 1].map((dir) => (
        <motion.div
          key={dir}
          className="absolute top-1/2 -translate-y-1/2 flex items-center gap-4"
          style={{ [dir === -1 ? "left" : "right"]: "8%" }}
          initial={{ opacity: 0, x: dir * 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex items-center gap-2">
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="w-1 h-6 bg-gradient-to-b from-transparent via-[#ff6b00] to-transparent"
                animate={{ opacity: [0.2, 0.8, 0.2], height: [16, 24, 16] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <motion.div
            className="w-3 h-3 rotate-45 border border-[#ff6b00]"
            animate={{ rotate: [45, 405] }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 15px #ff6b00" }}
          />
        </motion.div>
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] pointer-events-none" />
    </motion.div>
  );
}

export function WaveDivider({ variant = 1 }: { variant?: 1 | 2 | 3 }) {
  const ref = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState(0.5);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMouseX(e.clientX / window.innerWidth);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div 
      ref={ref} 
      className="relative h-52 md:h-72 w-full overflow-hidden"
      style={{ y }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 200">
        <defs>
          <linearGradient id="waveGradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset={`${mouseX * 40 + 10}%`} stopColor="#ff6b00" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#ff6b00" stopOpacity="1" />
            <stop offset={`${100 - mouseX * 40 - 10}%`} stopColor="#ff6b00" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <linearGradient id="waveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#ff6b00" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#ff8533" stopOpacity="0.25" />
            <stop offset="70%" stopColor="#ff6b00" stopOpacity="0.15" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow2">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <motion.path
          d="M0,100 Q360,60 720,100 T1440,100"
          fill="none"
          stroke="url(#waveGradient2)"
          strokeWidth="80"
          opacity={0.5}
        />

        <motion.path
          d="M0,100 C240,140 360,60 540,100 C720,140 840,60 1020,100 C1200,140 1320,60 1440,100"
          fill="none"
          stroke="url(#waveGradient1)"
          strokeWidth="3"
          filter="url(#glow2)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        <motion.path
          d="M0,90 C240,130 360,50 540,90 C720,130 840,50 1020,90 C1200,130 1320,50 1440,90"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.3 }}
        />

        <motion.path
          d="M0,110 C240,150 360,70 540,110 C720,150 840,70 1020,110 C1200,150 1320,70 1440,110"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          strokeDasharray="4 8"
          opacity={0.4}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2.5, ease: "easeOut", delay: 0.5 }}
        />

        {[180, 450, 720, 990, 1260].map((x, i) => (
          <motion.g key={i}>
            <motion.circle
              cx={x}
              cy={100 + Math.sin((x / 180) * Math.PI) * 20}
              r="12"
              fill="none"
              stroke="#ff6b00"
              strokeWidth="1"
              opacity={0.5}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1 + i * 0.1, type: "spring" }}
            />
            <motion.circle
              cx={x}
              cy={100 + Math.sin((x / 180) * Math.PI) * 20}
              r="4"
              fill="#ff6b00"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + i * 0.1, type: "spring" }}
              style={{ filter: "drop-shadow(0 0 8px #ff6b00)" }}
            />
            <motion.circle
              cx={x}
              cy={100 + Math.sin((x / 180) * Math.PI) * 20}
              r="20"
              fill="none"
              stroke="#ff6b00"
              strokeWidth="0.5"
              opacity={0.3}
              animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          </motion.g>
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8, type: "spring", stiffness: 150 }}
      >
        <div className="relative w-28 h-28">
          <motion.div
            className="absolute inset-0 rounded-full"
            style={{
              background: "conic-gradient(from 0deg, transparent, #ff6b00 20%, transparent 40%)",
              filter: "blur(8px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          />
          
          <motion.div
            className="absolute inset-4 rounded-full border border-[#ff6b00]/40"
            animate={{ rotate: -360 }}
            transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div 
              className="relative w-12 h-12"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <div 
                className="absolute inset-0 bg-[#ff6b00]"
                style={{ 
                  clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
                  boxShadow: "0 0 30px #ff6b00, 0 0 60px #ff6b00"
                }}
              />
            </motion.div>
          </div>

          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 rounded-full bg-[#ff6b00]"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-50px)`,
              }}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            />
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] pointer-events-none" />
    </motion.div>
  );
}

export function StitchDivider() {
  const ref = useRef<HTMLDivElement>(null);
  const [time, setTime] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 50);
    return () => clearInterval(interval);
  }, []);

  const nodes = useMemo(() => [
    { x: 10, delay: 0 },
    { x: 25, delay: 0.2 },
    { x: 40, delay: 0.4 },
    { x: 55, delay: 0.6 },
    { x: 70, delay: 0.8 },
    { x: 85, delay: 1 },
  ], []);

  return (
    <motion.div 
      ref={ref} 
      className="relative h-44 md:h-60 w-full overflow-hidden perspective-[1000px]"
      style={{ rotateX }}
    >
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 200">
        <defs>
          <linearGradient id="gridGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#ff6b00" stopOpacity="0.1" />
            <stop offset="80%" stopColor="#ff6b00" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="neon">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {[80, 100, 120].map((y, i) => (
          <motion.line
            key={y}
            x1="0"
            y1={y}
            x2="1440"
            y2={y}
            stroke="url(#gridGrad)"
            strokeWidth="1"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: i * 0.2 }}
          />
        ))}

        <motion.path
          d="M0,100 L1440,100"
          stroke="#ff6b00"
          strokeWidth="2"
          filter="url(#neon)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2 }}
        />

        <motion.circle
          cx={((time * 3) % 1440)}
          cy={100}
          r="6"
          fill="#ff6b00"
          style={{ filter: "drop-shadow(0 0 15px #ff6b00) drop-shadow(0 0 30px #ff6b00)" }}
        />
        <motion.circle
          cx={((time * 3) % 1440)}
          cy={100}
          r="15"
          fill="none"
          stroke="#ff6b00"
          strokeWidth="1"
          opacity={0.5}
        />

        {nodes.map((node, i) => (
          <motion.g key={i}>
            <motion.rect
              x={node.x * 14.4 - 15}
              y={85}
              width="30"
              height="30"
              rx="4"
              fill="none"
              stroke="#ff6b00"
              strokeWidth="1"
              opacity={0.6}
              initial={{ scale: 0, rotate: 0 }}
              whileInView={{ scale: 1, rotate: 45 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.5, type: "spring" }}
              style={{ transformOrigin: "center", transformBox: "fill-box" }}
            />
            <motion.circle
              cx={node.x * 14.4}
              cy={100}
              r="6"
              fill="#050508"
              stroke="#ff6b00"
              strokeWidth="2"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.7, type: "spring" }}
            />
            <motion.circle
              cx={node.x * 14.4}
              cy={100}
              r="3"
              fill="#ff6b00"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: node.delay + 0.8, type: "spring" }}
              style={{ filter: "drop-shadow(0 0 8px #ff6b00)" }}
            />
            
            {i < nodes.length - 1 && (
              <motion.line
                x1={node.x * 14.4 + 6}
                y1={100}
                x2={(nodes[i + 1].x * 14.4) - 6}
                y2={100}
                stroke="#ff6b00"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity={0.4}
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ delay: node.delay + 1, duration: 0.5 }}
              />
            )}
          </motion.g>
        ))}
      </svg>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, type: "spring" }}
      >
        <div className="relative w-20 h-20">
          <motion.div
            className="absolute inset-0 border-2 border-[#ff6b00] rounded-lg"
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            style={{ boxShadow: "0 0 30px rgba(255, 107, 0, 0.4), inset 0 0 20px rgba(255, 107, 0, 0.2)" }}
          />
          <motion.div
            className="absolute inset-3 border border-[#ff6b00]/50 rounded"
            animate={{ rotate: -360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-[#ff6b00] text-2xl font-black"
              style={{ 
                fontFamily: "monospace",
                textShadow: "0 0 20px #ff6b00, 0 0 40px #ff6b00"
              }}
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {"</>"}
            </motion.div>
          </div>
        </div>
      </motion.div>

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-[#ff6b00]"
          style={{
            left: `${5 + i * 4.5}%`,
            top: `${45 + Math.sin(i * 0.5 + time * 0.1) * 10}%`,
          }}
          animate={{ opacity: [0.1, 0.6, 0.1] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
        />
      ))}

      <div className="absolute inset-0 bg-gradient-to-b from-[#050508] via-transparent to-[#050508] pointer-events-none" />
    </motion.div>
  );
}
