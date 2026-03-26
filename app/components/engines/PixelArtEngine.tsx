import React from 'react';
import { Palette } from 'lucide-react';

export const PixelArtEngine = ({ data }: any) => (
  <div className="bg-white rounded-[32px] p-8 shadow-xl border border-slate-100">
    <div className="flex items-center gap-3 mb-6">
      <Palette className="text-purple-500" size={24} />
      <span className="font-black italic text-slate-400 uppercase text-xs">Pixel Canvas v1</span>
    </div>
    <div className="grid grid-cols-12 gap-1 bg-slate-50 p-2 rounded-xl border border-slate-100">
      {Array(144).fill(0).map((_, i) => (
        <div key={i} className="aspect-square bg-white border border-slate-100 rounded-sm hover:bg-purple-200 transition-colors cursor-crosshair"></div>
      ))}
    </div>
  </div>
);