import React from 'react';
import { RefreshCw } from 'lucide-react';

export const CipherWheelEngine = ({ data }: any) => (
  <div className="bg-slate-900 rounded-[32px] p-12 text-center border border-slate-800 shadow-2xl">
    <div className="w-48 h-48 border-8 border-slate-700 rounded-full mx-auto mb-10 flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
      <div className="absolute inset-0 flex items-center justify-center">
        <RefreshCw className="text-slate-500" size={40} />
      </div>
      <span className="absolute -top-4 text-white font-black">A</span>
      <span className="absolute -right-4 text-white font-black">M</span>
      <span className="absolute -bottom-4 text-white font-black">Z</span>
    </div>
    <div className="bg-white/5 p-6 rounded-2xl border border-white/10 text-emerald-400 font-mono text-xl tracking-widest uppercase">
      {data.game_data?.encoded || "DECODE_THIS_77"}
    </div>
  </div>
);