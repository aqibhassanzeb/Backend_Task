import { chatMessages, newChat } from "../models/chat.js";


 // creating chat 
 
 export const accessChat = async (req, res) => {
    const { teacher,student,_id } = req.body;

    if(_id){
      const isChat = await newChat.findOne({ _id: req.body._id }).populate("user",'name email status')
      if (isChat) {
        const FullChat = isChat
        return res.status(200).json({chat:FullChat,success:true});
      }
      return res.status(400).json({error:"not found",success:false})
      }
        let chatData = {
            user:[teacher,student]
        };
        const newchatdata = new newChat(chatData)
        try {
          const createdChat = await newchatdata.save();
          let createdChatId=createdChat._id
        const FullChat = await newChat.findOne({ _id: createdChatId }) .populate("user",'name email status')
          res.status(200).json({chat:FullChat,success:true});
        
      } catch (error) {
        res.status(400).json({error:"something went wrong!",success:false})
        throw new Error(error.message);
      }
  };

  // show chat 

  export const fetchChats = async (req, res) => {
    const { user } = req.query;
  
    if (!user || user === "null" || user === "undefined") {
      return res.status(422).json({ error: "user id is required",success:false });
    }
  
    try {
      const results = await newChat.find({
        $and: [{ chatEnable: true }, {readBy: { $eq: req.query.user }}]
      })
        .populate("user",'name email')
        .sort({ updatedAt: -1 });
  
      const chatIds = results.map(chat => chat._id);
      const unreadCounts = await Promise.all(
        chatIds.map(chatId =>
          chatMessages.countDocuments({
            chat: chatId,
            readBy: { $ne: Admin }
          })
        )
      );
  
      const chatsWithUnreadCount = results.map((chat, index) => ({
        ...chat.toObject(),
        unreadCount: unreadCounts[index],
      }));
  
      res.status(200).send({data:chatsWithUnreadCount,success:true});
    } catch (error) {
      res.status(400),json({error:"something went wrong!",success:false});
      throw new Error(error.message);
    }
  };
  


                                            //   messages portion  //

// sending messages 

export const sendMessage = async (req, res) => {

    const { content, chatId, sender, senderId } = req.body;
    let message
    if (!chatId) {
      return res.status(400).json({error:"chat id is required",success:false});
    }
    const checkChat = await newChat.findById({_id:chatId})
    if (checkChat.chatEnable == false) {
       await newChat.findByIdAndUpdate({_id:chatId}, { chatEnable: true })
    }
    var newMessage = {
      sender,
      content,
      chat: chatId,
      senderId
    };
    let newMessageData = new chatMessages(newMessage)
    try {
       message = await newMessageData.save()

       await newChat.findByIdAndUpdate({_id:chatId}, { latestMessage: message.content })
      res.status(200).json({message,success:true});
    } catch (error) {
     res.status(400).json({error:"something went wrong!",success:false})
    }
  };
  
//   // show all messages 
  
  export const allMessages = async (req, res) => {
    let {_id}=req.query
    if(!_id){
      return res.status(400).json({error:"user id is required"})
    }
    let filter = { readBy: { $ne: _id } };
    let {chatId}=req.params
    if(req.params.chatId) {
      filter.chat= chatId ;
    } 
    try {
       await chatMessages.updateMany( filter, { $push: { readBy: _id } });
      const messages = await chatMessages.find({ chat: req.params.chatId })
        .populate({ path: "chat", populate: { path: "user", modal: "user",select: "name email" } })
      res.status(200).json({messages,success:true});
    } catch (error) {
      res.status(400).json({error:"something went wrong !",success:false})
    }
  };
