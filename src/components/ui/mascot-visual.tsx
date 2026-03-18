"use client";

import Image from "next/image";
import { useRef, useState, useCallback } from "react";

const MESSAGES = [
  "¡Hola! Soy AuraLiq 👋",
  "¿Listo para automatizar?",
  "Respondo 24/7 por ti 🚀",
  "¡Agenda tu demo gratis!",
  "IA que vende mientras duermes 💜",
];

export function MascotVisual({ className = "" }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [bouncing, setBouncing] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [showMsg, setShowMsg] = useState(false);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = containerRef.current;
    if (!el) return;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 18;
    const y = ((e.clientY - top) / height - 0.5) * -18;
    setTilt({ x, y });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
    setShowMsg(false);
  }, []);

  const handleMouseEnter = useCallback(() => {
    setHovered(true);
    setShowMsg(true);
  }, []);

  const handleClick = useCallback(() => {
    setBouncing(true);
    setMsgIdx((i) => (i + 1) % MESSAGES.length);
    setShowMsg(true);
    setTimeout(() => setBouncing(false), 600);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      <style>{`
        @keyframes mascotFloat {
          0%,100% { transform: translateY(0px) rotate(-1deg); }
          33%      { transform: translateY(-14px) rotate(1deg); }
          66%      { transform: translateY(-6px) rotate(-0.5deg); }
        }
        @keyframes mascotBounce {
          0%   { transform: scale(1) translateY(0); }
          20%  { transform: scale(1.12, 0.88) translateY(0); }
          45%  { transform: scale(0.92, 1.1) translateY(-28px); }
          70%  { transform: scale(1.05, 0.95) translateY(0); }
          85%  { transform: scale(0.97, 1.03) translateY(-8px); }
          100% { transform: scale(1) translateY(0); }
        }
        @keyframes auraPulse {
          0%,100% { transform: scale(1);   opacity: .2; }
          50%     { transform: scale(1.15); opacity: .45; }
        }
        @keyframes auraHover {
          0%,100% { transform: scale(1.1);  opacity: .5; }
          50%     { transform: scale(1.22); opacity: .7; }
        }
        @keyframes orbit {
          from { transform: rotate(0deg)   translateX(52%) rotate(0deg); }
          to   { transform: rotate(360deg) translateX(52%) rotate(-360deg); }
        }
        @keyframes orbit2 {
          from { transform: rotate(180deg) translateX(62%) rotate(-180deg); }
          to   { transform: rotate(540deg) translateX(62%) rotate(-540deg); }
        }
        @keyframes pFloat {
          0%   { transform: translate(0,0);      opacity: 0; }
          10%  { opacity: .8; }
          90%  { opacity: .5; }
          100% { transform: translate(var(--tx), var(--ty)); opacity: 0; }
        }
        @keyframes sparkle {
          0%,100% { opacity: .3; transform: scale(.7) rotate(0deg); }
          50%     { opacity: 1;  transform: scale(1.3) rotate(90deg); }
        }
        @keyframes speechIn {
          0%   { opacity: 0; transform: translateY(8px) scale(.9); }
          100% { opacity: 1; transform: translateY(0)   scale(1); }
        }
        @keyframes ringPulse {
          0%,100% { opacity: .25; transform: scale(1); }
          50%     { opacity: .5;  transform: scale(1.05); }
        }

        .mascot-float  { animation: mascotFloat 4s ease-in-out infinite; }
        .mascot-bounce { animation: mascotBounce .6s cubic-bezier(.36,.07,.19,.97); }
        .mascot-aura   { animation: auraPulse 3s ease-in-out infinite; }
        .mascot-aura-h { animation: auraHover 1.8s ease-in-out infinite; }
        .orb1  { animation: orbit  6s linear infinite; }
        .orb2  { animation: orbit2 9s linear infinite; }
        .ring  { animation: ringPulse 3s ease-in-out infinite; }
        .sp    { animation: sparkle 2s ease-in-out infinite; }
        .speech-bubble { animation: speechIn .25s ease-out forwards; }

        .particle { animation: pFloat var(--dur) ease-out infinite var(--delay); }

        @media(prefers-reduced-motion:reduce){
          .mascot-float,.mascot-bounce,.mascot-aura,.mascot-aura-h,
          .orb1,.orb2,.ring,.sp,.particle,.speech-bubble {
            animation: none !important; opacity: 1 !important; transform: none !important;
          }
        }
      `}</style>

      {/* Glow aura */}
      <div
        className={`absolute inset-0 rounded-full blur-[70px] pointer-events-none transition-colors duration-500 ${
          hovered ? "mascot-aura-h bg-primary/40" : "mascot-aura bg-primary/20"
        }`}
        style={{ inset: "-20%" }}
      />

      {/* Orbit ring */}
      <div className="ring absolute inset-0 rounded-full border border-primary/20 pointer-events-none" style={{ inset: "-8%" }} />

      {/* Orbiting dots */}
      <div className="absolute inset-0 pointer-events-none" style={{ inset: "10%" }}>
        <div className="orb1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_8px_3px_rgba(75,43,238,.6)]" />
        </div>
        <div className="orb2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_6px_2px_rgba(217,140,63,.6)]" />
        </div>
      </div>

      {/* Particles */}
      {[
        { top:"12%", left:"18%", size:"w-2.5 h-2.5", color:"bg-primary/70",   tx:"60px",  ty:"-100px", dur:"4s",   delay:".4s"  },
        { top:"22%", left:"75%", size:"w-2 h-2",     color:"bg-secondary/60", tx:"-50px", ty:"-80px",  dur:"3.5s", delay:"1s"   },
        { top:"70%", left:"78%", size:"w-3 h-3",     color:"bg-primary/50",   tx:"45px",  ty:"65px",   dur:"5s",   delay:".2s"  },
        { top:"65%", left:"10%", size:"w-2 h-2",     color:"bg-purple-400/50",tx:"-70px", ty:"45px",   dur:"4.5s", delay:"1.5s" },
        { top:"38%", left:"85%", size:"w-1.5 h-1.5", color:"bg-primary/80",   tx:"80px",  ty:"20px",   dur:"3.8s", delay:".8s"  },
        { top:"8%",  left:"55%", size:"w-2 h-2",     color:"bg-purple-300/60",tx:"-25px", ty:"-120px", dur:"4.2s", delay:"2s"   },
        { top:"82%", left:"32%", size:"w-1.5 h-1.5", color:"bg-secondary/50", tx:"30px",  ty:"80px",   dur:"4.8s", delay:"2.5s" },
        { top:"50%", left:"4%",  size:"w-2.5 h-2.5", color:"bg-primary/40",   tx:"-90px", ty:"-40px",  dur:"3.2s", delay:"3s"   },
        { top:"30%", left:"90%", size:"w-2 h-2",     color:"bg-purple-500/40",tx:"70px",  ty:"-60px",  dur:"4.6s", delay:"1.2s" },
        { top:"88%", left:"60%", size:"w-2 h-2",     color:"bg-primary/60",   tx:"-40px", ty:"90px",   dur:"3.9s", delay:"0.6s" },
      ].map((p, i) => (
        <div
          key={i}
          className={`particle absolute ${p.size} rounded-full ${p.color} pointer-events-none`}
          style={{
            top: p.top, left: p.left,
            "--tx": p.tx, "--ty": p.ty,
            "--dur": p.dur, "--delay": p.delay,
          } as React.CSSProperties}
        />
      ))}

      {/* Speech bubble */}
      {showMsg && (
        <div className="speech-bubble absolute -top-14 left-1/2 -translate-x-1/2 z-30 pointer-events-none whitespace-nowrap">
          <div className="bg-white dark:bg-slate-800 text-foreground text-sm font-semibold px-4 py-2 rounded-2xl shadow-xl border border-border/60 relative">
            {MESSAGES[msgIdx]}
            <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[7px] border-r-[7px] border-t-[8px] border-l-transparent border-r-transparent border-t-white dark:border-t-slate-800" />
          </div>
        </div>
      )}

      {/* Mascot */}
      <div
        className={bouncing ? "mascot-bounce" : "mascot-float"}
        style={{
          transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) ${bouncing ? "" : ""}`,
          transition: bouncing ? "none" : "transform .12s ease-out",
        }}
      >
        <Image
          src="/mascot.png"
          alt="AuraLiq IA"
          width={500}
          height={500}
          className="w-full h-auto relative z-10 transition-all duration-300"
          style={{
            filter: `drop-shadow(0 20px 50px rgba(75,43,238,${hovered ? ".5" : ".25"}))`,
            transform: hovered ? "scale(1.04)" : "scale(1)",
            transition: "filter .3s, transform .3s",
          }}
          priority
        />
      </div>

      {/* Sparkles */}
      {[
        { bottom:"14%", right:"8%",  size:22, color:"#C4AFFF", delay:"0s",   diag:true  },
        { top:"8%",     left:"12%",  size:16, color:"#9B7EF9", delay:"1.2s", diag:false },
        { top:"42%",    right:"3%",  size:12, color:"#7B5BF5", delay:"0.6s", diag:false },
        { bottom:"30%", left:"6%",   size:14, color:"#C4AFFF", delay:"1.8s", diag:true  },
        { top:"25%",    right:"18%", size:10, color:"#9B7EF9", delay:"2.4s", diag:false },
      ].map((s, i) => (
        <div key={i} className="absolute pointer-events-none z-20" style={{ bottom: s.bottom, top: s.top, right: s.right, left: s.left }}>
          <svg className="sp" style={{ animationDelay: s.delay }} width={s.size} height={s.size} viewBox="0 0 22 22" fill="none">
            <line x1="11" y1="2" x2="11" y2="20" stroke={s.color} strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="2" y1="11" x2="20" y2="11" stroke={s.color} strokeWidth="1.5" strokeLinecap="round"/>
            {s.diag && <>
              <line x1="5" y1="5" x2="17" y2="17" stroke={s.color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
              <line x1="17" y1="5" x2="5" y2="17" stroke={s.color} strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
            </>}
          </svg>
        </div>
      ))}
    </div>
  );
}
