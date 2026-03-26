import React from 'react';
import { Sparkles } from 'lucide-react';

export const StarMapEngine = ({ data }: any) => (
  <div className="bg-slate-950 rounded-[40px] p-10 border border-white/5 shadow-2xl relative overflow-hidden h-[400px]">
    <div className="absolute inset-0">
      {Array(30).fill(0).map((_, i) => (
        <div key={i} className="absolute bg-white rounded-full animate-ping" style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: '2px', height: '2px',
          animationDuration: `${Math.random() * 3 + 2}s`
        }}></div>
      ))}
    </div>
    <div className="relative z-10 flex flex-col items-center justify-center h-full">
      <Sparkles className="text-yellow-400 mb-4" size={32} />
      <h2 className="text-white font-bold tracking-[0.5em] uppercase text-xs">Constellation Map</h2>
    </div>
  </div>
);