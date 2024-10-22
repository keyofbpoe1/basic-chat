// pages/chat/[room].tsx
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const Chatroom = () => {
    const router = useRouter();
    const { room } = router.query;
    const [username, setUsername] = useState('');
    const [tempusername, setTempUsername] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<{ username: string; message: string }[]>([]);
    const [users, setUsers] = useState<string[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        if (room && username) {
            socket.emit('joinRoom', { room, username });

            socket.on('message', (msg: { username: string; message: string }) => {
                setMessages((prevMessages) => [...prevMessages, msg]);
            });

            socket.on('roomData', ({ users }) => {
                setUsers(users);
            });

            socket.on('error', (errorMessage) => {
                setError(errorMessage);
            });

            return () => {
                socket.emit('leaveRoom', { room, username });
                socket.off('message');
                socket.off('roomData');
                socket.off('error');
            };
        }
    }, [room, username]);

    const sendMessage = () => {
        socket.emit('message', { room, message });
        setMessage('');
    };

    return (
        <div className="h-screen flex flex-col">
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
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        setUsername(tempusername);
                    }}
                    className="p-4"
                >
                    <input
                        type="text"
                        value={tempusername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        placeholder="Enter your username"
                        className="p-2 border-2 border-gray-300 rounded-lg text-gray-800"
                    />
                    <button
                        type="submit"
                        //className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        className="bg-green-500 text-white font-bold mt-4 ml-2 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                    >
                        Join Game
                    </button>
                </form>
            ) : (
                <div className="flex flex-col items-center">
                    <div className="p-4">
                        <h2 className="text-2xl">Users in this room ({users.length}):</h2>
                        <ul className="list-disc pl-8">
                            {users.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="p-4">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                            className="p-2 border-2 rounded-lg w-full"
                        />
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2"
                            onClick={sendMessage}
                        >
                            Send
                        </button>
                    </div>
                    <div className="p-4">
                        {messages.map((msg, index) => (
                            <div key={index} className="mb-2">
                                <strong>{msg.username}:</strong> {msg.message}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Chatroom;
