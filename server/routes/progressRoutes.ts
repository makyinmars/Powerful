import express from "express";
import {
  createProgress,
  deleteProgressById,
  getAllProgress,
  getProgressById,
  updateProgressById,
} from "../controllers/progressController";
import { auth } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(auth, createProgress).get(auth, getAllProgress);
router
  .route("/:id")
  .get(auth, getProgressById)
  .put(auth, updateProgressById)
  .delete(auth, deleteProgressById);

export { router as progressRoutes };
