import express from "express";
import { userGet, userLogin, userSignup } from "../controllers/user_auth.js";
const routes = express.Router();


routes.post('/user_signup', userSignup)
routes.post('/user_login', userLogin)
routes.get('/user', userGet)




export default routes