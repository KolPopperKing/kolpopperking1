import React from 'react';
import { Hammer } from 'lucide-react';

export const BridgeBuilderEngine = ({ data }: any) => (
  <div className="bg-orange-50 rounded-[40px] p-12 border border-orange-100 shadow-xl text-center">
    <Hammer className="mx-auto mb-6 text-orange-600" size={40} />
    <h2 className="text-2xl font-bold text-orange-900 mb-8 font-serif">Bridge Construction</h2>
    <div className="flex justify-center gap-1 mb-10">
      {Array(10).fill(0).map((_, i) => (
        <div key={i} className="w-8 h-4 bg-orange-700 rounded-sm shadow-md"></div>
      ))}
    </div>
    <button className="bg-orange-800 text-white px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-xs">Place Plank</button>
  </div>
);