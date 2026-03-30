"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EditGamePage() {
  const { id } = useParams();
  const [content, setContent] = useState<any[]>([]);
  const [game, setGame] = useState<any>(null);

  useEffect(() => {
    const fetchGame = async () => {
      const { data } = await supabase.from('games').select('*').eq('id', id).single();
      if (data) {
        setGame(data);
        setContent(data.game_data || []);
      }
    };
    fetchGame();
  }, [id]);

  const renderFields = (item: any, index: number) => {
    const type = game?.game_type?.toLowerCase() || "";
    const inputCls = "w-full p-4 bg-slate-50 border rounded-2xl mb-2 font-bold text-right";

    // לוגיקה לכל סוגי המשחקים (ה-25 מחולקים למבנים דומים)
    if (type.includes('wheel')) {
      return (
        <div className="bg-purple-50 p-4 rounded-3xl border border-purple-100">
          <input placeholder="מילה בגלגל" className={inputCls} value={item.text || ""} onChange={e => update(index, 'text', e.target.value)} />
          <textarea placeholder="הנחיה / משימה" className={inputCls} value={item.instruction || ""} onChange={e => update(index, 'instruction', e.target.value)} />
        </div>
      );
    }
    if (type.includes('fill')) {
      return (
        <div className="bg-orange-50 p-4 rounded-3xl border border-orange-100">
          <textarea placeholder="משפט עם ____" className={inputCls} value={item.sentence || ""} onChange={e => update(index, 'sentence', e.target.value)} />
          <input placeholder="תשובה חסרה" className={inputCls} value={item.answer || ""} onChange={e => update(index, 'answer', e.target.value)} />
        </div>
      );
    }
    // ברירת מחדל לכל השאר
    return (
      <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100">
        <input placeholder="שאלה / מושג" className={inputCls} value={item.question || item.sideA || ""} onChange={e => update(index, 'question', e.target.value)} />
        <input placeholder="תשובה / קטגוריה" className={inputCls} value={item.answer || item.sideB || ""} onChange={e => update(index, 'answer', e.target.value)} />
      </div>
    );
  };

  const update = (idx: number, key: string, val: any) => {
    const next = [...content];
    next[idx] = { ...next[idx], [key]: val };
    setContent(next);
  };

  const save = async () => {
    await supabase.from('games').update({ game_data: content }).eq('id', id);
    alert("נשמר בהצלחה!");
  };

  if (!game) return <div className="p-20 text-center font-black italic">טוען ארמון...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 pt-24" dir="rtl">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-black italic">עריכת {game.title}</h1>
        <button onClick={save} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg">שמור הכל</button>
      </div>
      <div className="space-y-6">
        {content.map((item, idx) => (
          <div key={idx} className="bg-white p-6 rounded-[2.5rem] shadow-sm relative group">
            <span className="absolute -right-4 top-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 rounded-lg flex items-center justify-center font-black">{idx + 1}</span>
            {renderFields(item, idx)}
          </div>
        ))}
      </div>
    </div>
  );
}