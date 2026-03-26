import React from 'react';
import { Timer } from 'lucide-react';

export const ChronoDashEngine = ({ data }: any) => (
  <div className="bg-rose-600 rounded-[32px] p-10 text-white shadow-2xl relative overflow-hidden">
    <div className="relative z-10 flex justify-between items-center mb-12">
      <Timer size={32} className="animate-pulse" />
      <span className="text-5xl font-black italic tracking-tighter">00:15:24</span>
    </div>
    <div className="h-4 bg-white/20 rounded-full overflow-hidden mb-8">
      <div className="w-2/3 h-full bg-white shadow-[0_0_20px_white]"></div>
    </div>
    <button className="w-full py-6 bg-white text-rose-600 rounded-2xl font-black text-2xl uppercase italic">Boost</button>
  </div>
);