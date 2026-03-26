import React from 'react';
import { Target } from 'lucide-react';

export const SpaceOdysseyEngine = ({ data }: any) => (
  <div className="bg-black rounded-3xl p-10 shadow-2xl relative overflow-hidden border border-slate-800">
    <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900 via-transparent to-transparent"></div>
    <div className="relative z-10 text-center">
      <Target className="mx-auto mb-6 text-yellow-500 animate-pulse" size={48} />
      <h2 className="text-white font-black text-2xl uppercase tracking-[0.4em] mb-12">Space Interface</h2>
      <div className="w-full h-1.5 bg-white/10 rounded-full mb-12 overflow-hidden">
        <div className="w-1/3 h-full bg-yellow-500 shadow-[0_0_15px_#eab308]"></div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <button className="py-4 border border-white/20 rounded-xl text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Engage Thrusters</button>
        <button className="py-4 border border-white/20 rounded-xl text-white font-bold hover:bg-white/5 transition-all text-xs uppercase tracking-widest">Shields Max</button>
      </div>
    </div>
  </div>
);