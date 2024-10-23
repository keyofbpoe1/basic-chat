import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

const Multiplayer = () => {
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
        router.push(`/multiplayer/${room}`);
    };

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mt-8">Game Rooms</h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    createRoom();
                }}
                className="flex flex-col items-center mt-4"
            >
                <div className="flex items-center" style={{ alignItems: 'baseline' }}>
                    <input
                        type="text"
                        value={room}
                        onChange={(e) => setRoom(e.target.value)}
                        placeholder="Room name"
                        className="p-2 border-2 border-gray-300 rounded-lg text-gray-800 mr-2"
                    />
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="p-2 border-2 border-gray-300 rounded-lg mt-2 text-gray-800"
                    >
                        <option value="public">Public</option>
                        <option value="private">Private</option>
                    </select>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white font-bold mt-4 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                >
                    Create Room
                </button>
            </form>
            <h2 className="text-1xl font-bold mt-8">Active Public Game Rooms</h2>
            <ul className="list-disc pl-8 mt-4">
                {activeRooms
                    .filter(({ type }) => type === 'public')
                    .map(({ room }, index) => (
                        <li
                            key={index}
                            onClick={() => router.push(`/multiplayer/${room}`)}
                            className="cursor-pointer"
                        >
                            {room}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Multiplayer;
