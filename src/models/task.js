import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    title: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required: true
    },
    assign_to: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: "user",
        required: true,
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
         ref: "user",
        required: true
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ['pending', 'cancle','success']
    },
}, { timestamps: true })
export const Task = mongoose.model('task', UserSchema)
