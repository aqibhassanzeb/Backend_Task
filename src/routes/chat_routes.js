import express  from "express";
import { accessChat, allMessages, fetchChats, sendMessage } from "../controllers/chat_controller.js";
const routes=express.Router();



routes.put('/chat_access', accessChat )
routes.get('/fetch_chats', fetchChats )
routes.put('/send_message', sendMessage )
routes.put('/all_messages/:chatId', allMessages )


export default routes
