import React from 'react';
import { Zap } from 'lucide-react';

export const PhysicsEngine = ({ data }: any) => (
  <div className="bg-gradient-to-b from-sky-500 to-blue-600 rounded-3xl p-10 shadow-xl h-[500px] relative overflow-hidden border border-white/20">
    <div className="flex items-center gap-2 text-white/80 font-bold uppercase tracking-tighter mb-4">
      <Zap size={18} />
      <span>Physics Sandbox</span>
    </div>
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-16 h-16 bg-white rounded-2xl shadow-2xl animate-bounce flex items-center justify-center">
      <div className="w-8 h-8 bg-blue-100 rounded-full"></div>
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-4 bg-blue-900/30 backdrop-blur-sm"></div>
  </div>
);