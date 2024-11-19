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
                href="https://github.com/keyofbpoe1/basic-chat"
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