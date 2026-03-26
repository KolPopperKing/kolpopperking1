import React from 'react';
import { Lock } from 'lucide-react';

export const CodeVaultEngine = ({ data }: any) => (
  <div className="bg-slate-900 rounded-3xl p-12 text-white shadow-2xl border border-white/5 text-center">
    <Lock className="mx-auto mb-8 text-emerald-400" size={48} />
    <h2 className="text-2xl font-black mb-10 tracking-[0.2em] uppercase text-emerald-400">Code Vault</h2>
    <div className="flex justify-center gap-3 mb-10" dir="ltr">
      {[1, 2, 3, 4].map(i => (
        <input key={i} className="w-14 h-20 bg-white/5 rounded-xl text-center text-3xl font-bold border border-white/10 outline-none focus:border-emerald-400" maxLength={1} placeholder="-" />
      ))}
    </div>
    <button className="w-full py-4 bg-emerald-500 text-slate-900 rounded-xl font-bold hover:bg-emerald-400 transition-colors uppercase">Decrypt</button>
  </div>
);