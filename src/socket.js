import io from 'socket.io-client';
const sockets = io('localhost:9000/');
export default sockets;
