import React from 'react';
import { Layers } from 'lucide-react';

export const MemoryEngine = ({ data }: any) => (
  <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
    <Layers className="mx-auto mb-6 text-pink-500" size={40} />
    <h2 className="text-2xl font-bold mb-10 text-slate-800">משחק הזיכרון</h2>
    <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
      {Array(16).fill(0).map((_, i) => (
        <div key={i} className="aspect-square bg-slate-100 rounded-xl border-2 border-slate-200 hover:border-pink-300 transition-all cursor-pointer flex items-center justify-center shadow-inner">
          <div className="w-4 h-4 bg-white rounded-full opacity-50"></div>
        </div>
      ))}
    </div>
  </div>
);