import { User } from "../models/user.js"
import bycrypt from 'bcryptjs'
import jwt from "jsonwebtoken";



export const userSignup = async(req, res) => {
    const { status, email, password, name } = req.body
    if (!status || !email || !password || !name) {
        return res.status(422).json({ error: "please fill all the fields " })
    }
    try {   

    let user_find = await User.findOne({ email })
        if (user_find) {
            return res.status(422).json({ message: 'already registered' })
        }
    let hashedpassword= await bycrypt.hash(password, 12)
            const user = new User({...req.body, password: hashedpassword})
            let saved_user = user.save()
            if(saved_user){
                  res.json({ message: "register successfully" })
            }
            } catch (error) {
                return res.status(400).json({ error: 'something went wrong !' })
            }
}



export const userLogin = async(req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(422).json({ error: "email and password required" })
    }
   let user_find = await User.findOne({ email: email })
            if (!user_find) {
                return res.status(422).json({ error: "invalid email or password " })
            }
            bycrypt.compare(password, user_find.password)
                .then(doMatch => {
                    if (doMatch) {
                        const token = jwt.sign({ _id: user_find._id }, process.env.JWT_SECRET)
                        user_find.password = undefined
                        res.json({ message: "Successfull Login", token, user: user_find })
                    } else {
                        return res.status(422).json({ error: 'invalid email or password' })
                    }
                })
       
}

export const userGet = async (req, res) => {
    let filter = {}
    if (req.query._id) {
        filter = { _id: req.query._id.split(','), isActive: true }
    }
    try {
        let result = await User.find(filter)
        res.json({ success: true, data: result })
    } catch (error) {
        res.status(400).json({ error: "something went wrong!" })

    }

}