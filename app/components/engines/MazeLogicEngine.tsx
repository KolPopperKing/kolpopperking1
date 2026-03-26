import React from 'react';
import { Share2 } from 'lucide-react';

export const MazeLogicEngine = ({ data }: any) => (
  <div className="bg-slate-950 rounded-3xl p-8 shadow-2xl border border-white/5">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-white font-bold tracking-widest uppercase text-sm">Maze Logic System</h2>
      <Share2 className="text-blue-500" size={20} />
    </div>
    <div className="grid grid-cols-10 gap-1 bg-black p-4 rounded-2xl aspect-square border border-white/10">
      {Array(100).fill(0).map((_, i) => (
        <div key={i} className={`rounded-sm ${i % 15 === 0 ? 'bg-slate-800' : i === 12 ? 'bg-blue-500 animate-pulse' : 'bg-slate-900/50'}`}></div>
      ))}
    </div>
  </div>
);