import React from 'react';
import { Skull } from 'lucide-react';

export const FinalBossEngine = ({ data }: any) => (
  <div className="bg-red-950 rounded-[40px] p-12 border-4 border-red-900 shadow-2xl text-center relative overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
    <Skull className="mx-auto mb-6 text-red-500 animate-pulse" size={64} />
    <h2 className="text-red-100 font-black text-4xl italic uppercase mb-10 tracking-tighter">The Final Challenge</h2>
    <div className="w-full h-4 bg-black rounded-full mb-10 border border-red-900 overflow-hidden">
      <div className="w-full h-full bg-red-600 shadow-[0_0_20px_red]"></div>
    </div>
    <button className="relative z-10 w-full py-5 bg-white text-red-950 rounded-2xl font-black text-xl hover:bg-red-100 transition-colors uppercase">Attack</button>
  </div>
);