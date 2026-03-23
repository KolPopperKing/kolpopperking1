'use client';
import { useState } from 'react';

export default function CreateAI() {
  const [topic, setTopic] = useState('');
  const [quiz, setQuiz] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const generateQuiz = async () => {
    setLoading(true);
    // כאן בהמשך נחבר את הקריאה האמיתית ל-API
    // בינתיים נבנה את הממשק שיציג את התוצאה
    setTimeout(() => {
      setQuiz([
        {
          q: 'מהו כוכב הלכת הקרוב ביותר לשמש?',
          a: ['מאדים', 'נוגה', 'חמה', 'צדק'],
          correct: 2,
        },
      ]);
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] shadow-2xl p-10 border-4 border-blue-100">
        <h1 className="text-4xl font-black text-blue-600 mb-6 text-center">
          מחולל החידונים של קול פופר 🤖
        </h1>

        <div className="space-y-6">
          <textarea
            className="w-full p-6 rounded-2xl border-2 border-gray-100 focus:border-blue-400 outline-none text-lg h-40"
            placeholder="הדבק כאן כתבה או נושא, וה-AI ימציא שאלות..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />

          <button
            onClick={generateQuiz}
            disabled={loading}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-black py-5 rounded-2xl text-2xl shadow-lg hover:scale-[1.02] active:scale-95 transition-all"
          >
            {loading ? 'ה-AI חושב בממלכה... 🧠' : 'צור חידון עכשיו! ✨'}
          </button>
        </div>

        {quiz && (
          <div className="mt-12 p-6 bg-green-50 rounded-3xl border-2 border-green-200">
            <h2 className="text-2xl font-bold text-green-700 mb-4">
              החידון מוכן! ✅
            </h2>
            {/* כאן יוצגו השאלות שה-AI יצר */}
            <p className="text-gray-600 italic font-bold">
              השאלות נוצרו בהצלחה מהטקסט שלך.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
