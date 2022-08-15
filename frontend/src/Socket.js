/* eslint-disable */

import io from 'socket.io-client';
import { useState, useEffect, createElement } from 'react';

const Socket = (props) => {
  const { component } = props;
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // const newSocket = io('http://customgames.online/websocket');
    const newSocket = io('localhost:3001');
    setSocket(newSocket);
  }, []);

  return <>{createElement(component, { ...props, socket })}</>;
};

export default Socket;
