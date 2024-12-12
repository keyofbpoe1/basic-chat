import React from 'react';
import Link from 'next/link';

/**
 * A component that renders the navigation bar at the top of the page.
 *
 * The navbar contains links to the home page, the multiplayer page, and
 * the about page. It does not contain a link to the chat page.
 *
 * The navbar is a dark gray color with white text and is centered on the
 * page.
 */
const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-xl font-bold">
          Fallacy Bingo!
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/" className="text-white hover:text-gray-300">
              Home
            </Link>
          </li>
          <li>
            <Link href="/multiplayer" className="text-white hover:text-gray-300">
              Play With Friends
            </Link>
          </li>
          <li>
            <Link href="/about" className="text-white hover:text-gray-300">
              About
            </Link>
          </li>
          {/* <li>
            <Link href="/chat" className="text-white hover:text-gray-300">
              Chat
            </Link>
          </li> */}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;