'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Link from 'next/link';

const socket = io();

    /**
     * The Chatroom component provides a UI for creating and joining chat rooms,
     * as well as sending and receiving messages in those rooms.
     *
     * The component displays a list of existing chat rooms, which is updated
     * in real-time as new rooms are created. The user can enter a room name
     * and create a new room, at which point they will be redirected to that
     * room. The user can also enter a message and send it to the room, at
     * which point it will be displayed in the room to all users who have
     * joined the room.
     *
     * The component uses the Socket.IO library to communicate with the
     * server, which is responsible for managing the chat rooms and messages.
     */
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

    /**
     * Sends a 'createRoom' event to the server to create a new room
     * with the name specified in the 'room' state variable. The user
     * is then redirected to the newly created room. The room is added
     * to the list of existing rooms.
     */
    const createRoom = () => {
        socket.emit('createRoom', room);
        router.push(`/chat/${room}`);
        setRooms((prevRooms) => [...prevRooms, room]);
    };

    /**
     * Sends a 'message' event to the server with the contents of the
     * `message` state variable. The `message` state variable is then
     * cleared.
     */
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

