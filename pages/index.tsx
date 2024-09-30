import Link from 'next/link';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Chat App</h1>
      <ul>
        <li>
          <Link href="/chat/room1">Chat Room 1</Link>
        </li>
        <li>
          <Link href="/chat/room2">Chat Room 2</Link>
        </li>
      </ul>
    </div>
  );
};

export default Home;
