import express from "express";
import { createProgress } from "../controllers/progressController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(auth, createProgress);

export { router as progressRoutes };
