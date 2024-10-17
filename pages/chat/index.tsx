import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const Home = () => {
    const router = useRouter();
    const [room, setRoom] = useState('');
    const [type, setType] = useState('public');
    const [activeRooms, setActiveRooms] = useState<{ room: string; type: string }[]>([]);

    useEffect(() => {
        // Fetch active rooms from the server
        const fetchRooms = async () => {
            const response = await fetch('/api/rooms');
            const data = await response.json();
            setActiveRooms(data.rooms);
        };

        fetchRooms();

        socket.on('activeRooms', (rooms: { room: string; type: string }[]) => {
            setActiveRooms(rooms);
        });

        return () => {
            socket.off('activeRooms');
        };
    }, []);

    const createRoom = () => {
        socket.emit('createRoom', { room, type });
        router.push(`/chat/${room}`);
    };

    return (
        <div>
            <h1>Chat App</h1>
            <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                placeholder="Room name"
            />
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="public">Public</option>
                <option value="private">Private</option>
            </select>
            <button onClick={createRoom}>Create Room</button>
            <h2>Active Public Chat Rooms</h2>
            <ul>
                {activeRooms
                    .filter(({ type }) => type === 'public')
                    .map(({ room }, index) => (
                        <li key={index} onClick={() => router.push(`/chat/${room}`)}>
                            {room}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Home;
