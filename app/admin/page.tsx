'use client';
import { useState } from 'react';

export default function AdminPanel() {
  // 1. הוספנו כאן את 'games' כברירת מחדל או כאופציה
  const [activeTab, setActiveTab] = useState('puzzles');

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-12" dir="rtl">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-[3rem] overflow-hidden border-4 border-purple-100">
        {/* כותרת הפאנל */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 text-white text-center">
          <h1 className="text-4xl font-black mb-2">לוח הבקרה המלכותי 👑</h1>
          <p className="opacity-80 font-bold text-lg">
            כאן אתה קובע מה יקרה בקול פופר
          </p>
        </div>

        {/* תפריט לשוניות מעודכן עם משחקים */}
        <div className="flex border-b-2 border-gray-100 bg-gray-50 flex-wrap">
          <button
            onClick={() => setActiveTab('puzzles')}
            className={`flex-1 min-w-[100px] py-4 font-black text-lg transition ${
              activeTab === 'puzzles'
                ? 'bg-white text-purple-600 border-b-4 border-purple-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🧩 חידות
          </button>
          <button
            onClick={() => setActiveTab('jokes')}
            className={`flex-1 min-w-[100px] py-4 font-black text-lg transition ${
              activeTab === 'jokes'
                ? 'bg-white text-yellow-500 border-b-4 border-yellow-500'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🤣 בדיחות
          </button>
          <button
            onClick={() => setActiveTab('articles')}
            className={`flex-1 min-w-[100px] py-4 font-black text-lg transition ${
              activeTab === 'articles'
                ? 'bg-white text-green-600 border-b-4 border-green-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            📰 כתבות
          </button>
          <button
            onClick={() => setActiveTab('games')}
            className={`flex-1 min-w-[100px] py-4 font-black text-lg transition ${
              activeTab === 'games'
                ? 'bg-white text-blue-600 border-b-4 border-blue-600'
                : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            🎮 משחקים
          </button>
        </div>

        {/* תוכן הלשוניות */}
        <div className="p-8">
          {activeTab === 'puzzles' && <PuzzleManager />}
          {activeTab === 'jokes' && <JokeManager />}
          {activeTab === 'articles' && <ArticleManager />}
          {activeTab === 'games' && <GameManager />}
        </div>
      </div>
    </div>
  );
}

// --- רכיבי הניהול (נשארים אותו דבר, רק הוספנו את GameManager) ---

function PuzzleManager() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-right">
      <h2 className="text-2xl font-black text-gray-800">הוספת חידה חדשה</h2>
      <input
        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-purple-400 outline-none font-bold"
        placeholder="מה השאלה של החידה?"
      />
      <input
        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-purple-400 outline-none"
        placeholder="מה הפתרון?"
      />
      <button className="w-full bg-purple-600 text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all">
        פרסם חידה באתר ✨
      </button>
    </div>
  );
}

function JokeManager() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-right">
      <h2 className="text-2xl font-black text-gray-800">הוספת בדיחה מצחיקה</h2>
      <textarea
        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-yellow-400 outline-none font-bold h-32"
        placeholder="כתוב כאן את הבדיחה..."
      />
      <button className="w-full bg-yellow-400 text-black font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all">
        פרסם בדיחה 🤣
      </button>
    </div>
  );
}

function ArticleManager() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-right">
      <h2 className="text-2xl font-black text-gray-800">כתיבת כתבה חדשה</h2>
      <input
        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none font-bold text-xl"
        placeholder="כותרת הכתבה"
      />
      <textarea
        className="w-full p-4 rounded-2xl border-2 border-gray-100 focus:border-green-400 outline-none h-40"
        placeholder="תוכן הכתבה המלא..."
      />
      <button className="w-full bg-green-500 text-white font-black py-4 rounded-2xl shadow-lg hover:scale-[1.01] transition-all">
        פרסם כתבה 📰
      </button>
    </div>
  );
}

function GameManager() {
  return (
    <div className="space-y-6 animate-in fade-in duration-500 text-right">
      <h2 className="text-2xl font-black text-gray-800">ניהול משחקי הממלכה</h2>
      <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
        <h3 className="font-bold text-blue-800 mb-2 text-lg underline">
          משחקים שממתינים לאישור (מילדים):
        </h3>
        <ul className="space-y-2">
          <li className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center border border-blue-100">
            <span className="text-gray-400 italic">
              בינתיים אין משחקים חדשים...
            </span>
          </li>
        </ul>
      </div>
      <button className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl shadow-lg hover:bg-blue-700 transition-all">
        הוסף משחק חדש ידנית 🕹️
      </button>
    </div>
  );
}
