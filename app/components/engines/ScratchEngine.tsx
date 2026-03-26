import React from 'react';
import { Gamepad2 } from 'lucide-react';

export const ScratchEngine = ({ data }: any) => {
  const content = String(data.game_data?.scratch_url || data.content || "");
  const scratchId = content.match(/\d+/)?.[0];

  return (
    <div className="bg-black rounded-3xl overflow-hidden shadow-2xl h-[600px] flex flex-col">
      <div className="p-4 bg-slate-900 flex items-center gap-3 px-8 text-white">
        <Gamepad2 className="text-blue-400" size={20} />
        <span className="font-bold text-sm tracking-widest uppercase">External Scratch Engine</span>
      </div>
      <div className="flex-grow bg-slate-800">
        {scratchId ? (
          <iframe 
            src={`https://scratch.mit.edu/projects/${scratchId}/embed`} 
            className="w-full h-full border-none" 
            allowFullScreen 
          />
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 font-bold italic">Scratch ID Missing</div>
        )}
      </div>
    </div>
  );
};