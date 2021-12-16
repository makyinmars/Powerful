import express from "express";
import {
  createWorkout,
  deleteWorkoutById,
  getAllWorkouts,
  getAllWorkoutsByUserId,
  getWorkoutById,
  updateWorkoutById,
} from "../controllers/workoutController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(createWorkout).get(auth, admin, getAllWorkouts);
router
  .route("/:id")
  .get(auth, getWorkoutById)
  .put(auth, updateWorkoutById)
  .delete(auth, deleteWorkoutById);

router.get("/user/:id", auth, getAllWorkoutsByUserId);

export { router as workoutRoutes };
