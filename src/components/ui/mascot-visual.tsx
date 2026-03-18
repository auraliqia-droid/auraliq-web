"use client";

import Image from "next/image";

export function MascotVisual({ className = "" }: { className?: string }) {
  return (
    <div className={`relative ${className}`}>
      <style>{`
        @keyframes mascotFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-18px)}}
        @keyframes auraPulse{0%,100%{transform:scale(1);opacity:.25}50%{transform:scale(1.1);opacity:.45}}
        @keyframes pF1{0%{transform:translate(0,0);opacity:0}10%{opacity:.7}90%{opacity:.7}100%{transform:translate(70px,-110px);opacity:0}}
        @keyframes pF2{0%{transform:translate(0,0);opacity:0}10%{opacity:.5}90%{opacity:.5}100%{transform:translate(-60px,-90px);opacity:0}}
        @keyframes pF3{0%{transform:translate(0,0);opacity:0}10%{opacity:.6}90%{opacity:.6}100%{transform:translate(50px,70px);opacity:0}}
        @keyframes pF4{0%{transform:translate(0,0);opacity:0}10%{opacity:.4}90%{opacity:.4}100%{transform:translate(-80px,50px);opacity:0}}
        @keyframes pF5{0%{transform:translate(0,0);opacity:0}10%{opacity:.8}90%{opacity:.8}100%{transform:translate(90px,20px);opacity:0}}
        @keyframes pF6{0%{transform:translate(0,0);opacity:0}10%{opacity:.3}90%{opacity:.3}100%{transform:translate(-30px,-130px);opacity:0}}
        @keyframes sparkle{0%,100%{opacity:.3;transform:scale(.8) rotate(0deg)}50%{opacity:.9;transform:scale(1.3) rotate(90deg)}}
        .mascot-float{animation:mascotFloat 3.5s ease-in-out infinite}
        .mascot-aura{animation:auraPulse 3s ease-in-out infinite}
        .mp1{animation:pF1 4s ease-out infinite .5s}
        .mp2{animation:pF2 3.5s ease-out infinite 1s}
        .mp3{animation:pF3 5s ease-out infinite .2s}
        .mp4{animation:pF4 4.5s ease-out infinite 1.5s}
        .mp5{animation:pF5 3.8s ease-out infinite .8s}
        .mp6{animation:pF6 4.2s ease-out infinite 2s}
        .mp7{animation:pF1 4.8s ease-out infinite 2.5s}
        .mp8{animation:pF2 3.2s ease-out infinite 3s}
        .sparkle-anim{animation:sparkle 2s ease-in-out infinite}
        @media(prefers-reduced-motion:reduce){.mascot-float,.mascot-aura,.mp1,.mp2,.mp3,.mp4,.mp5,.mp6,.mp7,.mp8,.sparkle-anim{animation:none!important;opacity:1!important;transform:none!important}}
      `}</style>

      {/* Aura glow */}
      <div className="mascot-aura absolute inset-0 -inset-x-8 -inset-y-8 rounded-full bg-primary/20 blur-[60px] pointer-events-none" />

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="mp1 absolute top-[15%] right-[20%] w-2.5 h-2.5 rounded-full bg-primary/70" />
        <div className="mp2 absolute top-[25%] left-[12%] w-2 h-2 rounded-full bg-secondary/60" />
        <div className="mp3 absolute bottom-[20%] right-[15%] w-3 h-3 rounded-full bg-primary/50" />
        <div className="mp4 absolute bottom-[30%] left-[18%] w-2 h-2 rounded-full bg-purple-400/40" />
        <div className="mp5 absolute top-[40%] right-[8%] w-1.5 h-1.5 rounded-full bg-primary/80" />
        <div className="mp6 absolute top-[10%] left-[28%] w-2 h-2 rounded-full bg-purple-300/50" />
        <div className="mp7 absolute bottom-[12%] left-[25%] w-1.5 h-1.5 rounded-full bg-secondary/60" />
        <div className="mp8 absolute top-[55%] left-[5%] w-2.5 h-2.5 rounded-full bg-primary/40" />
      </div>

      {/* Mascot image floating */}
      <div className="mascot-float relative z-10">
        {/* TODO: Replace public/mascot.png with your actual kawaii purple robot mascot image */}
        <Image
          src="/mascot.png"
          alt="AuraLiq IA"
          width={500}
          height={500}
          className="w-full h-auto"
          style={{ filter: "drop-shadow(0 20px 40px rgba(75,43,238,0.25))" }}
          priority
        />
      </div>

      {/* Sparkles */}
      <div className="absolute bottom-[15%] right-[10%] pointer-events-none z-20">
        <svg className="sparkle-anim" width="22" height="22" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="2" x2="11" y2="20" stroke="#C4AFFF" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="11" x2="20" y2="11" stroke="#C4AFFF" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="5" y1="5" x2="17" y2="17" stroke="#C4AFFF" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
          <line x1="17" y1="5" x2="5" y2="17" stroke="#C4AFFF" strokeWidth="1" strokeLinecap="round" opacity="0.5"/>
        </svg>
      </div>
      <div className="absolute top-[10%] left-[15%] pointer-events-none z-20">
        <svg className="sparkle-anim" style={{ animationDelay: "1.2s" }} width="16" height="16" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="2" x2="11" y2="20" stroke="#9B7EF9" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="2" y1="11" x2="20" y2="11" stroke="#9B7EF9" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>
      <div className="absolute top-[45%] right-[5%] pointer-events-none z-20">
        <svg className="sparkle-anim" style={{ animationDelay: "0.6s" }} width="12" height="12" viewBox="0 0 22 22" fill="none">
          <line x1="11" y1="4" x2="11" y2="18" stroke="#7B5BF5" strokeWidth="2" strokeLinecap="round"/>
          <line x1="4" y1="11" x2="18" y2="11" stroke="#7B5BF5" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </div>
    </div>
  );
}
