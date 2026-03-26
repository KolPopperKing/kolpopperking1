"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import { Plus, Play, Sparkles, Code2, Trash2, LayoutGrid, Loader2, Calendar } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GamesGallery() {
  const [games, setGames] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('ALL');

  useEffect(() => {
    async function fetchGames() {
      setLoading(true);
      const { data, error } = await supabase
        .from('games')
        .select('id, title, game_type, created_at')
        .order('created_at', { ascending: false });

      if (!error && data) setGames(data);
      setLoading(false);
    }
    fetchGames();
  }, []);

  const deleteGame = async (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    if (confirm('האם למחוק את המשחק?')) {
      const { error } = await supabase.from('games').delete().eq('id', id);
      if (!error) setGames(games.filter(g => g.id !== id));
    }
  };

  const filtered = games.filter(g => {
    if (filter === 'ALL') return true;
    if (filter === 'AI') return g.game_type !== 'Scratch File';
    if (filter === 'SCRATCH') return g.game_type === 'Scratch File';
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FBFBFD] text-[#1D1D1F] font-sans" dir="rtl">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 text-left">
        <div className="max-w-7xl mx-auto flex justify-between items-center flex-row-reverse">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight italic">GAMES CENTER</span>
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-sm">
              <LayoutGrid size={20} />
            </div>
          </div>
          <Link href="/games/create" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-bold text-sm transition-all flex items-center gap-2">
            <Plus size={18} /> יצירה חדשה
          </Link>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold mb-3 italic text-right">הספריה של <span className="text-blue-600">קול פופר</span></h2>
          <p className="text-gray-400 font-medium text-right">ניהול {games.length} משחקים שמורים</p>
        </div>

        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 flex-row-reverse">
          {['ALL', 'AI', 'SCRATCH'].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-8 py-2 rounded-full font-bold text-sm border transition-all ${filter === f ? 'bg-gray-900 text-white border-gray-900 shadow-md' : 'bg-white text-gray-500 border-gray-200'}`}>
              {f === 'ALL' ? 'כל המשחקים' : f === 'AI' ? 'מנועי AI' : 'פרויקטים מסקראץ\''}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-32 opacity-30">
            <Loader2 className="animate-spin mb-4" size={40} />
            <span className="font-bold italic">טוען מהענן...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filtered.map((game) => (
              <div key={game.id} className="group bg-white rounded-[32px] border border-gray-100 hover:border-blue-200 transition-all hover:shadow-xl flex flex-col p-3">
                <Link href={`/games/${game.id}`} className={`aspect-[1.2] rounded-[24px] mb-5 flex items-center justify-center relative overflow-hidden ${game.game_type === 'Scratch File' ? 'bg-orange-50' : 'bg-blue-50'}`}>
                  {game.game_type === 'Scratch File' ? <Code2 size={40} className="text-orange-300" /> : <Sparkles size={40} className="text-blue-300" />}
                  <div className="absolute inset-0 bg-white/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
                    <div className="bg-white text-blue-600 w-12 h-12 rounded-full flex items-center justify-center shadow-lg"><Play size={20} fill="currentColor" /></div>
                  </div>
                </Link>
                <div className="px-4 pb-4 text-right">
                  <div className="flex justify-between items-start mb-2 flex-row-reverse">
                    <h3 className="text-lg font-bold text-gray-800 truncate italic">{game.title || 'משחק ללא שם'}</h3>
                    <button onClick={(e) => deleteGame(game.id, e)} className="text-gray-300 hover:text-red-400"><Trash2 size={16} /></button>
                  </div>
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${game.game_type === 'Scratch File' ? 'bg-orange-100 text-orange-600' : 'bg-blue-100 text-blue-600'}`}>{game.game_type}</span>
                    <span className="text-[10px] text-gray-400 font-bold flex items-center gap-1"><Calendar size={10} /> {new Date(game.created_at).toLocaleDateString('he-IL')}</span>
                  </div>
                </div>
              </div>
            ))}
            <Link href="/games/create" className="border-2 border-dashed border-gray-100 rounded-[32px] flex flex-col items-center justify-center aspect-[1.2] hover:bg-gray-50 hover:border-gray-300 transition-all group p-4">
              <div className="w-12 h-12 bg-gray-50 text-gray-300 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 mb-3"><Plus size={24} /></div>
              <span className="text-gray-400 font-bold text-sm italic">צור משחק חדש</span>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}