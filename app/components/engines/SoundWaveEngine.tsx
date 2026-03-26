import React from 'react';
import { Music } from 'lucide-react';

export const SoundWaveEngine = ({ data }: any) => (
  <div className="bg-black rounded-[32px] p-12 shadow-2xl border border-white/5">
    <Music className="text-cyan-400 mb-8" size={32} />
    <div className="flex items-end justify-center gap-2 h-32 mb-10">
      {[40, 70, 45, 90, 65, 80, 30, 55].map((h, i) => (
        <div key={i} className="w-3 bg-cyan-400 rounded-full animate-bounce" style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}></div>
      ))}
    </div>
    <div className="flex gap-4">
      <button className="flex-1 py-4 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 rounded-xl font-bold uppercase text-xs tracking-widest">Play Sample</button>
      <button className="flex-1 py-4 bg-white/5 border border-white/10 text-white rounded-xl font-bold uppercase text-xs tracking-widest">Next Track</button>
    </div>
  </div>
);