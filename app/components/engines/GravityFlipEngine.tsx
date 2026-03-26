import React from 'react';
import { ArrowUpDown } from 'lucide-react';

export const GravityFlipEngine = ({ data }: any) => (
  <div className="bg-slate-900 rounded-[40px] p-12 text-center border border-white/5 shadow-2xl overflow-hidden relative">
    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-blue-500 rounded-full opacity-50"></div>
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-2 bg-rose-500 rounded-full opacity-50"></div>
    <ArrowUpDown className="mx-auto mb-8 text-white animate-bounce" size={48} />
    <h2 className="text-white font-black text-2xl uppercase tracking-tighter mb-8">Gravity Shift</h2>
    <button className="px-10 py-4 bg-white text-slate-900 rounded-full font-bold hover:scale-105 transition-transform">FLIP GRAVITY</button>
  </div>
);