import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io();

    /**
     * A Next.js page component that displays a form to create a new
     * chat room and a list of active public chat rooms. When the form is
     * submitted, the component creates a new room and redirects the user
     * to the newly created room. The component also listens for the
     * 'activeRooms' event from the server, which is emitted when a new
     * room is created, and updates the list of active rooms accordingly.
     */
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

    /**
     * Emits a 'createRoom' event to the server with the room name and type,
     * and then redirects the user to the newly created room.
     */
    const createRoom = () => {
        socket.emit('createRoom', { room, type });
        router.push(`/chat/${room}`);
    };

    return (
        <div className="flex flex-col items-center p-8">
            <h1 className="text-4xl font-bold mt-8">Game Rooms</h1>
            <div className="flex items-center mt-4">
                <input
                    type="text"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Room name"
                    className="p-2 border-2 border-gray-300 rounded-lg text-gray-800"
                />
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="p-2 border-2 border-gray-300 rounded-lg ml-2 text-gray-800"
                >
                    <option value="public">Public</option>
                    <option value="private">Private</option>
                </select>
            </div>
            <button
                onClick={createRoom}
                className="bg-green-500 text-white font-bold mt-4 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
                Create Room
            </button>
            <h2 className="text-1xl font-bold mt-8">Active Public Game Rooms</h2>
            <ul className="list-disc pl-8 mt-4">
                {activeRooms
                    .filter(({ type }) => type === 'public')
                    .map(({ room }, index) => (
                        <li
                            key={index}
                            onClick={() => router.push(`/chat/${room}`)}
                            className="cursor-pointer"
                        >
                            {room}
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default Home;
