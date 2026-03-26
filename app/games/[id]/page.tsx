"use client";
import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import { ChevronRight, Loader2, AlertCircle, Gamepad2 } from 'lucide-react';

// ייבוא כל המנועים מהתיקייה הייעודית
import { TriviaEngine } from '../../components/engines/TriviaEngine';
import { CodeVaultEngine } from '../../components/engines/CodeVaultEngine';
import { WordSearchEngine } from '../../components/engines/WordSearchEngine';
import { TrueFalseEngine } from '../../components/engines/TrueFalseEngine';
import { MemoryEngine } from '../../components/engines/MemoryEngine';
import { MazeLogicEngine } from '../../components/engines/MazeLogicEngine';
import { PhysicsEngine } from '../../components/engines/PhysicsEngine';
import { LogicRiddleEngine } from '../../components/engines/LogicRiddleEngine';
import { SpaceOdysseyEngine } from '../../components/engines/SpaceOdysseyEngine';
import { ConceptMatchEngine } from '../../components/engines/ConceptMatchEngine';
import { GoldCollectorEngine } from '../../components/engines/GoldCollectorEngine';
import { GhostEscapeEngine } from '../../components/engines/GhostEscapeEngine';
import { MathEngine } from '../../components/engines/MathEngine';
import { ChronoDashEngine } from '../../components/engines/ChronoDashEngine';
import { PixelArtEngine } from '../../components/engines/PixelArtEngine';
import { SoundWaveEngine } from '../../components/engines/SoundWaveEngine';
import { CipherWheelEngine } from '../../components/engines/CipherWheelEngine';
import { PatternMatrixEngine } from '../../components/engines/PatternMatrixEngine';
import { GravityFlipEngine } from '../../components/engines/GravityFlipEngine';
import { NeonRacerEngine } from '../../components/engines/NeonRacerEngine';
import { BridgeBuilderEngine } from '../../components/engines/BridgeBuilderEngine';
import { ChemLabEngine } from '../../components/engines/ChemLabEngine';
import { StarMapEngine } from '../../components/engines/StarMapEngine';
import { HiddenObjectEngine } from '../../components/engines/HiddenObjectEngine';
import { FinalBossEngine } from '../../components/engines/FinalBossEngine';
import { ScratchEngine } from '../../components/engines/ScratchEngine';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!, 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function GamePage() {
  const params = useParams();
  const [game, setGame] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGame() {
      const id = params?.id;
      if (!id) return;
      
      try {
        const { data, error: sbError } = await supabase
          .from('games')
          .select('*')
          .eq('id', id)
          .single();

        if (sbError) throw sbError;
        setGame(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchGame();
  }, [params]);

  if (loading) return (
    <div className="h-screen flex items-center justify-center bg-[#FBFBFD]">
      <Loader2 className="animate-spin text-blue-600" size={40} />
    </div>
  );

  if (error || !game) return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-white rounded-[32px] shadow-xl border border-red-50 hover:border-red-100 transition-all text-center">
      <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
      <h1 className="text-xl font-black text-slate-900 mb-2 italic uppercase">Access Denied</h1>
      <p className="text-slate-400 mb-8 font-medium">{error || "המשחק המבוקש לא נמצא בממלכה"}</p>
      <Link href="/games" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-blue-600 transition-all">
        חזרה לספריה
      </Link>
    </div>
  );

  const renderEngine = () => {
    // זיהוי לפי עמודת game_type (עברית ואנגלית)
    const type = String(game.game_type || "").toLowerCase().trim();
    const eid = String(game.engine_id || "");

    // 1. עדיפות לסקראץ'
    if (type.includes('scratch') || eid === '100') return <ScratchEngine data={game} />;

    // 2. מיפוי לפי סוג (Strings)
    const engineMap: Record<string, React.ReactNode> = {
      'trivia': <TriviaEngine data={game} />,
      'טריוויה': <TriviaEngine data={game} />,
      'escape_room': <CodeVaultEngine data={game} />,
      'חדר בריחה': <CodeVaultEngine data={game} />,
      'קוד': <CodeVaultEngine data={game} />,
      'wordsearch': <WordSearchEngine data={game} />,
      'תפזורת': <WordSearchEngine data={game} />,
      'true_false': <TrueFalseEngine data={game} />,
      'נכון / לא נכון': <TrueFalseEngine data={game} />,
      'memory': <MemoryEngine data={game} />,
      'זיכרון': <MemoryEngine data={game} />,
      'maze': <MazeLogicEngine data={game} />,
      'physics': <PhysicsEngine data={game} />,
      'riddle': <LogicRiddleEngine data={game} />,
      'חידה': <LogicRiddleEngine data={game} />,
      'space': <SpaceOdysseyEngine data={game} />,
      'matching': <ConceptMatchEngine data={game} />,
      'gold': <GoldCollectorEngine data={game} />,
      'ghost': <GhostEscapeEngine data={game} />,
      'math': <MathEngine data={game} />,
      'chrono': <ChronoDashEngine data={game} />,
      'pixel': <PixelArtEngine data={game} />,
      'sound': <SoundWaveEngine data={game} />,
      'cipher': <CipherWheelEngine data={game} />,
      'pattern': <PatternMatrixEngine data={game} />,
      'gravity': <GravityFlipEngine data={game} />,
      'neon': <NeonRacerEngine data={game} />,
      'bridge': <BridgeBuilderEngine data={game} />,
      'chem': <ChemLabEngine data={game} />,
      'star': <StarMapEngine data={game} />,
      'hidden': <HiddenObjectEngine data={game} />,
      'boss': <FinalBossEngine data={game} />,
      'פסח': <FinalBossEngine data={game} />
    };

    // 3. גיבוי לפי engine_id מספרי (אם קיים)
    const numericMap: Record<string, React.ReactNode> = {
      '1': <TriviaEngine data={game} />,
      '2': <CodeVaultEngine data={game} />,
      '3': <WordSearchEngine data={game} />,
      '4': <TrueFalseEngine data={game} />,
      '5': <MemoryEngine data={game} />,
      '6': <MazeLogicEngine data={game} />,
      '7': <PhysicsEngine data={game} />,
      '8': <LogicRiddleEngine data={game} />,
      '9': <SpaceOdysseyEngine data={game} />,
      '10': <ConceptMatchEngine data={game} />,
      '11': <GoldCollectorEngine data={game} />,
      '12': <GhostEscapeEngine data={game} />,
      '13': <MathEngine data={game} />,
      '14': <ChronoDashEngine data={game} />,
      '15': <PixelArtEngine data={game} />,
      '16': <SoundWaveEngine data={game} />,
      '17': <CipherWheelEngine data={game} />,
      '18': <PatternMatrixEngine data={game} />,
      '19': <GravityFlipEngine data={game} />,
      '20': <NeonRacerEngine data={game} />,
      '21': <BridgeBuilderEngine data={game} />,
      '22': <ChemLabEngine data={game} />,
      '23': <StarMapEngine data={game} />,
      '24': <HiddenObjectEngine data={game} />,
      '25': <FinalBossEngine data={game} />
    };

    return engineMap[type] || numericMap[eid] || (
      <div className="p-20 bg-white rounded-[40px] border-2 border-dashed border-slate-100 text-center shadow-inner">
        <Gamepad2 className="mx-auto mb-4 text-slate-200" size={48} />
        <p className="text-slate-300 font-black italic text-2xl uppercase tracking-tighter">System Offline</p>
        <p className="text-slate-400 mt-2 font-medium">סוג משחק "{type}" אינו מוגדר במערכת</p>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#FBFBFD] pb-20 px-6" dir="rtl">
      <header className="max-w-6xl mx-auto py-10 flex justify-between items-center">
        <Link href="/games" className="group flex items-center gap-3 text-slate-400 hover:text-blue-600 transition-all font-bold">
          <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center group-hover:border-blue-200 group-hover:bg-blue-50 transition-all shadow-sm">
            <ChevronRight size={20} />
          </div>
          <span className="italic">חזרה לספריה</span>
        </Link>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-[0.2em] mb-1">
            {game.game_type || "Generic Engine"}
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 italic uppercase tracking-tight">
            {game.title}
          </h1>
        </div>
      </header>
      
      <main className="max-w-5xl mx-auto">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
          {renderEngine()}
        </div>
      </main>
    </div>
  );
}