const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors')

const port = 5000;

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8080", 
    methods: ["GET", "POST"]
  }
});


app.use(express.json());
app.use(cors());
app.get('/', (req, res) => {
  res.send('Hello from the server!');
});

io.on('connection', (socket) => {
  console.log('New client connected');
  
  socket.on('message', (data) => {
    console.log(`Message from client: ${data}`);
    io.emit('message', data);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
