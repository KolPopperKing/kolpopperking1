import React from 'react';
import { Calculator } from 'lucide-react';

export const MathEngine = ({ data }: any) => (
  <div className="bg-white rounded-[32px] p-12 shadow-xl border border-slate-100 text-center">
    <Calculator className="mx-auto mb-6 text-blue-500" size={48} />
    <h2 className="text-4xl font-black mb-8 tabular-nums">15 + 27 = ?</h2>
    <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
      {[32, 42, 45, 38].map(n => (
        <button key={n} className="py-5 bg-slate-50 rounded-2xl font-bold text-xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">{n}</button>
      ))}
    </div>
  </div>
);