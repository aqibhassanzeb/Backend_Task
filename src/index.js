import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';


import './config.js';
import Auth from "./routes/auth_routes.js";
import Task from "./routes/task_routes.js";
import Chat from "./routes/chat_routes.js";
import { Server } from 'socket.io';

const app = express();
dotenv.config();

//middelwares
app.use(express.json());
app.use(cors({
    origin: true,
    credentials: true,
    defaultErrorHandler: false,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

//All APi's Endponits
app.use('/api/v1', Auth,Task,Chat)

app.use('*', (req, res) => {
    return res.status(404).json({
        message: 'Backend is running..'
    })
});

//Port
const port = process.env.PORT || 3333;
const nodeServer = app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// chat portion 

const io = new Server(nodeServer, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.FRONTEND_LINK,
    },
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id)
        socket.emit("me", userData._id)
        socket.emit("connected")
    })

    socket.on("new-message", (newMessageRecieved,recieverData) => {
        socket.in(recieverData.userId).emit("messagerecieved", newMessageRecieved);
    });


})