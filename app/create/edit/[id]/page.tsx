"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function EditGamePage() {
  const { id } = useParams();
  const [content, setContent] = useState<any[]>([]);
  const [game, setGame] = useState<any>(null);
  const [isGenerating, setIsGenerating] = useState(false); // מצב טעינה ל-AI

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

  // פונקציה חדשה שקוראת ל-API של ה-AI ששמרנו ב-route.ts
  const generateAI = async () => {
    const topic = prompt("על איזה נושא תרצה שה-AI יכתוב שאלות?");
    if (!topic) return;

    setIsGenerating(true);
    try {
      const res = await fetch('/api/generate-game', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          gameType: game.game_type,
          topic: topic,
          age: "10" // גיל ברירת מחדל
        }),
      });

      const aiData = await res.json();
      if (aiData && Array.isArray(aiData)) {
        setContent(aiData); // מעדכן את התוכן במסך עם מה שה-AI יצר
      }
    } catch (err) {
      alert("שגיאה ביצירת תוכן מה-AI");
    } finally {
      setIsGenerating(false);
    }
  };

  const renderFields = (item: any, index: number) => {
    const type = game?.game_type?.toLowerCase() || "";
    const inputCls = "w-full p-4 bg-slate-50 border rounded-2xl mb-2 font-bold text-right";

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
    // תמיכה בטריוויה (ans1-ans4)
    if (type.includes('trivia') || type.includes('quiz')) {
        return (
          <div className="bg-blue-50 p-4 rounded-3xl border border-blue-100 space-y-2">
            <input placeholder="השאלה" className={inputCls} value={item.question || ""} onChange={e => update(index, 'question', e.target.value)} />
            <div className="grid grid-cols-2 gap-2">
                <input placeholder="תשובה נכונה (1)" className={`${inputCls} border-green-300`} value={item.ans1 || ""} onChange={e => update(index, 'ans1', e.target.value)} />
                <input placeholder="תשובה 2" className={inputCls} value={item.ans2 || ""} onChange={e => update(index, 'ans2', e.target.value)} />
                <input placeholder="תשובה 3" className={inputCls} value={item.ans3 || ""} onChange={e => update(index, 'ans3', e.target.value)} />
                <input placeholder="תשובה 4" className={inputCls} value={item.ans4 || ""} onChange={e => update(index, 'ans4', e.target.value)} />
            </div>
          </div>
        );
    }
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
        <div>
           <h1 className="text-3xl font-black italic">עריכת {game.title}</h1>
           <p className="text-slate-500 font-bold">סוג: {game.game_type}</p>
        </div>
        <div className="flex gap-4">
            <button 
                onClick={generateAI} 
                disabled={isGenerating}
                className="bg-purple-600 text-white px-6 py-4 rounded-2xl font-black shadow-lg hover:bg-purple-700 transition-all disabled:opacity-50"
            >
                {isGenerating ? "ה-AI יוצר..." : "⚡ צור תוכן עם AI"}
            </button>
            <button onClick={save} className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black shadow-lg">שמור הכל</button>
        </div>
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