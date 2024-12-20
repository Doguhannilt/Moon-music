import { Router } from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getAllUsers } from "../controller/userController.js";

const router = Router();

router.get("/", protectRoute, getAllUsers); 


export default router