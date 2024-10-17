'use client';

export interface ShareProps {
  onClose: () => void;
}

export default function Share({ onClose }: ShareProps) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const text = "Play Fallacy Bingo with me!";
  const twittershare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    url
  )}&text=${encodeURIComponent(text)}`;

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
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </a>
                <a
                  href={`https://www.instagram.com/direct/new/?text=${encodeURIComponent(
                    `${text} ${url}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-10 h-10 text-blue-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 3.75 9 8.5 9 4.75 0 8.5-3.75 8.5-9 0-3.87-3.13-7-7.5-7zm0 4c-1.66 0-3 1.34-3 3 0 1.66 1.34 3 3 3 1.66 0 3-1.34 3-3 0-1.66-1.34-3-3-3zm0 4c-1.25 0-2.45-.78-2.45-1.75 0-1.25.78-2.25 1.75-2.25 1.25 0 2.25.78 2.25 1.75 0 1.25-.78 2.25-1.75 2.25z"
                    />
                  </svg>
                </a>                <a
                  href={`mailto:?subject=Play Fallacy Bingo with me!&body=${url}`}
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
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
                    popup.className = "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-2 rounded text-blue-500 opacity-0";
                    popup.style.transition = "opacity 0.5s ease-in-out";
                    popup.innerText = "Link copied to clipboard!";
                    document.body.appendChild(popup);
                    setTimeout(() => {
                      popup.style.opacity = "1";
                    }, 10);
                    setTimeout(() => {
                      popup.style.opacity = "0";
                    }, 2500);
                    setTimeout(() => {
                      document.body.removeChild(popup);
                    }, 3000);
                  }}
                  className="flex items-center justify-center w-16 h-16 bg-gray-300 rounded-md"
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
