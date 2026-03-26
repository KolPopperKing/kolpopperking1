import React from 'react';
import { Trophy } from 'lucide-react';

export const GoldCollectorEngine = ({ data }: any) => (
  <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-12 shadow-xl border border-amber-100 text-center">
    <Trophy className="mx-auto mb-6 text-amber-500" size={64} />
    <h2 className="text-sm font-black text-amber-800 uppercase tracking-[0.3em] mb-4">Total Rewards</h2>
    <div className="text-6xl font-black text-amber-600 tabular-nums mb-10">2,450</div>
    <div className="flex justify-center gap-3">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="w-10 h-10 bg-amber-400 rounded-full shadow-lg shadow-amber-200 animate-bounce" style={{animationDelay: `${i * 0.1}s`}}></div>
      ))}
    </div>
  </div>
);