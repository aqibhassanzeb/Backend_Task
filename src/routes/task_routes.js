import express from "express";
const routes = express.Router();

import { createTask, taskShow } from "../controllers/student_task.js";

// routes.post('/user_signup', upload.single("pic"), userSignup)
routes.post('/task_create',  createTask)
routes.get('/task_show',  taskShow)





export default routes