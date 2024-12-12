import React, { useState } from 'react';
import { useRouter } from 'next/router';
import io from 'socket.io-client';

const socket = io();

type RoomType = 'public' | 'private';

type RoomData = {
  roomName: string;
  roomType: RoomType;
};

type CreateRoomFn = (data: RoomData) => void;

/**
 * A form component for creating a new game room.
 *
 * The form has two input fields - a text input for the room name and a
 * select input for the room type (public or private). When the form is
 * submitted, the component emits a 'createRoom' event to the server with
 * the room data, and then redirects the user to the newly created room.
 *
 * @param {{ onCreate: CreateRoomFn }} props
 * @prop {CreateRoomFn} onCreate - a callback function to be called when the form is submitted.
 * The function should emit a 'createRoom' event to the server with the room data.
 * @returns {JSX.Element} - a form component with input fields and a submit button.
 */
const NewGameRoomForm = ({ }: { onCreate: CreateRoomFn }) => {
    const router = useRouter();
    const [room, setRoom] = useState('');
    const [type, setType] = useState('public');

  /**
   * Sends a 'createRoom' event to the server with the room data, and then redirects the user to the newly created room.
   *
   * This function is called when the form is submitted. It uses the socket.io client to emit a 'createRoom'
   * event to the server with the room data, and then redirects the user to the newly created room using the
   * Next.js router.
   */
  const createRoom = () => {
    socket.emit('createRoom', { room, type });
    router.push(`/multiplayer/${room}`);
};

  return (
    <form
        onSubmit={(e) => {
            e.preventDefault();
            createRoom();
        }}
        className="flex flex-col items-center mt-4"
    >
        <h2 className="text-xl font-bold mb-4">Create a New Game Room</h2>
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
  );
};

export default NewGameRoomForm;
