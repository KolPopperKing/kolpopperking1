'use client';
import { useState } from 'react';

export default function MediaPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  // רשימת השמעה לדוגמה - בהמשך תוכל להוסיף כאן את הקבצים שלך
  const playlist = [
    { id: 1, title: 'סיפור לשבת', author: 'קול פופר', duration: '05:20' },
    { id: 2, title: 'פודקאסט הטכנולוגיה', author: 'הממלכה', duration: '12:45' },
    {
      id: 3,
      title: 'שיר הילדים המקפיץ',
      author: "די-ג'יי פופר",
      duration: '03:15',
    },
  ];

  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-red-50 to-orange-100 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white rounded-[3rem] shadow-2xl overflow-hidden border-4 border-red-100">
        {/* אזור הנגן המרכזי */}
        <div className="bg-red-500 p-12 text-white text-center flex flex-col items-center">
          <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center text-8xl mb-6 animate-pulse">
            📻
          </div>
          <h1 className="text-4xl font-black mb-2">עכשיו מנגן: סיפור לשבת</h1>
          <p className="text-xl opacity-90 font-bold">קול פופר - הרדיו שלכם</p>

          {/* כפתורי שליטה */}
          <div className="flex items-center gap-8 mt-8">
            <button className="text-4xl hover:scale-110 transition">⏮️</button>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white text-red-500 w-20 h-20 rounded-full flex items-center justify-center text-4xl shadow-xl hover:scale-105 active:scale-95 transition"
            >
              {isPlaying ? '⏸️' : '▶️'}
            </button>
            <button className="text-4xl hover:scale-110 transition">⏭️</button>
          </div>

          {/* פס התקדמות */}
          <div className="w-full max-w-md bg-white/30 h-3 rounded-full mt-10 overflow-hidden">
            <div className="bg-white h-full w-1/3 shadow-[0_0_10px_white]"></div>
          </div>
        </div>

        {/* רשימת השמעה */}
        <div className="p-8" dir="rtl">
          <h2 className="text-2xl font-black text-gray-800 mb-6 flex items-center gap-2">
            <span>📜</span> רשימת ההשמעה של הממלכה:
          </h2>
          <div className="space-y-3">
            {playlist.map((track) => (
              <div
                key={track.id}
                className="flex items-center justify-between p-4 rounded-2xl hover:bg-red-50 border-2 border-transparent hover:border-red-200 transition group cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <span className="bg-red-100 text-red-600 w-10 h-10 rounded-xl flex items-center justify-center font-black">
                    {track.id}
                  </span>
                  <div>
                    <div className="font-black text-gray-800 text-lg group-hover:text-red-600 transition">
                      {track.title}
                    </div>
                    <div className="text-gray-500 font-bold text-sm">
                      {track.author}
                    </div>
                  </div>
                </div>
                <div className="text-gray-400 font-mono font-bold">
                  {track.duration}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* באנר תחתון - הסבר */}
      <div className="mt-10 bg-white/50 backdrop-blur-sm p-6 rounded-3xl border border-white max-w-2xl text-center">
        <p className="text-gray-600 font-bold italic">
          הוד מעלתך, כאן הילדים יוכלו לשמוע אותך! תוכל להעלות לכאן קבצי MP3 דרך
          פאנל הניהול ששלבנו קודם.
        </p>
      </div>
    </div>
  );
}
