import React from 'react';
import { ListChecks } from 'lucide-react';

export const ConceptMatchEngine = ({ data }: any) => (
  <div className="bg-white rounded-3xl p-10 shadow-xl border border-slate-100">
    <div className="flex items-center gap-3 mb-10 text-teal-600">
      <ListChecks size={28} />
      <h2 className="text-xl font-bold uppercase tracking-tight">Concept Matching</h2>
    </div>
    <div className="grid grid-cols-2 gap-6">
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-5 bg-teal-50 border border-teal-100 rounded-xl font-bold text-teal-900 cursor-pointer hover:bg-teal-100 transition-colors">מושג {i}</div>
        ))}
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="p-5 bg-slate-50 border border-slate-200 border-dashed rounded-xl font-medium text-slate-500 italic">הגדרה פוטנציאלית {i}</div>
        ))}
      </div>
    </div>
  </div>
);