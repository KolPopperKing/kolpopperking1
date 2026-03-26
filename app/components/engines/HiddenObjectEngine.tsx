import React from 'react';
import { Eye } from 'lucide-react';

export const HiddenObjectEngine = ({ data }: any) => (
  <div className="bg-white rounded-[40px] p-8 border border-slate-100 shadow-xl">
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-slate-800 font-bold">מצא את האובייקטים</h2>
      <Eye className="text-blue-500" size={24} />
    </div>
    <div className="aspect-video bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-wrap p-8 gap-8 items-center justify-center">
       <span className="text-4xl grayscale opacity-20">🍎</span>
       <span className="text-4xl">🔑</span>
       <span className="text-4xl grayscale opacity-20">🚗</span>
       <span className="text-4xl grayscale opacity-20">🎸</span>
    </div>
  </div>
);