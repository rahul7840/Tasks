const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
app.use(cors());
const { Server } = require('socket.io');
const { on } = require('events');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"], 
    }
});

io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.ids}`)

    socket.on("send_messge", (data)=>{
        socket.broadcast.emit("recevie_message", data)
    })
    
     
})

app.get("/", (req, res) => {
    res.send("boom its working");
});

server.listen(3001, () => {
    console.log("server is running..");
}); 