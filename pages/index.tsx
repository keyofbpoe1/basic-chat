'use client';

import { useState } from 'react';
import BingoCard from '@/app/components/bingocard';

export default function Home() {
  const [isGameWon, setIsGameWon] = useState(false);
  const [winningValues, setWinningValues] = useState<string[]>([]);

  const handleWin = (values: string[]) => {
    console.log("Bingo! Winning values:", values);
    setIsGameWon(true);
    setWinningValues(values);
  };

  const startNewGame = () => {
    setIsGameWon(false);
    setWinningValues([]);
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {isGameWon && (
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">You Win!</h1>
            <p className="mt-2">Winning fallacies: {winningValues.join(', ')}</p>
          </div>
        )}
        <BingoCard onWin={handleWin} disabled={false} winningValues={winningValues} onrestart={startNewGame} />
      </main>
    </>
  );
}