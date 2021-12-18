import express from "express";
import {
  createExercise,
  deleteExerciseById,
  getAllExercises,
  getAllExercisesByWorkoutId,
  getExerciseById,
  updateExerciseById,
} from "../controllers/exerciseController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(createExercise).get(auth, admin, getAllExercises);
router
  .route("/:id")
  .get(auth, getExerciseById)
  .put(auth, updateExerciseById)
  .delete(auth, deleteExerciseById);

router.get("/workout/:id", auth, getAllExercisesByWorkoutId);

export { router as exerciseRoutes };
