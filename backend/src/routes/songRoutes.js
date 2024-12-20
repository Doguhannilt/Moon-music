import { Router } from "express";
import { getAllSongs, getFeaturedSongs, getMadeForYou, getTrendingSongs } from "../controller/songController.js";
import { protectRoute, requireAdmin } from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", protectRoute, requireAdmin, getAllSongs);
router.get("/featured", getFeaturedSongs);
router.get("/made-for-you", getMadeForYou);
router.get("/trending", getTrendingSongs);


export default router