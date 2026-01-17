"use client";

import { motion } from "framer-motion";

const researchInterests = [
  { id: 1, label: "Partial Differential Equations", formula: "∂²u/∂x² + ∂²u/∂y² = f(x,y)", icon: "∂", color: "#ff6b00" },
  { id: 2, label: "Fluid Mechanics", formula: "ρ(∂v/∂t + v·∇v) = -∇p + μ∇²v", icon: "∇", color: "#00d4ff" },
  { id: 3, label: "Computational Fluid Dynamics", formula: "∇·u = 0, Re = ρuL/μ", icon: "Re", color: "#ff3366" },
  { id: 4, label: "Machine Learning", formula: "L(θ) = -Σ y log(ŷ)", icon: "θ", color: "#9945ff" },
  { id: 5, label: "Deep Learning", formula: "σ(Wx + b) → ŷ", icon: "σ", color: "#00ff88" },
  { id: 6, label: "Numerical Analysis", formula: "εₙ₊₁ ≤ C·εₙᵖ", icon: "ε", color: "#ffcc00" },
];

const publications = [
  {
    id: 1,
    title: "Numerical study of the hydro-thermal properties of the ferro-copper oxide water hybrid nanofluid",
    authors: "Shahzad, A., Imran, M. and Akhtar, T.",
    journal: "International Journal of Heat and Fluid Flow",
    status: "Under Review",
    year: 2024,
  },
  {
    id: 2,
    title: "Study of motile microorganisms with activation energy under Wu's slip effects",
    authors: "Shahzad, A., Imran, M. and Ali, A.",
    journal: "Boundary Value Problems",
    status: "Under Review",
    year: 2024,
  },
  {
    id: 3,
    title: "Bioconvection flow of tangent hyperbolic nanoliquid with chemically reactive properties",
    authors: "Bilal, M., Shahzad, A., Imran, M., and Akhtar, T.",
    journal: "Journal of Mathematics",
    status: "Under Review",
    year: 2024,
  },
  {
    id: 4,
    title: "Thermal Properties and Applications of Nanofluids",
    authors: "Akhtar, T., Abid M., Shahzad, A., Awad M.",
    journal: "Scrivener Publishing",
    status: "Accepted",
    year: 2024,
  },
];

const rotations = [2, -1.5, 1.8, -2, 1.2, -1.8];

function RopeHook({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute ${side === "left" ? "-left-2" : "-right-2"} top-2 z-20`}>
      <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-lg">
        <defs>
          <linearGradient id={`hookGrad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#c9a66b" />
            <stop offset="50%" stopColor="#8b7355" />
            <stop offset="100%" stopColor="#5a4a3a" />
          </linearGradient>
        </defs>
        <path
          d={side === "left" 
            ? "M8 15 C8 8, 20 8, 20 20 L20 35"
            : "M32 15 C32 8, 20 8, 20 20 L20 35"
          }
          fill="none"
          stroke={`url(#hookGrad-${side})`}
          strokeWidth="5"
          strokeLinecap="round"
        />
        <circle 
          cx="20" 
          cy="35" 
          r="4" 
          fill="#5a4a3a"
        />
      </svg>
    </div>
  );
}

function Clothespin() {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-8 z-30">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="24" height="50" viewBox="0 0 24 50">
          <defs>
            <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4a574" />
              <stop offset="50%" stopColor="#e4b584" />
              <stop offset="100%" stopColor="#c49a6c" />
            </linearGradient>
          </defs>
          <rect x="4" y="0" width="16" height="32" rx="2" fill="url(#woodGrain)" />
          <rect x="2" y="12" width="20" height="3" fill="#777" rx="1" />
          <line x1="6" y1="32" x2="9" y2="48" stroke="#c49a6c" strokeWidth="4" strokeLinecap="round" />
          <line x1="18" y1="32" x2="15" y2="48" stroke="#c49a6c" strokeWidth="4" strokeLinecap="round" />
        </svg>
      </motion.div>
    </div>
  );
}

