"use client";

import { motion } from "framer-motion";

const skills = [
  { name: "Python", category: "Programming", level: 90, icon: "🐍", color: "#3776ab" },
  { name: "Machine Learning", category: "AI/ML", level: 85, icon: "🧠", color: "#ff6b00" },
  { name: "Deep Learning", category: "AI/ML", level: 80, icon: "⚡", color: "#9945ff" },
  { name: "MATLAB/Simulink", category: "Scientific", level: 95, icon: "📊", color: "#0076a8" },
  { name: "LaTeX", category: "Research", level: 90, icon: "📝", color: "#008080" },
  { name: "Numerical Analysis", category: "Mathematics", level: 95, icon: "∑", color: "#ff3366" },
];

const timeline = [
  {
    id: 1,
    type: "experience",
    title: "Mathematics Lecturer",
    subtitle: "KIPS College Narowal Campus",
    period: "Dec 2023 - Present",
    current: true,
    color: "#ff6b00",
  },
  {
    id: 2,
    type: "education",
    title: "M.Phil Mathematics",
    subtitle: "GCU Faisalabad",
    period: "2020 - 2022",
    grade: "3.51/4.0 CGPA",
    color: "#9945ff",
  },
  {
    id: 3,
    type: "experience",
    title: "Mathematics Lecturer",
    subtitle: "Riphah International College Narowal",
    period: "Jan 2023 - Dec 2023",
    color: "#00d4ff",
  },
  {
    id: 4,
    type: "education",
    title: "M.Sc Mathematics",
    subtitle: "Minhaj University Lahore",
    period: "2018 - 2020",
    grade: "3.81/4.0 CGPA",
    color: "#00ff88",
  },
];

const rotations = [-2, 1.5, -1, 2, -1.5, 1.8];

