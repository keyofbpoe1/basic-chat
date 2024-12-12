'use client';

export interface ShareProps {
  onClose: () => void;
}

/**
 * A modal dialog that allows users to share the current Fallacy Bingo game.
 *
 * @param {Object} props
 * @param {function} props.onClose - called when the dialog is closed
 * @returns {React.ReactElement}
 */
export default function Share({ onClose }: ShareProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = "Play Fallacy Bingo with me!";
  const twittershare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;

  /**
   * Copies the current URL to the clipboard.
   */
  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        <div className="inline-block align-bottom bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="absolute top-0 right-0 pt-4 pr-4">
            <button
              type="button"
              className="text-2xl text-gray-500 hover:text-gray-600 focus:outline-none"
              onClick={onClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3 className="text-2xl leading-6 font-medium text-white" id="modal-title">
              Share Fallacy Bingo
            </h3>
            <div className="mt-2 flex justify-center" style={{margin: '50px'}}>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <a
                  href={twittershare}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
                  title="Share to Twitter"
                >
                <svg
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none" 
                    className="w-10 h-10 text-blue-500 m-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14.286 10.179L23.022 0h-2.117l-7.762 8.83L7.147 0H0l9.37 13.354L0 24h2.117l8.533-9.747 6.544 9.747h7.447M2.881 1.563h3.384l16.073 22.176h-3.384"/
                  >
                </svg>
                </a>
                <a
                  href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(
                    `${text} ${url}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
                  title="Share to Instagram"
                >
                  <svg
                    fill="none"
                    className="w-10 h-10 text-blue-500 m-auto"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zM16 11.37a4 4 0 11-8 0 4 4 0 018 0zm1.5-4.87a1 1 0 100-2 1 1 0 000 2z"
                />  
                </svg>
                </a>


                  <a
                  href={`mailto:?subject=Play Fallacy Bingo with me!&body=${url}`}
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
                  title="Share to Email"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    copyLink();
                    const popup = document.createElement("div");
                    popup.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded text-blue-500 opacity-0 transition-opacity duration-500 z-50";
                    popup.style.zIndex = "9999";
                    popup.innerText = "Link copied to clipboard!";
                    document.body.appendChild(popup);
                    requestAnimationFrame(() => {
                      popup.classList.add("opacity-100");
                    });
                    setTimeout(() => {
                      popup.classList.remove("opacity-100");
                    }, 2500);
                    setTimeout(() => {
                      document.body.removeChild(popup);
                    }, 3000);
                  }}
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
                  title="Copy to Clipboard"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-blue-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
