export default function Home() {
  const categories = [
    { title: 'משחקים', icon: '🎮', color: 'bg-purple-500', link: '/games' },
    { title: 'יצירת AI', icon: '🤖', color: 'bg-blue-500', link: '/create' },
    { title: 'חידות', icon: '🧩', color: 'bg-green-500', link: '/puzzles' },
    { title: 'בדיחות', icon: '😂', color: 'bg-yellow-500', link: '/jokes' },
    { title: 'רדיו', icon: '📻', color: 'bg-red-500', link: '/media' },
    { title: 'כתבות', icon: '📰', color: 'bg-orange-500', link: '/articles' },
  ];

  return (
    <div className="min-h-screen p-6 md:p-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 mb-4 drop-shadow-sm">
          קול פופר
        </h1>
        <p className="text-xl text-gray-600 font-bold">
          הממלכה הדיגיטלית שלכם!
        </p>
      </div>

      {/* Grid Menu */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {categories.map((cat) => (
          <a
            key={cat.title}
            href={cat.link}
            className={`kid-card p-8 flex flex-col items-center justify-center text-center btn-pop`}
          >
            <span className="text-6xl mb-4">{cat.icon}</span>
            <span className="text-2xl font-black text-gray-800">
              {cat.title}
            </span>
            <div className={`w-12 h-1.5 mt-2 rounded-full ${cat.color}`}></div>
          </a>
        ))}
      </div>

      {/* Featured Section */}
      <div className="mt-20 bg-gradient-to-r from-yellow-300 to-orange-400 rounded-[3rem] p-10 text-white shadow-xl flex flex-col md:flex-row items-center justify-between max-w-5xl mx-auto">
        <div>
          <h2 className="text-4xl font-black mb-2">החידה היומית! 🧩</h2>
          <p className="text-xl font-bold opacity-90">
            מי הוא זה שיש לו שיניים ולא יכול לנשוך?
          </p>
        </div>
        <button className="mt-6 md:mt-0 bg-white text-orange-500 px-10 py-4 rounded-full font-black text-xl shadow-lg hover:bg-gray-100 btn-pop">
          לפתרון החידה
        </button>
      </div>
    </div>
  );
}
