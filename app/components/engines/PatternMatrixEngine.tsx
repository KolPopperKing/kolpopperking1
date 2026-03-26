import React from 'react';
import { Grid } from 'lucide-react';

export const PatternMatrixEngine = ({ data }: any) => (
  <div className="bg-white rounded-[32px] p-10 shadow-xl border border-slate-100 text-center">
    <Grid className="mx-auto mb-8 text-indigo-600" size={32} />
    <h3 className="font-bold text-slate-400 uppercase text-xs tracking-widest mb-6">Complete the Pattern</h3>
    <div className="grid grid-cols-3 gap-3 max-w-xs mx-auto">
      {Array(9).fill(0).map((_, i) => (
        <div key={i} className={`aspect-square rounded-2xl flex items-center justify-center shadow-sm border-2 ${i === 8 ? 'border-dashed border-indigo-200 bg-indigo-50' : 'bg-slate-900 border-slate-900 text-white'}`}>
          {i !== 8 && <div className="w-4 h-4 bg-white/20 rounded-full"></div>}
        </div>
      ))}
    </div>
  </div>
);