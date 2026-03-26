import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Clock, Award, Trophy, Play, RefreshCw } from 'lucide-react';

export const WordSearchEngine = (props: any) => {
  const GRID_SIZE = { x: 14, y: 10 };
  const lastWordsRef = useRef<string>("");
  const timerRef = useRef<any>(null);

  const [wordsToFind, setWordsToFind] = useState<string[]>([]);
  const [grid, setGrid] = useState<string[][]>([]);
  const [gridReady, setGridReady] = useState(false);
  const [gridKey, setGridKey] = useState(0); 

  const [selectedCells, setSelectedCells] = useState<number[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [foundCells, setFoundCells] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(90);
  const [isDragging, setIsDragging] = useState(false);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'won' | 'lost'>('idle');
  const [feedback, setFeedback] = useState<'correct' | 'wrong' | null>(null);

  const getWords = useCallback((input: any) => {
    try {
      const words = input?.data?.game_data?.game_data?.words || input?.data?.game_data?.words || input?.words;
      if (Array.isArray(words)) return words.map(w => String(w).trim()).filter(w => w.length > 1);
    } catch (e) {}
    return [];
  }, []);

  // פונקציה שמנסה לייצר לוח מושלם שכולל את כ-ל המילים
  const generatePerfectGrid = useCallback((currentWords: string[]) => {
    if (!currentWords || currentWords.length === 0) return [];

    let attemptsToCreateGrid = 0;
    const alphabet = 'אבגדהוזחטיכלמנסעפצקרשת';

    while (attemptsToCreateGrid < 50) { // ניסיונות לייצר לוח שלם
      const newGrid = Array(GRID_SIZE.y).fill(null).map(() => Array(GRID_SIZE.x).fill(''));
      let allWordsPlaced = true;

      for (const word of currentWords) {
        let wordPlaced = false;
        let wordAttempts = 0;

        while (!wordPlaced && wordAttempts < 100) {
          const isHorizontal = Math.random() > 0.5;
          const maxR = isHorizontal ? GRID_SIZE.y - 1 : GRID_SIZE.y - word.length;
          const maxC = isHorizontal ? GRID_SIZE.x - word.length : GRID_SIZE.x - 1;

          if (maxR >= 0 && maxC >= 0) {
            const r = Math.floor(Math.random() * (maxR + 1));
            const c = Math.floor(Math.random() * (maxC + 1));
            let canPlace = true;

            for (let i = 0; i < word.length; i++) {
              const cr = isHorizontal ? r : r + i;
              const cc = isHorizontal ? c + i : c;
              if (newGrid[cr][cc] !== '' && newGrid[cr][cc] !== word[i]) {
                canPlace = false;
                break;
              }
            }

            if (canPlace) {
              for (let i = 0; i < word.length; i++) {
                newGrid[isHorizontal ? r : r + i][isHorizontal ? c + i : c] = word[i];
              }
              wordPlaced = true;
            }
          }
          wordAttempts++;
        }

        if (!wordPlaced) {
          allWordsPlaced = false;
          break;
        }
      }

      if (allWordsPlaced) {
        // מילוי אותיות אקראיות רק אם כל המילים נכנסו
        for (let r = 0; r < GRID_SIZE.y; r++) {
          for (let c = 0; c < GRID_SIZE.x; c++) {
            if (newGrid[r][c] === '') newGrid[r][c] = alphabet[Math.floor(Math.random() * alphabet.length)];
          }
        }
        return newGrid;
      }
      attemptsToCreateGrid++;
    }
    return []; 
  }, []);

  const resetGameFull = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    const newGrid = generatePerfectGrid(wordsToFind);
    if (newGrid.length > 0) {
      setGrid(newGrid);
      setGridKey(prev => prev + 1);
      setFoundWords([]);
      setFoundCells([]);
      setScore(0);
      setTimeLeft(90);
      setGameState('idle');
    }
  }, [wordsToFind, generatePerfectGrid]);

  useEffect(() => {
    const newWords = getWords(props);
    if (newWords.length > 0 && JSON.stringify(newWords) !== lastWordsRef.current) {
      lastWordsRef.current = JSON.stringify(newWords);
      setWordsToFind(newWords);
      const firstGrid = generatePerfectGrid(newWords);
      if (firstGrid.length > 0) {
        setGrid(firstGrid);
        setGridReady(true);
        setGameState('idle');
      }
    }
  }, [props, getWords, generatePerfectGrid]);

  const handleMouseUp = () => {
    if (!isDragging || gameState !== 'playing') return;
    setIsDragging(false);
    const word = selectedCells.map(i => grid[Math.floor(i/GRID_SIZE.x)][i%GRID_SIZE.x]).join('');
    const target = wordsToFind[foundWords.length];
    if (word === target || word.split('').reverse().join('') === target) {
      const newFound = [...foundWords, target];
      setScore(s => s + 10);
      setFoundWords(newFound);
      setFoundCells(c => [...c, ...selectedCells]);
      setFeedback('correct');
      setTimeout(() => setFeedback(null), 600);
      if (newFound.length === wordsToFind.length) setGameState('won');
    } else if (selectedCells.length > 1) {
      setFeedback('wrong');
      setTimeout(() => setFeedback(null), 600);
    }
    setSelectedCells([]);
  };

  useEffect(() => {
    if (gameState === 'playing') {
      timerRef.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) { setGameState('lost'); return 0; }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [gameState]);

  if (!gridReady || grid.length === 0) return null;

  return (
    <div key={gridKey} className={`fixed inset-0 w-full h-full bg-[#02040a] text-white select-none overflow-hidden flex flex-col pt-[120px] ${feedback === 'wrong' ? 'animate-shake' : ''}`} dir="rtl" onMouseUp={handleMouseUp}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#0f172a_0%,#02040a_100%)]" />
      
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col pb-8 px-4 h-full max-h-[85vh]">
        <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-600 rounded-[3.2rem] blur-sm opacity-40 animate-rgb-spin -z-10" />
        
        <div className="relative flex flex-col flex-1 w-full bg-slate-900/95 rounded-[3rem] border border-white/10 shadow-3xl overflow-hidden p-6">
           <div className="flex justify-between items-center mb-6 shrink-0">
              <div className="bg-black/40 px-5 py-2 rounded-full border border-white/5 flex gap-2">
                <Clock className={timeLeft < 20 ? 'text-red-500 animate-pulse' : 'text-blue-400'} size={20} />
                <span className="text-xl font-black tabular-nums">{timeLeft}s</span>
              </div>
              <div className="bg-white/5 border border-white/10 px-8 py-3 rounded-2xl text-center">
                <span className="text-xs text-blue-400 font-bold block">חפש:</span>
                <span className="text-3xl font-black text-white">{wordsToFind[foundWords.length] || "נצחון!"}</span>
              </div>
              <div className="bg-black/40 px-5 py-2 rounded-full border border-white/5 flex gap-2">
                <Award className="text-emerald-400" size={20} />
                <span className="text-xl font-black">{score}</span>
              </div>
           </div>

           <div className="flex-1 relative min-h-0 bg-black/30 rounded-[2.5rem] p-3 border border-white/5 overflow-hidden flex items-center justify-center">
              <div className={`grid w-full h-full gap-1 transition-all duration-500 ${gameState !== 'playing' ? 'blur-3xl opacity-5' : ''}`}
                style={{ gridTemplateColumns: `repeat(${GRID_SIZE.x}, 1fr)`, gridTemplateRows: `repeat(${GRID_SIZE.y}, 1fr)` }}>
                {grid.flat().map((letter, i) => (
                  <div key={i} 
                    onMouseDown={() => { if(gameState==='playing'){setIsDragging(true); setSelectedCells([i]);} }}
                    onMouseEnter={() => { if(isDragging) setSelectedCells(prev => [...prev, i]); }}
                    className={`flex items-center justify-center text-xl sm:text-2xl md:text-4xl font-black rounded-lg transition-all cursor-crosshair
                      ${foundCells.includes(i) ? 'bg-emerald-500 text-white shadow-lg' : 
                        selectedCells.includes(i) ? 'bg-blue-600 text-white z-10 scale-105 shadow-xl' : 'text-slate-500 hover:text-slate-200'}
                    `}>
                    {letter}
                  </div>
                ))}
              </div>

              {gameState !== 'playing' && (
                <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
                   <div className="bg-slate-900/90 backdrop-blur-md border border-white/10 p-12 rounded-[3.5rem] flex flex-col items-center shadow-3xl text-center max-w-sm">
                      <Trophy className="text-yellow-400 mb-4 animate-bounce" size={60} />
                      <h2 className="text-4xl font-black mb-10">{gameState === 'won' ? 'ניצחון!' : gameState === 'lost' ? 'תם הזמן!' : 'מוכן?'}</h2>
                      <button onClick={resetGameFull} 
                              className="w-full py-6 bg-blue-600 rounded-full font-black text-2xl hover:scale-110 active:scale-95 shadow-2xl transition-all flex items-center justify-center gap-3">
                        <RefreshCw size={24}/>
                        נסה שוב
                      </button>
                   </div>
                </div>
              )}
           </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes rgb-spin { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }
        .animate-rgb-spin { animation: rgb-spin 10s linear infinite; }
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-6px); } 75% { transform: translateX(6px); } }
        .animate-shake { animation: shake 0.1s ease-in-out infinite; }
      `}</style>
    </div>
  );
}