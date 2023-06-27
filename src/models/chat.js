import mongoose from "mongoose";


            // newChat schema 

const chatCreatSchema=new mongoose.Schema(
    {
        user: [ {type: mongoose.Schema.Types.ObjectId,ref:"user"} ],
        latestMessage: {
          type: String 
        },
        chatEnable:{
          type:Boolean,
          default:false
        },
        isActive:{
            type:Boolean,
            default:true
        }
      },
      { timestamps: true }
)
export const newChat=new mongoose.model('newChat',chatCreatSchema) 

    //   messages schema 

const messageSchema = mongoose.Schema(
    {
      sender: { type: String },
      content: { type: String, trim: true },
      senderId:{type:String},
      chat: { type: mongoose.Schema.Types.ObjectId, ref: "newChat" },
      readBy: [],
    },
    { timestamps: true }
  );
  
 export const chatMessages =new mongoose.model("Messages", messageSchema);
