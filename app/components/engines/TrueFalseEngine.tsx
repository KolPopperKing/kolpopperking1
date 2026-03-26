import React from 'react';
import { HelpCircle } from 'lucide-react';

export const TrueFalseEngine = ({ data }: any) => (
  <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100 text-center">
    <HelpCircle className="mx-auto mb-6 text-indigo-500" size={48} />
    <h2 className="text-2xl font-bold mb-8">אמת או שקר?</h2>
    <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100 text-xl font-bold text-indigo-900 mb-8 leading-relaxed">
      "{data.game_data?.statement || "האם המשפט הבא נכון?"}"
    </div>
    <div className="flex gap-4 max-w-sm mx-auto">
      <button className="flex-1 py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-md">אמת</button>
      <button className="flex-1 py-4 bg-red-600 text-white rounded-xl font-bold hover:bg-red-700 shadow-md">שקר</button>
    </div>
  </div>
);