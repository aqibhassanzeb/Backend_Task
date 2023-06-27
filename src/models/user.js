import mongoose from 'mongoose'
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    status: {
        type: String,
        required: true,
        enum: ['teacher', 'student']
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    
    isActive: {
        type: Boolean,
        default: true
    },
    email_verified: {
        type: Boolean,
        default: false
    },
}, { timestamps: true })
export const User = mongoose.model('user', UserSchema)
