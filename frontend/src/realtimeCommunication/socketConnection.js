import io from 'socket.io-client';

let socket = null

export const connectWithSocketServer = (userDetails) => {

    const jwtToken = userDetails.token
    socket = io('http://localhost:9090', {
        auth: {
            token: jwtToken
        }
    });

    socket.on('connect', () => {
        console.log('sucessfully connected with socket.io server');
        console.log(socket.id);
    })
}