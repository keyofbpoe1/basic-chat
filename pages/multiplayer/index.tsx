import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NewGameRoomForm from '@/app/components/newgameroomform';

const socket = io();

    /**
     * Multiplayer page component that displays a list of active public game rooms and a form to create a new room.
     *
     * The component fetches the list of active rooms from the server and updates it in real-time as new rooms are created.
     * The user can enter a room name and create a new room, at which point they will be redirected to that room.
     * The user can also click on an existing room name to join that room.
     */
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

/**
 * Emits a 'createRoom' event to the server with the specified room name and type,
 * then navigates the user to the newly created room.
 */
    const createRoom = () => {
        socket.emit('createRoom', { room, type });
        router.push(`/multiplayer/${room}`);
    };

    return (
        <main className="flex flex flex-col">
            <h1 className="text-3xl font-bold p-4 border-b-2">Game Rooms</h1>
            <div className="flex">
                <div className="w-1/4 ml-4">
                    <h2 className="text-1xl font-bold mt-8">Active Public Game Rooms</h2>
                    <ul className="list-disc pl-8 mt-4">
                        {activeRooms
                            .filter(({ type }) => type === 'public')
                            .map(({ room }, index) => (
                                <li key={index} onClick={() => router.push(`/multiplayer/${room}`)} className="cursor-pointer">
                                    {room}
                                </li>
                            ))}
                    </ul>
                </div>
                <div className="w-1/2 mt-4">
                    <NewGameRoomForm onCreate={createRoom} />
                </div>
            </div>
            
            
        </main>
    );
};

export default Multiplayer;
