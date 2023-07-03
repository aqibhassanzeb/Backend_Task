import express from "express";
const routes = express.Router();

import { createTask, taskShow } from "../controllers/student_task.js";
import { protect } from "../middleware/user_middleware.js";

routes.post('/task_create',protect,  createTask)
routes.get('/task_show',protect,  taskShow)





export default routes