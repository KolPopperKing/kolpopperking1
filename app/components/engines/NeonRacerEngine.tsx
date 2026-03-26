import React from 'react';
import { Zap } from 'lucide-react';

export const NeonRacerEngine = ({ data }: any) => (
  <div className="bg-black rounded-[40px] p-1 shadow-[0_0_50px_rgba(236,72,153,0.2)] overflow-hidden">
    <div className="bg-zinc-950 rounded-[38px] p-10 border border-pink-500/30">
      <div className="flex justify-between items-center mb-10">
        <div className="flex gap-1">
          {[1,2,3].map(i => <div key={i} className="w-2 h-8 bg-pink-500 shadow-[0_0_10px_#ec4899]"></div>)}
        </div>
        <Zap className="text-pink-500 shadow-pink-500" size={32} />
      </div>
      <div className="h-40 border-x-2 border-dashed border-zinc-800 flex items-center justify-center">
        <div className="w-12 h-20 bg-pink-500 rounded-lg shadow-[0_0_30px_#ec4899] animate-pulse"></div>
      </div>
    </div>
  </div>
);