import React from 'react';
import { FlaskConical } from 'lucide-react';

export const ChemLabEngine = ({ data }: any) => (
  <div className="bg-white rounded-[40px] p-10 border border-slate-100 shadow-xl">
    <div className="flex items-center gap-4 mb-10">
      <div className="p-3 bg-emerald-100 rounded-2xl text-emerald-600"><FlaskConical size={24}/></div>
      <h2 className="text-xl font-black text-slate-800 uppercase italic">Virtual Lab</h2>
    </div>
    <div className="flex justify-around items-end h-40 gap-4 mb-8">
      <div className="w-16 h-32 bg-emerald-400/20 border-2 border-emerald-400 rounded-b-full relative overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-2/3 bg-emerald-400"></div>
      </div>
      <div className="w-16 h-32 bg-purple-400/20 border-2 border-purple-400 rounded-b-full relative overflow-hidden">
        <div className="absolute bottom-0 inset-x-0 h-1/3 bg-purple-400"></div>
      </div>
    </div>
  </div>
);