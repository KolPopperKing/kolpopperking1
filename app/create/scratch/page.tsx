"use client";
import React, { useState } from 'react';
import { Upload, FileCode, ArrowRight, ExternalLink, User, Tag, HelpCircle, CheckCircle, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function ScratchPage() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [creator, setCreator] = useState(''); // נשמור בתוך ה-JSON כפי שסיכמנו
  const [isSaving, setIsSaving] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const handleUpload = async () => {
    if (!file || !title || !creator) {
      return alert("נא למלא את כל השדות ולהעלות קובץ");
    }
    
    setIsSaving(true);

    try {
      // 1. יצירת שם קובץ לפי הפורמט שרואים אצלך ב-Storage (מספרים-אותיות)
      const fileExt = 'sb3';
      const timestamp = Date.now();
      const randomStr = Math.random().toString(36).substring(2, 7);
      const fileName = `${timestamp}-${randomStr}.${fileExt}`;
      const filePath = `scratch/${fileName}`;

      // 2. העלאה לבאקט game-files לתוך תיקיית scratch
      const { error: uploadError } = await supabase.storage
        .from('game-files') 
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      // 3. שמירה בטבלה games לפי המבנה שרואים בתמונה
      const { error: dbError } = await supabase
        .from('games')
        .insert({
          title: title,
          game_type: 'Scratch File', // מותאם בדיוק לערך שקיים אצלך בטבלה
          game_data: { 
            scratch_url: filePath, // שמירת הנתיב היחסי כפי שמופיע ב-"בדיקה 2"
            creator_name: creator,
            uploaded_at: new Date().toISOString()
          },
          approved: false // ברירת מחדל כפי שרואים בתמונה
        });

      if (dbError) throw dbError;

      setIsDone(true);
      router.refresh(); 
      
      setTimeout(() => {
        router.push('/games'); 
      }, 1000);

    } catch (error: any) {
      console.error(error);
      alert(`שגיאה בשמירה: ${error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-8 font-sans italic" dir="rtl">
      <div className="max-w-5xl mx-auto">
        <Link href="/create" className="flex items-center gap-2 text-slate-400 hover:text-blue-600 mb-8 font-bold transition-colors group w-fit">
          <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" /> 
          חזרה לבחירה
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* הדרכה צדדית */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white border border-slate-200 rounded-[2rem] p-8 shadow-sm">
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2 text-orange-600">
                <HelpCircle size={28} /> איך מעלים?
              </h2>
              <div className="space-y-4 text-sm">
                <p>1. שמרו ב-Scratch: <span className="font-bold">קובץ {'>'} שמירה למחשב</span>.</p>
                <p>2. וודאו שקיבלתם קובץ <span className="font-bold">.sb3</span>.</p>
                <p>3. מלאו פרטים והעלו כאן.</p>
              </div>
              <a href="https://scratch.mit.edu/projects/editor/" target="_blank" className="mt-6 block w-full py-4 bg-orange-50 text-orange-700 text-center rounded-2xl font-bold hover:bg-orange-100 transition-colors">
                פתיחת Scratch <ExternalLink size={16} className="inline mr-1" />
              </a>
            </div>
          </div>

          {/* טופס העלאה */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-[3rem] p-10 shadow-xl shadow-slate-200/50">
            <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-slate-100 rounded-2xl text-slate-700">
                <FileCode size={36} />
              </div>
              <h1 className="text-4xl font-black text-slate-800 tracking-tight">העלאת משחק</h1>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">שם המשחק</label>
                  <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:border-blue-500 outline-none shadow-sm" placeholder="למשל: הרפתקה בחלל" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-500 mr-2">שם היוצר</label>
                  <input value={creator} onChange={(e) => setCreator(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-2xl p-4 focus:border-blue-500 outline-none shadow-sm" placeholder="השם שלך" />
                </div>
              </div>

              <label className={`flex flex-col items-center justify-center border-4 border-dashed rounded-[2.5rem] p-16 transition-all cursor-pointer group
                ${file ? 'border-green-400 bg-green-50 shadow-inner' : 'border-slate-100 hover:border-blue-300 hover:bg-blue-50'}`}>
                <input type="file" accept=".sb3" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${file ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-400'}`}>
                   {isSaving ? <Loader2 className="animate-spin" size={32} /> : <Upload size={32} />}
                </div>
                <p className="text-xl font-bold text-slate-700">{file ? file.name : "בחר קובץ .sb3"}</p>
              </label>

              <button onClick={handleUpload} disabled={isSaving || isDone} className={`w-full py-6 rounded-[2rem] font-black text-2xl shadow-xl transition-all flex items-center justify-center gap-3
                  ${isDone ? 'bg-green-500 text-white' : isSaving ? 'bg-slate-200 text-slate-400' : 'bg-blue-600 hover:bg-blue-700 text-white active:scale-95 shadow-blue-200'}`}>
                {isDone ? "הצלחנו! עובר לגלריה" : isSaving ? "מעלה נתונים..." : "פרסם עכשיו"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}