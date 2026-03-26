import React from 'react';
import { Brain } from 'lucide-react';

export const TriviaEngine = ({ data }: any) => {
  const g = data.game_data || {};
  return (
    <div className="bg-white rounded-3xl p-10 shadow-lg border border-slate-100">
      <div className="flex flex-col items-center text-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-blue-100 shadow-xl">
          <Brain className="text-white" size={32} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-8">{g.question || "שאלה ללא כותרת"}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {(g.options || ['אופציה א', 'אופציה ב', 'אופציה ג', 'אופציה ד']).map((opt: string) => (
            <button key={opt} className="p-5 bg-slate-50 border border-slate-200 rounded-xl font-bold hover:bg-slate-900 hover:text-white transition-all text-right">
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};