// pages/multiplayer/[room].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import BingoCard from '@/app/components/bingocard';
import Share from '@/app/components/share';
import UsernameForm from '@/app/components/usernameform';

const socket = io();

const Gameroom = () => {
  const router = useRouter();
  const { room } = router.query;
  const [showShareModal, setShowShareModal] = useState(false);
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
  const [users, setUsers] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const [gameEnded, setGameEnded] = useState(false);
  const [winnerMessage, setWinnerMessage] = useState< string | null>(null);
  const [winningValues, setWinningValues] = useState<string[]>([]);

  useEffect(() => {
    if (room && username) {
      socket.emit('joinRoom', { room, username });

      socket.on('roomData', ({ users }) => {
        setUsers(users);
      });

      socket.on('gameEnded', (data) => {
        console.log('Game ended data:', data);
        setGameEnded(true);
        setWinner(data.winnerName);
        setWinningValues(data.winningValues);
        setWinnerMessage(`${data.winnerName} has won the game!\n\nWinning values: ${data.winningValues.join(', ')}`);
      });

      socket.on('error', (errorMessage) => {
        setError(errorMessage);
      });

      return () => {
        socket.emit('leaveRoom', { room, username });
        socket.off('roomData');
        socket.off('gameEnded');
        socket.off('error');
      };
    }
  }, [room, username]);

  const handleWin = (values: string[]) => {
    if (socket && socket.connected) {
      socket.emit('winGame', { username, winningValues: values, room });
    }
  };

  const startNewGame = () => {
    setGameEnded(false);
    setWinner(null);
    setWinnerMessage(null);
    setWinningValues([]);
  };

  const handleShareClick = () => {
    setShowShareModal(true);
  };

  return (
    <main className="flex flex flex-col">
      <h1 className="text-3xl font-bold p-4 border-b-2">{room}</h1>
      {error ? (
        <div className="p-4">
          <p className="text-red-600">{error}</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push('/')}
          >
            Go back
          </button>
        </div>
      ) : !username ? (
        <UsernameForm setUsername={setUsername} />
      ) : (
        <div className="flex ">
          <div className="flex flex-col p-4 w-1/4">
            
            <div className="mb-4">
              <h2 className="text-xl font-bold">Players:</h2>
              <ul>
                {users.map((user, index) => (
                  <li
                    key={index}
                    className={`${user === username ? 'font-bold' : ''} ${user === winner ? 'text-green-600' : ''}`}
                  >
                    {user} {user === username && '(You)'} {user === winner && '(Winner!)'}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-left p-4">
              <button
                onClick={handleShareClick}
                className="bg-blue-500 text-white font-bold px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Share Game
              </button>
            </div>
          </div>
          
          <div className="flex flex-col p-4 w-1/2">
          {showShareModal && <Share onClose={() => setShowShareModal(false)} />}
{winnerMessage && (
  <div
    className="text-green-600 text-xl font-bold"
    style={{ whiteSpace: 'pre-wrap' }}
  >
    {winnerMessage}
  </div>
)}            <BingoCard
              onWin={handleWin}
              disabled={gameEnded}
              winningValues={[]}
              onrestart={startNewGame}
            />
          </div>
          
        </div>
      )}
    </main>
  );
};

export default Gameroom;

