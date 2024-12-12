import React, { useState } from 'react';

/**
 * UsernameForm component allows the user to input and submit their username.
 *
 * This component renders a form with a text input field and a submit button.
 * When the form is submitted, it calls the `setUsername` function passed via props
 * with the current input value and then clears the input field.
 *
 * @param {Object} props
 * @param {function} props.setUsername - A function to set the username, called with
 *                                        the input value upon form submission.
 *
 * @returns {JSX.Element} A form element with an input field and a submit button.
 */
export default function UsernameForm({ setUsername }: { setUsername: (username: string) => void }) {
    const [inputValue, setInputValue] = useState('');

    /**
     * Handles the form submission by preventing the default event behavior,
     * setting the username using the `setUsername` function passed via props,
     * and clearing the input field.
     *
     * @param {React.FormEvent<HTMLFormElement>} event - The form event.
     */
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