function RopeHook({ side }: { side: "left" | "right" }) {
  return (
    <div className={`absolute ${side === "left" ? "-left-3" : "-right-3"} top-2 z-20`}>
      <svg width="50" height="60" viewBox="0 0 50 60" className="drop-shadow-lg">
        <defs>
          <linearGradient id={`metalHook-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b8b8b" />
            <stop offset="30%" stopColor="#c0c0c0" />
            <stop offset="50%" stopColor="#e8e8e8" />
            <stop offset="70%" stopColor="#a0a0a0" />
            <stop offset="100%" stopColor="#606060" />
          </linearGradient>
          <filter id={`hookShadow-${side}`}>
            <feDropShadow dx="1" dy="2" stdDeviation="2" floodOpacity="0.4"/>
          </filter>
        </defs>
        <ellipse cx={side === "left" ? "12" : "38"} cy="10" rx="8" ry="6" fill={`url(#metalHook-${side})`} filter={`url(#hookShadow-${side})`} />
        <path
          d={side === "left" 
            ? "M12 16 Q12 30, 25 35 L25 50"
            : "M38 16 Q38 30, 25 35 L25 50"
          }
          fill="none"
          stroke={`url(#metalHook-${side})`}
          strokeWidth="4"
          strokeLinecap="round"
          filter={`url(#hookShadow-${side})`}
        />
        <circle cx="25" cy="50" r="5" fill="#505050" stroke="#707070" strokeWidth="1" />
      </svg>
    </div>
  );
}

function Clothespin({ color }: { color: string }) {
  return (
    <div className="absolute left-1/2 -translate-x-1/2 -top-6 z-30">
      <motion.div 
        className="relative"
        whileHover={{ scale: 1.15, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        <svg width="28" height="55" viewBox="0 0 28 55">
          <defs>
            <linearGradient id="woodGrain" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#c9956c" />
              <stop offset="25%" stopColor="#dba97e" />
              <stop offset="50%" stopColor="#e8bd92" />
              <stop offset="75%" stopColor="#dba97e" />
              <stop offset="100%" stopColor="#c9956c" />
            </linearGradient>
            <linearGradient id="springMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#a0a0a0" />
              <stop offset="50%" stopColor="#606060" />
              <stop offset="100%" stopColor="#404040" />
            </linearGradient>
            <filter id="woodShadow">
              <feDropShadow dx="1" dy="1" stdDeviation="1" floodOpacity="0.3"/>
            </filter>
          </defs>
          <rect x="5" y="0" width="18" height="28" rx="2" fill="url(#woodGrain)" filter="url(#woodShadow)" />
          <line x1="8" y1="3" x2="8" y2="25" stroke="#b8845c" strokeWidth="0.5" opacity="0.5" />
          <line x1="14" y1="3" x2="14" y2="25" stroke="#b8845c" strokeWidth="0.5" opacity="0.5" />
          <line x1="20" y1="3" x2="20" y2="25" stroke="#b8845c" strokeWidth="0.5" opacity="0.5" />
          <ellipse cx="14" cy="14" rx="8" ry="2" fill="url(#springMetal)" />
          <circle cx="14" cy="14" r="2" fill="#505050" />
          <path d="M7 28 L10 52" stroke="url(#woodGrain)" strokeWidth="5" strokeLinecap="round" filter="url(#woodShadow)" />
          <path d="M21 28 L18 52" stroke="url(#woodGrain)" strokeWidth="5" strokeLinecap="round" filter="url(#woodShadow)" />
          <circle cx="14" cy="52" r="3" fill={color} opacity="0.8" />
        </svg>
      </motion.div>
    </div>
  );
}

function CornerGlow({ color, position, delay }: { color: string, position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right', delay: number }) {
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
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}80`
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
      animate={{ opacity: [0.2, 0.8, 0.2] }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
        delay: side === 'top' ? 0 : side === 'right' ? 0.75 : side === 'bottom' ? 1.5 : 2.25
      }}
    />
  );
}

function TypeIcon({ type, color }: { type: string; color: string }) {
  if (type === "experience") {
    return (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
        <line x1="6" y1="11" x2="6" y2="11.01"/>
        <line x1="18" y1="11" x2="18" y2="11.01"/>
      </svg>
    );
  }
  return (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
      <path d="M6 12v5c3 3 9 3 12 0v-5"/>
      <line x1="12" y1="22" x2="12" y2="17"/>
    </svg>
  );
}

function BandedSkillBar({ level, color, delay }: { level: number; color: string; delay: number }) {
  const totalBands = 10;
  const filledBands = Math.round(level / 10);
  
  return (
    <div className="flex gap-1 w-full justify-center">
      {[...Array(totalBands)].map((_, i) => (
        <motion.div
          key={i}
          className="h-3 flex-1 max-w-[12px] rounded-sm"
          initial={{ opacity: 0, scaleY: 0 }}
          whileInView={{ 
            opacity: 1, 
            scaleY: 1,
          }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.3, 
            delay: delay + i * 0.05,
            ease: "easeOut"
          }}
          style={{
            backgroundColor: i < filledBands ? color : 'rgba(255,255,255,0.1)',
            boxShadow: i < filledBands ? `0 0 8px ${color}60` : 'none',
          }}
        />
      ))}
    </div>
  );
}

function SkillHangingCard({ item, index }: { item: typeof skills[0]; index: number }) {
  const rotation = rotations[index % rotations.length];
  const delay = index * 0.15;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -60, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative pt-8 group"
    >
      <Clothespin color={item.color} />
      
      <motion.div
        className="relative bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0d0d0d] rounded-sm overflow-visible cursor-pointer p-5"
        style={{
          boxShadow: `
            0 10px 40px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 1px 0 rgba(255,255,255,0.1) inset
          `,
        }}
        whileHover={{ 
          scale: 1.06, 
          y: -10,
          rotate: 0,
          zIndex: 50,
        }}
        animate={{
          rotate: [rotation - 0.5, rotation + 0.5, rotation - 0.5],
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 400, damping: 25 }
        }}
      >
        <CornerGlow color={item.color} position="top-left" delay={0} />
        <CornerGlow color={item.color} position="top-right" delay={0.6} />
        <CornerGlow color={item.color} position="bottom-left" delay={1.2} />
        <CornerGlow color={item.color} position="bottom-right" delay={1.8} />

        <EdgeGlow color={item.color} side="top" />
        <EdgeGlow color={item.color} side="right" />
        <EdgeGlow color={item.color} side="bottom" />
        <EdgeGlow color={item.color} side="left" />

        <motion.div
          className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${item.color}20 0%, transparent 60%)`,
          }}
        />

        <div className="flex flex-col items-center text-center">
          <motion.span 
            className="text-4xl mb-3 block"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {item.icon}
          </motion.span>
<h3 
              className="text-lg mb-3 leading-tight text-white"
              style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
            >
              {item.name}
            </h3>
            <BandedSkillBar level={item.level} color={item.color} delay={delay + 0.3} />
            <span 
              className="text-sm mt-2 block"
              style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
            >
              {item.level}%
            </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

function TimelineHangingCard({ item, index }: { item: typeof timeline[0]; index: number }) {
  const rotation = rotations[index % rotations.length];
  const delay = index * 0.15;
  
  return (
    <motion.div
      initial={{ opacity: 0, y: -60, rotate: rotation * 2 }}
      whileInView={{ opacity: 1, y: 0, rotate: rotation }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.7, 
        delay, 
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      className="relative pt-8 group"
    >
      <Clothespin color={item.color} />
      
      <motion.div
        className="relative bg-gradient-to-br from-[#1a1a1a] via-[#141414] to-[#0d0d0d] rounded-sm overflow-visible cursor-pointer p-6"
        style={{
          boxShadow: `
            0 10px 40px rgba(0,0,0,0.6),
            0 0 0 1px rgba(255,255,255,0.05) inset,
            0 1px 0 rgba(255,255,255,0.1) inset
          `,
        }}
        whileHover={{ 
          scale: 1.06, 
          y: -10,
          rotate: 0,
          zIndex: 50,
        }}
        animate={{
          rotate: [rotation - 0.5, rotation + 0.5, rotation - 0.5],
        }}
        transition={{ 
          rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
          scale: { type: "spring", stiffness: 400, damping: 25 }
        }}
      >
        <CornerGlow color={item.color} position="top-left" delay={0} />
        <CornerGlow color={item.color} position="top-right" delay={0.6} />
        <CornerGlow color={item.color} position="bottom-left" delay={1.2} />
        <CornerGlow color={item.color} position="bottom-right" delay={1.8} />

        <EdgeGlow color={item.color} side="top" />
        <EdgeGlow color={item.color} side="right" />
        <EdgeGlow color={item.color} side="bottom" />
        <EdgeGlow color={item.color} side="left" />

        <motion.div
          className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${item.color}20 0%, transparent 60%)`,
          }}
        />

        <div className="text-center">
          <motion.div 
            className="mb-4 flex justify-center"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <TypeIcon type={item.type} color={item.color} />
          </motion.div>
          
          <span 
            className="text-[10px] uppercase tracking-[0.2em] px-3 py-1 rounded-full mb-3 inline-block"
            style={{ 
              backgroundColor: `${item.color}20`, 
              color: item.color,
              fontFamily: "'JetBrains Mono', monospace",
              fontWeight: 600
            }}
          >
            {item.type}
          </span>
          
          <span 
            className="text-sm block mb-3" 
            style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace" }}
          >
            {item.period}
          </span>
          
          <h3 
            className="text-lg text-white mb-2 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 700 }}
          >
            {item.title}
          </h3>
          
          <p 
            className="text-white/60 text-sm mb-2"
            style={{ fontFamily: "'Lato', 'Helvetica Neue', sans-serif" }}
          >
            {item.subtitle}
          </p>
          
          {'grade' in item && item.grade && (
            <span 
              className="inline-block px-3 py-1.5 text-xs bg-white/5 rounded mt-2" 
              style={{ color: item.color, fontFamily: "'JetBrains Mono', monospace", fontWeight: 500 }}
            >
              {item.grade}
            </span>
          )}
          
          {'current' in item && item.current && (
            <span 
              className="inline-block mt-3 px-3 py-1.5 text-xs uppercase tracking-wider border rounded"
              style={{ 
                borderColor: item.color, 
                color: item.color,
                fontFamily: "'JetBrains Mono', monospace",
                fontWeight: 700
              }}
            >
              Current
            </span>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

function Clothesline({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <div className="relative mb-16">
      <RopeHook side="left" />
      
      <motion.div 
        className="absolute left-8 right-8 top-6 h-3 z-10"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: index * 0.2 }}
      >
        <svg width="100%" height="100%" preserveAspectRatio="none" className="overflow-visible">
          <defs>
            <linearGradient id={`ropeGrad-${index}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#c9a574" />
              <stop offset="30%" stopColor="#a88b5a" />
              <stop offset="70%" stopColor="#8b7248" />
              <stop offset="100%" stopColor="#6b5538" />
            </linearGradient>
            <pattern id={`fiberPattern-${index}`} width="8" height="12" patternUnits="userSpaceOnUse">
              <path d="M0,6 Q4,0 8,6 Q4,12 0,6" fill="none" stroke="#9a845a" strokeWidth="0.5" opacity="0.6" />
              <path d="M0,2 L8,10" fill="none" stroke="#7a6448" strokeWidth="0.3" opacity="0.4" />
              <path d="M0,10 L8,2" fill="none" stroke="#7a6448" strokeWidth="0.3" opacity="0.4" />
            </pattern>
            <filter id={`ropeShadow-${index}`}>
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.4"/>
            </filter>
          </defs>
          <rect x="0" y="0" width="100%" height="12" rx="6" fill={`url(#ropeGrad-${index})`} filter={`url(#ropeShadow-${index})`} />
          <rect x="0" y="0" width="100%" height="12" rx="6" fill={`url(#fiberPattern-${index})`} />
          <ellipse cx="0" cy="6" rx="4" ry="6" fill="#5a4a38" />
          <ellipse cx="100%" cy="6" rx="4" ry="6" fill="#5a4a38" />
        </svg>
        
        <motion.div
          className="absolute inset-0 opacity-40 rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
          }}
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        />
      </motion.div>
      
      <RopeHook side="right" />
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-12 px-6 md:px-16">
        {children}
      </div>
    </div>
  );
}

export default function SkillsSection() {
  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800&family=Lato:wght@300;400;700&family=JetBrains+Mono:wght@400;500;600;700&display=swap');
      `}</style>
      
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 20% 30%, rgba(255,107,0,0.04) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(153,69,255,0.03) 0%, transparent 50%),
            linear-gradient(to bottom, #050508, #0a0a0d, #050508)
          `,
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span 
            className="text-[#ff6b00] tracking-[0.4em] uppercase text-xs block mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
          >
            Technical Expertise
          </span>
          <h2 
            className="text-5xl md:text-7xl tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
          >
            Skills & Abilities
          </h2>
          <div className="h-1 w-20 bg-[#ff6b00] mt-6 mx-auto" />
        </motion.div>

        <div className="mb-32">
          <Clothesline index={0}>
            {skills.slice(0, 3).map((skill, idx) => (
              <SkillHangingCard key={skill.name} item={skill} index={idx} />
            ))}
          </Clothesline>
          
          <Clothesline index={1}>
            {skills.slice(3, 6).map((skill, idx) => (
              <SkillHangingCard key={skill.name} item={skill} index={idx + 3} />
            ))}
          </Clothesline>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span 
            className="text-[#ff6b00] tracking-[0.4em] uppercase text-xs block mb-4"
            style={{ fontFamily: "'JetBrains Mono', monospace", fontWeight: 600 }}
          >
            Professional Journey
          </span>
          <h2 
            className="text-5xl md:text-7xl tracking-tight text-white"
            style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 800 }}
          >
            Experience & Education
          </h2>
          <div className="h-1 w-20 bg-[#ff6b00] mt-6 mx-auto" />
        </motion.div>

        <div>
          <Clothesline index={2}>
            {timeline.slice(0, 2).map((item, idx) => (
              <TimelineHangingCard key={item.id} item={item} index={idx} />
            ))}
            <div className="hidden md:block" />
          </Clothesline>
          
          <Clothesline index={3}>
            {timeline.slice(2, 4).map((item, idx) => (
              <TimelineHangingCard key={item.id} item={item} index={idx + 2} />
            ))}
            <div className="hidden md:block" />
          </Clothesline>
        </div>
      </div>
    </section>
  );
}
