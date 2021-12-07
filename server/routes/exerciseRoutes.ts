import express from "express";
import {
  createExercise,
  deleteExerciseById,
  getAllExercises,
  getExerciseById,
  updateExerciseById,
} from "../controllers/exerciseController";

const router = express.Router();

router.route("/").post(createExercise).get(getAllExercises);
router
  .route("/:id")
  .get(getExerciseById)
  .put(updateExerciseById)
  .delete(deleteExerciseById);

export { router as exerciseRoutes };
