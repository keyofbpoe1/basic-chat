import { AppProps } from 'next/app';
import { useEffect } from 'react';
//import { io } from 'socket.io-client';
//import { io } from 'socket.io-client';
import io from 'socket.io-client';

const socket = io();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    socket.on('connect', () => {
      console.log('connected to server');
    });

    return () => {
      socket.off('connect');
    };
  }, []);

  return <Component {...pageProps} socket={socket} />;
}

export default MyApp;
