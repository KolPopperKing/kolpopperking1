import React from 'react';
import { Ghost } from 'lucide-react';

export const GhostEscapeEngine = ({ data }: any) => (
  <div className="bg-zinc-900 rounded-3xl p-10 shadow-2xl border border-zinc-800">
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-zinc-500 font-bold uppercase tracking-widest text-xs">Escape Protocol</h2>
      <Ghost className="text-indigo-500 animate-pulse" size={32} />
    </div>
    <div className="aspect-video bg-black rounded-2xl border border-zinc-800 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(79,70,229,0.1),transparent)]"></div>
      <div className="w-4 h-4 bg-red-600 rounded-full shadow-[0_0_20px_red]"></div>
    </div>
  </div>
);