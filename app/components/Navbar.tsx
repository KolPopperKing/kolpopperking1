import Link from 'next/link';

export default function Navbar() {
  const menuItems = [
    { name: 'בית', href: '/', icon: '🏠' },
    { name: 'משחקים', href: '/games', icon: '🎮' },
    { name: 'יצירה', href: '/create', icon: '🛠️' },
    { name: 'חידות', href: '/puzzles', icon: '🧩' },
    { name: 'בדיחות', href: '/jokes', icon: '🤣' },
    { name: 'כתבות', href: '/articles', icon: '📰' },
    { name: 'מדיה', href: '/media', icon: '📻' },
    { name: 'קשר', href: '/contact', icon: '📞' },
  ];

  return (
    <nav className="sticky top-4 z-50 mx-auto max-w-6xl px-4">
      <div className="bg-white/80 backdrop-blur-md border-2 border-white shadow-xl rounded-[2rem] px-6 py-3 flex items-center justify-between transition-all hover:shadow-2xl">
        {/* לוגו הממלכה */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-lg group-hover:rotate-12 transition-transform">
            <span className="text-xl font-black">ק</span>
          </div>
          <span className="text-2xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 hidden sm:block">
            קול פופר
          </span>
        </Link>

        {/* תפריט הקישורים */}
        <div className="flex gap-2 md:gap-4 overflow-x-auto no-scrollbar py-1">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="flex items-center gap-1.5 px-4 py-2 rounded-full hover:bg-blue-50 text-gray-700 font-bold text-sm md:text-base transition-colors whitespace-nowrap active:scale-95 border border-transparent hover:border-blue-100"
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
