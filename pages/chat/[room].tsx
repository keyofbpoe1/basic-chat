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
        <div>
            <h1>Room: {room}</h1>
            {error ? (
                <div>
                    <p>{error}</p>
                    <button onClick={() => router.push('/')}>Go back</button>
                </div>
            ) : !username ? (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    setUsername(tempusername);
                }}>
                    <input
                        type="text"
                        value={tempusername}
                        onChange={(e) => setTempUsername(e.target.value)}
                        placeholder="Enter your username"
                    />
                    <button type="submit">Join Chat</button>
                </form>
            ) : (
                <div>
                    <div>
                        <h2>Users in this room ({users.length}):</h2>
                        <ul>
                            {users.map((user, index) => (
                                <li key={index}>{user}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message"
                        />
                        <button onClick={sendMessage}>Send</button>
                    </div>
                    <div>
                        {messages.map((msg, index) => (
                            <div key={index}>
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
