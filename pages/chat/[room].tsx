import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Socket } from 'socket.io-client';

const ChatRoom = ({ socket }: { socket: typeof Socket }) => {
  const router = useRouter();
  const { room } = router.query;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    if (room) {
      socket.emit('joinRoom', room);

      socket.on('message', (message: string) => {
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    //   socket.on('message', (message) => {
    //     setMessages((prevMessages) => [...prevMessages, message]);
    //   });

      return () => {
        socket.off('message');
      };
    }
  }, [room]);

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('message', { room, message });
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Chat Room: {room}</h1>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>{msg}</div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
