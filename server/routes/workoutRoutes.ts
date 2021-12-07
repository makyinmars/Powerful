import express from "express";
import {
  createWorkout,
  deleteWorkoutById,
  getAllWorkouts,
  getWorkoutById,
  updateWorkoutById,
} from "../controllers/workoutController";

const router = express.Router();

router.route("/").post(createWorkout).get(getAllWorkouts);
router
  .route("/:id")
  .get(getWorkoutById)
  .put(updateWorkoutById)
  .delete(deleteWorkoutById);

export { router as workoutRoutes };
