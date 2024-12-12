import React, { useState, useEffect } from 'react';
import fallacies from '../../public/data/fallacies.json';
import { on } from 'events';

interface BingoCardProps {
  onWin: (winningValues: string[]) => void;
  disabled: boolean;
  winningValues: string[];
  onrestart: () => void;
}

/**
 * Generates a bingo card by randomly shuffling the fallacies data
 * and selecting the first 25 items to form the card.
 * 
 * @returns {Array} An array of 25 fallacy objects representing a bingo card.
 */
const generateBingoCard = () => {
  const shuffled = [...fallacies].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 25);
};

  /**
   * A React component that generates a bingo card by randomly shuffling
   * the fallacies data and selecting the first 25 items to form the card.
   * 
   * The component provides a button for each fallacy on the card, which
   * can be clicked to select or deselect the fallacy. The component also
   * displays a hover-over text for each fallacy, which shows the definition
   * of the fallacy. If the user selects a winning combination of fallacies,
   * the component displays a congratulatory message and a button to play
   * again. If the user is not the winner, the component displays a button
   * to generate a new game.
   * 
   * @param {{ onWin: (winningValues: string[]) => void, disabled: boolean, winningValues: string[], onrestart: () => void }} props
   * The component accepts the following props:
   * - onWin: a function that is called when the user wins the game, which
   *   takes an array of the winning fallacy names as an argument.
   * - disabled: a boolean indicating whether the game is disabled or not.
   * - winningValues: an array of the winning fallacy names.
   * - onrestart: a function that is called when the user clicks the button
   *   to play again.
   * 
   * @returns {JSX.Element} A JSX element representing the bingo card.
   */
const BingoCard: React.FC<BingoCardProps> = ({ onWin, disabled, winningValues, onrestart }) => {
  const [bingoCard, setBingoCard] = useState<typeof fallacies>([]);
  const [selectedFallacies, setSelectedFallacies] = useState<Set<string>>(new Set());
  const [winner, setWinner] = useState(false);
  const [hoveredFallacy, setHoveredFallacy] = useState<string | null>(null);

  useEffect(() => {
    setBingoCard(generateBingoCard());
  }, []);

  /**
   * Toggles a fallacy in the selected fallacies set.
   * 
   * If the fallacy is already in the set, it is removed.
   * If the fallacy is not in the set, it is added.
   * 
   * After toggling the fallacy, the component checks if the user has won
   * the game by calling the `checkWinner` function.
   * 
   * @param {string} fallacy The name of the fallacy to toggle.
   */
  const toggleFallacy = (fallacy: string) => {
    const newSelectedFallacies = new Set(selectedFallacies);
    if (selectedFallacies.has(fallacy)) {
      newSelectedFallacies.delete(fallacy);
    } else {
      newSelectedFallacies.add(fallacy);
    }
    setSelectedFallacies(newSelectedFallacies);
    checkWinner(newSelectedFallacies);
  };

/**
 * Checks if the current selection of fallacies forms a winning combination.
 *
 * The function iterates through predefined winning combinations and checks
 * if all fallacies in any combination are present in the selected set.
 * If a winning combination is found, it sets the winner state to true
 * and triggers the onWin callback with the names of the winning fallacies.
 *
 * @param {Set<string>} selected - A set of selected fallacy names.
 */
  const checkWinner = (selected: Set<string>) => {
    const winningCombinations = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    for (const combination of winningCombinations) {
      if (combination.every(index => selected.has(bingoCard[index].name))) {
        setWinner(true);
        const winningValues = combination.map(index => bingoCard[index].name);
        onWin(winningValues);
        return;
      }
    }
  };

  /**
   * Resets the game state by generating a new bingo card, clearing the
   * selected fallacies set, and resetting the winner state.
   *
   * If the `onrestart` callback is provided, it is called after resetting
   * the game state.
   */
  const resetGame = () => {
    setBingoCard(generateBingoCard());
    setSelectedFallacies(new Set());
    setWinner(false);
    setHoveredFallacy(null);
    {onrestart ? onrestart() : null};
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">Fallacy Bingo</h1>
      <div className="grid grid-cols-5 gap-2 mb-8">
        {bingoCard.map((fallacy, index) => (
          <div key={index} className="relative">
            <button
              className={`w-32 h-32 text-xs font-bold rounded p-2 ${
                selectedFallacies.has(fallacy.name)
                  ? 'bg-blue-500 text-white hover:bg-blue-700 focus:outline-none disabled:bg-blue-500 text-white'
                  : 'bg-gray-200 text-black hover:bg-gray-500 focus:outline-none disabled:bg-gray-200 text-black'
              }`}
              onClick={() => toggleFallacy(fallacy.name)}
              disabled={winner || disabled}
              onMouseEnter={() => setHoveredFallacy(fallacy.name)}
              onMouseLeave={() => setHoveredFallacy(null)}
            >
              {fallacy.name}
            </button>
            {hoveredFallacy === fallacy.name && (
              <div className="absolute z-10 bg-white text-black p-2 rounded shadow-lg text-xs w-48 top-full left-1/2 transform -translate-x-1/2 mt-2">
                {fallacy.definition}
              </div>
            )}
          </div>
        ))}
      </div>
      {winner && (
        <div className="text-2xl font-bold text-green-500 mb-4">
          Congratulations! You won!
        </div>
      )}
      <button
        className="bg-green-500 text-white font-bold px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
        onClick={resetGame}
        //disabled={disabled}
      >
        {(winner || disabled) ? 'Play Again' : 'New Game'}
      </button>
    </div>
  );
};

export default BingoCard;
