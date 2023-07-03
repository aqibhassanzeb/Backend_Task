import express  from "express";
import { accessChat, allMessages, fetchChats, sendMessage } from "../controllers/chat_controller.js";
import { protect } from "../middleware/user_middleware.js";
const routes=express.Router();



routes.post('/chat_access',protect, accessChat )
routes.get('/fetch_chats',protect, fetchChats )
routes.put('/send_message',protect, sendMessage )
routes.put('/all_messages/:chatId',protect, allMessages )


export default routes
