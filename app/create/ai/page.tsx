"use client";
import React, { useState, useTransition } from 'react';
import { GAME_CATALOG } from '@/utils/gameDefinitions';
import { generateGameAction } from '@/app/actions/generateGame';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import { ArrowRight, Sparkles, Wand2, Loader2, AlertCircle, Pencil } from 'lucide-react';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AICreatePage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [form, setForm] = useState({ title: '', age: '', topic: '' });

  // פונקציה שמייצרת הנחיה מותאמת אישית ל-AI לפי סוג המשחק
  const getPromptForType = (type: string, topic: string) => {
    switch (type) {
      case 'wheel':
      case 'wheel_of_fortune':
        return `צור רשימה של 10 פריטים לגלגל מזל בנושא ${topic}. לכל פריט צור: text (המילה שתופיע בגלגל) ו-instruction (משימה או שאלה שתקפוץ כשהגלגל נעצר על המילה).`;
      
      case 'fill_in_blanks':
      case 'missing_letters':
        return `צור 10 משפטים בנושא ${topic} שבהם חסרה מילה. לכל משפט צור: sentence (המשפט עם ____ במקום החסר) ו-answer (המילה שחסרה).`;
      
      case 'trivia':
      case 'multiple_choice':
        return `צור 10 שאלות טריוויה בנושא ${topic}. לכל שאלה צור: question (השאלה), ans1 (התשובה הנכונה), ans2, ans3, ans4 (תשובות שגויות).`;
      
      case 'true_false':
        return `צור 10 היגדים בנושא ${topic}. לכל היגד צור: statement (ההיגד) ו-answer (true אם נכון, false אם לא).`;

      case 'matching':
      case 'connect_pairs':
        return `צור 10 זוגות להתאמה בנושא ${topic}. לכל זוג צור: sideA ו-sideB שמתאימים זה לזה.`;

      default:
        return `צור 10 שאלות ותשובות בנושא ${topic} למשחק מסוג ${type}. לכל אחד צור שדה question ושדה answer.`;
    }
  };

  const handleCreate = async (isManual: boolean) => {
    if (!form.title || !selectedType) return alert("נא להזין שם למשחק");
    
    setLoading(true);
    setErrorMsg(null);

    try {
      let gameData = null;

      if (!isManual) {
        if (!form.topic) throw new Error("נא להזין נושא לבינה המלאכותית");
        
        // כאן הקסם: אנחנו שולחים ל-Action גם את ההנחיה המפורשת שבנינו
        const customPrompt = getPromptForType(selectedType, form.topic);
        
        // הערה: וודא ש-generateGameAction מקבל את ה-customPrompt ומשתמש בו מול ה-AI
        gameData = await generateGameAction(selectedType, form.topic, form.age || "כל הגילאים", customPrompt);
      } else {
        // ביצירה ידנית, אנחנו יוצרים מערך ריק של 5 שלבים כדי שיהיה מה לערוך
        gameData = Array(5).fill({});
      }

      const { data: newGame, error: dbError } = await supabase
        .from('games')
        .insert({
          title: form.title,
          game_type: selectedType,
          game_data: gameData,
          approved: false
        })
        .select().single();
      
      if (dbError) throw dbError;

      startTransition(() => {
        router.push(`/create/edit/${newGame.id}`);
        router.refresh();
      });

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "שגיאה ביצירה");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8 italic pt-24" dir="rtl">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-center mb-8">
           <button onClick={() => step === 1 ? router.push('/create') : setStep(1)} className="text-slate-400 font-bold hover:text-blue-600 flex items-center gap-2">
             <ArrowRight size={20} /> חזרה
           </button>
           <h1 className="text-2xl md:text-3xl font-black text-slate-800 flex items-center gap-2">
             <Sparkles className="text-blue-600" /> יוצר המשחקים של מוישי
           </h1>
        </div>

        {errorMsg && (
          <div className="max-w-md mx-auto mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-bold">{errorMsg}</span>
          </div>
        )}

        {step === 1 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Object.entries(GAME_CATALOG).map(([id, game]) => (
              <div 
                key={id}
                onClick={() => { setSelectedType(id); setStep(2); }}
                className="bg-white border border-slate-100 p-6 rounded-[2rem] shadow-sm hover:shadow-xl hover:border-blue-300 cursor-pointer transition-all text-center group active:scale-95"
              >
                <div className={`${game.color} w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-3 text-3xl shadow-inner transition-transform group-hover:scale-110`}>
                  {game.icon}
                </div>
                <span className="font-bold text-slate-700 block leading-tight">{game.label}</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-md mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
            <h2 className="text-2xl font-black mb-8 text-blue-600 text-center flex items-center justify-center gap-2 italic">
              <span>{GAME_CATALOG[selectedType!]?.icon}</span>
              {GAME_CATALOG[selectedType!]?.label}
            </h2>
            
            <div className="space-y-4">
              <input 
                placeholder="שם המשחק (למשל: חגים ומועדים)" 
                className="w-full p-4 bg-slate-50 rounded-2xl outline-none focus:ring-2 ring-blue-400 text-right font-bold"
                onChange={e => setForm({...form, title: e.target.value})} 
              />
              
              <div className="h-[1px] bg-slate-100 my-4"></div>

              {/* אופציה 1: AI */}
              <div className="space-y-3 p-4 bg-blue-50/50 rounded-3xl border border-blue-100">
                <p className="text-[10px] font-black text-blue-400 text-center uppercase tracking-widest">יצירה מהירה עם AI</p>
                <textarea 
                  placeholder="על מה יהיה המשחק? (למשל: פרשת השבוע)" 
                  className="w-full p-3 bg-white rounded-xl h-24 outline-none focus:ring-2 ring-blue-400 resize-none text-right text-sm font-medium"
                  onChange={e => setForm({...form, topic: e.target.value})} 
                />
                <button 
                  onClick={() => handleCreate(false)}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-4 rounded-xl font-black flex items-center justify-center gap-2 hover:bg-blue-700 shadow-lg transition-all active:scale-95 disabled:bg-slate-300"
                >
                  {loading ? <Loader2 className="animate-spin" /> : <><Wand2 size={18} /> תן ל-AI למלא לי</>}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <div className="h-[1px] bg-slate-200 flex-1"></div>
                <span className="text-slate-300 text-[10px] font-black uppercase">או</span>
                <div className="h-[1px] bg-slate-200 flex-1"></div>
              </div>

              {/* אופציה 2: ידני */}
              <button 
                onClick={() => handleCreate(true)}
                disabled={loading}
                className="w-full bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:border-blue-400 hover:text-blue-500 transition-all active:scale-95"
              >
                <Pencil size={18} />
                אני אכתוב את השאלות בעצמי
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}