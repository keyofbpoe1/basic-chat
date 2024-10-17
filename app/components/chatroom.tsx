'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const socket = io();

const Chatroom = () => {
    const router = useRouter();
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [rooms, setRooms] = useState<string[]>([]);

    useEffect(() => {
        socket.on('roomList', (rooms: string[]) => {
            setRooms(rooms);
        });

        socket.on('message', (msg: string) => {
            setMessages((prevMessages) => [...prevMessages, msg]);
        });

        socket.emit('getRoomList');

        socket.on('createRoom', (newRoom: string) => {
            setRooms((prevRooms) => [...prevRooms, newRoom]);
        });

        return () => {
            socket.off('roomList');
            socket.off('message');
            socket.off('createRoom');
        };
    }, []);

    const createRoom = () => {
        socket.emit('createRoom', room);
        router.push(`/chat/${room}`);
        setRooms((prevRooms) => [...prevRooms, room]);
    };

    const sendMessage = () => {
        socket.emit('message', message);
        setMessage('');
    };

    return (
        <div>
            <h1>Existing chat rooms:</h1>
            <ul>
                {rooms.map((room) => (
                    <li key={room}>
                        <Link href={`/chat/${room}`}>
                            <a>{room}</a>
                        </Link>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room name"
            />
            <button onClick={createRoom}>Create Room</button>
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
                    <div key={index}>{msg}</div>
                ))}
            </div>
        </div>
    );
};

export default Chatroom;

