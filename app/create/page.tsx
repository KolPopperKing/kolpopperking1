import Link from 'next/link';
import { MousePointer2, Cpu, ArrowLeft } from 'lucide-react';

export default function CreateChoicePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col items-center justify-center p-6" dir="rtl">
      <h1 className="text-5xl font-black mb-4 text-slate-800 tracking-tight">
        מה נרצה ליצור היום?
      </h1>
      <p className="text-slate-500 text-xl mb-12 font-medium">בחר את הדרך שלך לבניית תוכן חדש ב"קול פופר"</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
        {/* כרטיס סקראץ' */}
        <Link href="/create/scratch" className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-orange-400 transition-all duration-300">
          <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <MousePointer2 size={36} className="text-orange-600" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-800">ייבוא מ-Scratch</h2>
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">העלאת קובץ .sb3 מוכן שיצרת ב-Scratch ישירות לתיקיית האחסון.</p>
          <div className="flex items-center text-orange-600 font-bold text-lg">
            עבור להעלאה <ArrowLeft size={22} className="mr-2" />
          </div>
        </Link>

        {/* כרטיס AI */}
        <Link href="/create/ai" className="group bg-white border border-slate-200 p-10 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Cpu size={36} className="text-blue-600" />
          </div>
          <h2 className="text-3xl font-black mb-4 text-slate-800">יצירה חכמה (AI)</h2>
          <p className="text-slate-600 leading-relaxed mb-8 text-lg">בניית משחקים אינטראקטיביים בעזרת בינה מלאכותית או במילוי ידני מהיר.</p>
          <div className="flex items-center text-blue-600 font-bold text-lg">
            התחל ליצור <ArrowLeft size={22} className="mr-2" />
          </div>
        </Link>
      </div>
    </div>
  );
}