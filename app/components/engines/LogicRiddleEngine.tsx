import React from 'react';
import { HelpCircle } from 'lucide-react';

export const LogicRiddleEngine = ({ data }: any) => (
  <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
    <div className="flex items-center gap-4 mb-8">
      <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
        <HelpCircle size={28} />
      </div>
      <h2 className="text-2xl font-bold text-slate-800">חידת היגיון</h2>
    </div>
    <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100 text-lg font-medium text-slate-700 mb-8 leading-relaxed italic">
      "{data.game_data?.riddle || data.game_data?.q || "טוען חידה..."}"
    </div>
    <input 
      type="text" 
      className="w-full p-5 bg-white border-2 border-slate-100 rounded-2xl focus:border-indigo-500 outline-none transition-all font-bold text-lg" 
      placeholder="הקלד את תשובתך כאן..." 
    />
  </div>
);