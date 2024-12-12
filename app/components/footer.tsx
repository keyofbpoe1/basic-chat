'use client';

import React from "react";
import Share from '@/app/components/share';

/**
 * Footer component to be used as the last element in a page.
 *
 * Has a copyright notice and a button to share the page.
 *
 * @param {Object} props
 * @param {string} [props.className] - the class name to apply to the footer
 * @returns {React.ReactElement}
 */
export default function Footer({ className }: { className?: string }) {
  const [showShareModal, setShowShareModal] = React.useState(false);


/**
 * Handler function to set the state for displaying the share modal.
 *
 * When invoked, this function sets the `showShareModal` state to `true`,
 * causing the share modal to be displayed on the screen.
 */
  const handleShareClick = () => {
    setShowShareModal(true);
  };

  return (
    <div className="mt-auto">
      <footer className="absolute bottom-0 w-full bg-gray-800 p-4 text-center text-white">
        <div className="flex justify-center">
          <p>&copy; {new Date().getFullYear()} Fallacy Bingo</p>
          <span className="mx-2">|</span>
          <button
            className="text-white"
            onClick={handleShareClick}
          >
            Share
          </button>
        </div>
        {showShareModal && <Share onClose={() => setShowShareModal(false)} />}
    </footer>
  </div>
    
  );
} 