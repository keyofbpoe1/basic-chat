/**
 * The About page component.
 *
 * This component renders a page with a single heading and a centered paragraph
 * of text. The text includes links to the GitHub profile of the author and the
 * GitHub repository for the Fallacy Bingo game.
 *
 * @returns {JSX.Element} The About page component.
 */
export default function AboutPage() {
    return (
      <main className="flex flex flex-col">
        <h1 className="text-3xl font-bold p-4 border-b-2">About</h1>
        <div className="p-10 w-full text-center">
            <p>
            This website was created by{" "}
            <a href="https://github.com/keyofbpoe1" className="text-blue-600">
                Max Maisey
            </a>
            . It is a Next.js application that uses the{" "}
            <a
                href="https://github.com/keyofbpoe1/fallacy-bingo"
                className="text-blue-600"
            >
                Fallacy Bingo
            </a>{" "}
            repository.
            </p>
        </div>
        
      </main>
    );
  }