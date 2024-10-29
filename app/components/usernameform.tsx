import React, { useState } from 'react';

export default function UsernameForm({ setUsername }: { setUsername: (username: string) => void }) {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setUsername(inputValue);
        setInputValue('');
    };

    return (
        <form onSubmit={handleSubmit} className="p-4">
            <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter your username"
                className="p-2 border-2 border-gray-300 rounded-lg text-gray-800"
            />
            <button
                type="submit"
                className="bg-green-500 text-white font-bold mt-4 ml-2 px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
                Join Game
            </button>
        </form>
    );
}
