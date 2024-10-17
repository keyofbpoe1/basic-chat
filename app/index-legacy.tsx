import { useRouter } from 'next/router';
import { useState } from 'react';

const Home = () => {
    const router = useRouter();
    const [room, setRoom] = useState('');

    const createRoom = () => {
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
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
};

export default Home;
