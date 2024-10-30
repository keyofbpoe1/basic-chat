'use client';

import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BingoCard from '@/app/components/bingocard';
import UsernameForm from '@/app/components/usernameform';

const socket = io();

const RoomPage = () => {
  const [username, setUsername] = useState('');
  const [isGameWon, setIsGameWon] = useState(false);
  const [winner, setWinner] = useState<string | null>(null);
  const [winningValues, setWinningValues] = useState<string[]>([]);
  const [winnerMessage, setWinnerMessage] = useState<string | null>(null);
  const [gameEnded, setGameEnded] = useState(false);

  useEffect(() => {
    if (username) {
      // Join room and listen for events
      socket.emit('joinRoom', { room: 'someRoom', username });

      socket.on('gameEnded', (data: { winnerName: string, winningValues: string[] }) => {
        console.log('Game ended data:', data);
        setWinner(data.winnerName);
        setGameEnded(true);
        setIsGameWon(true);
        setWinningValues(data.winningValues);
      });

      socket.on('winnerAnnouncement', (message) => {
        setWinnerMessage(message);
      });

      return () => {
        socket.emit('leaveRoom', { room: 'someRoom', username });
        socket.off('winnerAnnouncement');
      };
    }
  }, [username]);

  const handleWin = (values: string[]) => {
    if (socket) {
        console.log('isGameWon prev:', isGameWon);
        
        console.log('winner:', username);
        
        console.log("Bingo! Winning values:", values);
    //   setIsGameWon(true);
    //   setWinningValues(values);
      socket.emit('winGame', { username, winningValues: values });
      console.log('isGameWon post:', isGameWon);
    //   socket.emit('winnerAnnouncement', `${username} has won the game!`);
    }
  };

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        {!username && <UsernameForm setUsername={setUsername} />}
        {isGameWon && (
          <div className="text-center mb-4">
            <h1 className="text-3xl font-bold">You Win!</h1>
            <p className="mt-2">Winning fallacies: {winningValues.join(', ')}</p>
          </div>
        )}
        {winnerMessage && <div className="text-green-600 text-xl font-bold">{winnerMessage}</div>}
        {username && <BingoCard onWin={handleWin} disabled={isGameWon} winningValues={winningValues} />}
      </main>
    </>
  );
};

export default RoomPage;

