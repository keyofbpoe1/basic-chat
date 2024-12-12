'use client';

import { useState } from 'react';
import BingoCard from '@/app/components/bingocard';

/**
 * The home page of the app, which displays a single bingo card that can be played.
 * When the user wins the game, the page displays a congratulatory message with the
 * winning fallacies listed.
 *
 * The page also has a button to start a new game, which resets the game state
 * and displays a fresh bingo card.
 *
 * @returns {JSX.Element} The JSX element representing the home page.
 */
export default function Home() {
  const [isGameWon, setIsGameWon] = useState(false);
  const [winningValues, setWinningValues] = useState<string[]>([]);

/**
 * Handles the win event by updating the game state.
 *
 * This function is called when the user wins the game. It logs the winning
 * values to the console, sets the game state to won, and updates the list
 * of winning fallacies.
 *
 * @param {string[]} values - An array of the winning fallacy names.
 */
  const handleWin = (values: string[]) => {
    console.log("Bingo! Winning values:", values);
    setIsGameWon(true);
    setWinningValues(values);
  };

/**
 * Starts a new game by resetting the game state.
 *
 * This function sets the game state to not won and clears the list
 * of winning fallacies, effectively restarting the game with a fresh
 * bingo card.
 */
  const startNewGame = () => {
    setIsGameWon(false);
    setWinningValues([]);
  };

  return (
    <>
      <main className="flex flex-col items-center justify-center">
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