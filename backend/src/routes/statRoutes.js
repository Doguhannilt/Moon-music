import { Router } from "express";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";
import { getAllStats } from "../controller/statController.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllStats);

export default router;