function CornerLight({ color, position, delay }: { color: string, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', delay: number }) {
  const posClasses = {
    'top-left': '-top-1 -left-1',
    'top-right': '-top-1 -right-1',
    'bottom-left': '-bottom-1 -left-1',
    'bottom-right': '-bottom-1 -right-1'
  };

  return (
    <motion.div
      className={`absolute w-3 h-3 rounded-full z-40 pointer-events-none ${posClasses[position]}`}
      style={{ 
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}80, 0 0 36px ${color}40`
      }}
      animate={{
        scale: [0.8, 1.4, 0.8],
        opacity: [0.4, 1, 0.4],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: "easeInOut",
        delay: delay
      }}
    />
  );
}

function EdgeGlow({ color, side }: { color: string, side: 'top' | 'bottom' | 'left' | 'right' }) {
  const positionStyles = {
    top: 'top-0 left-0 right-0 h-[2px]',
    bottom: 'bottom-0 left-0 right-0 h-[2px]',
    left: 'top-0 bottom-0 left-0 w-[2px]',
    right: 'top-0 bottom-0 right-0 w-[2px]'
  };

  const gradientStyles = {
    top: `linear-gradient(90deg, transparent, ${color}, transparent)`,
    bottom: `linear-gradient(90deg, transparent, ${color}, transparent)`,
    left: `linear-gradient(180deg, transparent, ${color}, transparent)`,
    right: `linear-gradient(180deg, transparent, ${color}, transparent)`
  };

  return (
    <motion.div
      className={`absolute ${positionStyles[side]} z-30 pointer-events-none`}
      style={{ background: gradientStyles[side] }}
      animate={{
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: side === 'top' ? 0 : side === 'right' ? 0.75 : side === 'bottom' ? 1.5 : 2.25
      }}
    />
  );
}

function PolaroidCard({ item, index, row }: { item: typeof researchInterests[0]; index: number; row: number }) {
  const rotation = rotations[row * 3 + index];
  const delay = (row * 3 + index) * 0.12;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -80, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring",
        stiffness: 120,
        damping: 14
      }}
      className="relative pt-10 group"
    >
      <Clothespin />
      
<motion.div
          className="relative bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0d0d0d] p-4 pb-5 cursor-pointer overflow-visible rounded-sm"
        style={{
          boxShadow: `
            0 8px 32px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 1px 0 rgba(255,255,255,0.1) inset
          `,
        }}
        whileHover={{ 
          scale: 1.08, 
          y: -15,
          rotate: 0,
          zIndex: 50,
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <CornerLight color={item.color} position="top-left" delay={0} />
        <CornerLight color={item.color} position="top-right" delay={0.6} />
        <CornerLight color={item.color} position="bottom-left" delay={1.2} />
        <CornerLight color={item.color} position="bottom-right" delay={1.8} />

        <EdgeGlow color={item.color} side="top" />
        <EdgeGlow color={item.color} side="right" />
        <EdgeGlow color={item.color} side="bottom" />
        <EdgeGlow color={item.color} side="left" />

        <motion.div
          className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${item.color}15 0%, transparent 60%)`,
          }}
        />

        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 -translate-x-full group-hover:translate-x-full pointer-events-none z-20 rounded-sm"
          transition={{ duration: 0.8 }}
        />
        
<div 
            className="relative aspect-square mb-5 overflow-hidden rounded-sm"
          style={{
            background: `linear-gradient(135deg, #0a0a0a 0%, #111 50%, #0a0a0a 100%)`,
            border: `1px solid ${item.color}20`,
          }}
        >
          <motion.div 
            className="absolute inset-0 flex items-center justify-center"
          >
            <motion.span 
              className="text-7xl font-serif select-none"
              style={{ 
                color: item.color,
                textShadow: `0 0 30px ${item.color}60, 0 0 60px ${item.color}30`
              }}
              animate={{
                textShadow: [
                  `0 0 20px ${item.color}50, 0 0 40px ${item.color}25`,
                  `0 0 40px ${item.color}80, 0 0 80px ${item.color}40`,
                  `0 0 20px ${item.color}50, 0 0 40px ${item.color}25`,
                ],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              {item.icon}
            </motion.span>
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-black/30" />
          
<div className="absolute bottom-3 left-0 right-0 px-3">
              <motion.p 
                className="font-mono text-xs text-white/70 truncate"
                animate={{ opacity: [0.5, 0.9, 0.5] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                {item.formula}
              </motion.p>
            </div>

          <motion.div
            className="absolute top-2 right-2 w-2 h-2 rounded-full"
            style={{ backgroundColor: item.color }}
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
        
<div className="relative text-center px-2 py-1">
            <h3 className="font-bold text-sm uppercase tracking-wide text-white leading-snug group-hover:text-white transition-colors" style={{ fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif" }}>
              {item.label}
            </h3>
          <div className="mt-2 flex justify-center gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div 
                key={i}
                className="w-1 h-1 rounded-full opacity-30 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: item.color }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Clothesline({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div className="relative mb-24">
      <RopeHook side="left" />
      
      <motion.div 
        className="absolute left-6 right-6 top-8 h-1.5 z-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
        style={{
          background: `linear-gradient(180deg, #9a8575 0%, #6b5a4a 50%, #4a3f35 100%)`,
          borderRadius: "3px",
          boxShadow: "0 3px 10px rgba(0,0,0,0.5)",
        }}
      >
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <RopeHook side="right" />
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 pt-14 px-10 md:px-20">
        {children}
      </div>
    </div>
  );
}

function PublicationCard({ pub, index }: { pub: typeof publications[0]; index: number }) {
  const isAccepted = pub.status === 'Accepted';
  const statusColor = isAccepted ? '#00ff88' : '#ff6b00';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: -15 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.15, type: "spring", stiffness: 100 }}
      className="group relative"
    >
      <motion.div
        className="relative p-6 md:p-8 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, #0f0f12 0%, #1a1a1f 50%, #0f0f12 100%)`,
          clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
          boxShadow: `
            0 20px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.05),
            inset 0 -1px 0 rgba(0,0,0,0.3)
          `,
        }}
        whileHover={{ scale: 1.02, y: -5 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        <div 
          className="absolute top-0 right-0 w-[24px] h-[24px]"
          style={{
            background: `linear-gradient(135deg, ${statusColor}40 0%, ${statusColor}20 100%)`,
          }}
        />
        <div 
          className="absolute bottom-0 left-0 w-[24px] h-[24px]"
          style={{
            background: `linear-gradient(-45deg, ${statusColor}40 0%, ${statusColor}20 100%)`,
          }}
        />

        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(ellipse at 50% 0%, ${statusColor}10 0%, transparent 50%)`,
          }}
        />

        <motion.div
          className="absolute top-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)` }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-[2px]"
          style={{ background: `linear-gradient(90deg, transparent, ${statusColor}, transparent)` }}
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity, delay: 1.5 }}
        />

        <div className="flex flex-col md:flex-row gap-6 relative z-10">
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <motion.div
              className="relative"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <span 
                className="text-6xl md:text-7xl font-black"
                style={{ 
                  color: 'transparent',
                  WebkitTextStroke: `2px ${statusColor}40`,
                  fontFamily: "'JetBrains Mono', monospace"
                }}
              >
                {pub.year}
              </span>
              <span 
                className="absolute inset-0 text-6xl md:text-7xl font-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ 
                  color: statusColor,
                  fontFamily: "'JetBrains Mono', monospace",
                  textShadow: `0 0 30px ${statusColor}60`
                }}
              >
                {pub.year}
              </span>
            </motion.div>
            
            <motion.span 
              className="mt-3 px-4 py-1.5 text-[10px] font-bold tracking-[0.2em] uppercase"
              style={{ 
                background: `${statusColor}15`,
                border: `1px solid ${statusColor}40`,
                color: statusColor,
                clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)',
              }}
              whileHover={{ scale: 1.05 }}
            >
              {pub.status}
            </motion.span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 
              className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight group-hover:text-white transition-colors"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {pub.title}
            </h3>
            
            <div className="flex items-center gap-2 mb-3">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="1.5" className="flex-shrink-0 opacity-60">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <p className="text-white/60 text-sm tracking-wide truncate" style={{ fontFamily: "'Lato', sans-serif" }}>
                {pub.authors}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={statusColor} strokeWidth="1.5" className="flex-shrink-0 opacity-60">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
              </svg>
              <p className="text-sm italic" style={{ color: statusColor, fontFamily: "'Lato', sans-serif" }}>
                {pub.journal}
              </p>
            </div>
          </div>
        </div>

        <div className="absolute top-4 right-8 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: statusColor }}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function ResearchSection() {
  const row1 = researchInterests.slice(0, 3);
  const row2 = researchInterests.slice(3, 6);

  return (
    <section id="research" className="py-32 relative overflow-hidden">
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 30% 20%, rgba(255,107,0,0.03) 0%, transparent 50%),
            radial-gradient(ellipse at 70% 80%, rgba(255,107,0,0.02) 0%, transparent 50%),
            linear-gradient(to bottom, #050508, #080808, #050508)
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center md:text-left"
          >
            <span className="text-[#ff6b00] font-bold tracking-[0.4em] uppercase text-xs block mb-4">
              Research Interests
            </span>
            <h2 className="text-5xl md:text-7xl font-black tracking-tight text-white">
              Research Domain
            </h2>
            <div className="h-1 w-20 bg-[#ff6b00] mt-6 mx-auto md:mx-0" />
          </motion.div>
        </div>

        <div className="mb-40">
          <Clothesline index={0}>
            {row1.map((item, idx) => (
              <PolaroidCard key={item.id} item={item} index={idx} row={0} />
            ))}
          </Clothesline>
          
          <Clothesline index={1}>
            {row2.map((item, idx) => (
              <PolaroidCard key={item.id} item={item} index={idx} row={1} />
            ))}
          </Clothesline>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <span className="text-[#ff6b00] font-bold tracking-[0.4em] uppercase text-xs block mb-4">
              Academic Work
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white">
              Publications
            </h2>
            <div className="h-1 w-20 bg-[#ff6b00] mt-6" />
          </motion.div>

<div className="grid gap-6">
              {publications.map((pub, index) => (
                <PublicationCard key={pub.id} pub={pub} index={index} />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}
