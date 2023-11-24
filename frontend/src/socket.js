
import io from 'socket.io-client';
// JWT
// Connect to Socket.IO server
let socket = null;

const connect = (token) => {
    socket = io('http://localhost:3000', {
        auth: {
            token: token
        }
    });
    socket.on('connect', () => {
        console.log('Connected to the server');
    });

    socket.on('connect_error', (error) => {
        console.error('Connection failed:', error);
    });
}

const disconnect = () => {
    if (socket) {
        socket.disconnect();
    }
}



export { socket, connect, disconnect };