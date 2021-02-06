const http = require('http');
const socketIO = require('socket.io')

// Create a http server
const server = http.createServer((req, res) => {
  res.end('I am connected!')
})

// Socket server is listening to the traffic of the http server
const io = socketIO(server, {
  cors: {
    origin: 'http://localhost:63342',
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true
  }
})

io.on('connection', socket => {
  // Send message to anyone connecting to port 8080 via ws protocol on event welcome
  socket.emit('welcome','Welcome to the websocket server!!')

  // Listen to a client sending data via an event called 'my custom event'
  socket.on('my custom event', msg => {
    console.log(msg)
  })
})

server.listen(8080)
