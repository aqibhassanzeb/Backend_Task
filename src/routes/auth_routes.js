import express from "express";
import { userGet, userLogin, userLoginwithGmail, userSignup } from "../controllers/user_auth.js";
import { protect } from "../middleware/user_middleware.js";
const routes = express.Router();


routes.post('/user_signup', userSignup)
routes.post('/user_login', userLogin)
routes.post('/user_googlelogin', userLoginwithGmail)
routes.get('/user', protect, userGet)




export default routes