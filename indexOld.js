// Servidor de express
//const app = require('express')();
const express = require('express');
const app = express();

// Servidor de sockets
const server = require('http').createServer(app);

// Configuarciones sockets server
const io = require('socket.io')(server);

// Desplegar directorio publico
app.use(express.static(__dirname + '/public'))

io.on('connection', (socket) => { 
    console.log('Cliente conectado',{socket: socket.id})
    // socket.emit('mensaje-from-server', {
    //     msg:'Bienvenido al server socket',
    //     date: new Date()
    // })
   
    socket.on('mensaje-to-server', (data) => {
        console.log({data});  
        socket.emit('mensaje-from-server', data)
      });
      
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });

 });

server.listen(8080, () => {
    console.log('Server corriendo en puerto:8080')}
);