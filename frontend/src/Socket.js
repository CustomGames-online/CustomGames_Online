import io from 'socket.io-client';
import { useState, useEffect, createElement } from 'react';

const Socket = (props) => {
  const { component } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io('http://customgames.online/websocket');
    console.log(newSocket, "hello");
    setSocket(newSocket);
  }, []);

  return <div>{createElement(component, { ...props, socket })}</div>;
};

export default Socket;
