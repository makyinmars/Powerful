import express from "express";
import {
  createSet,
  deleteSetById,
  getAllSets,
  getAllSetsByExerciseId,
  getSetById,
  updateSetById,
} from "../controllers/setController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.route("/").post(createSet).get(auth, admin, getAllSets);
router
  .route("/:id")
  .get(auth, getSetById)
  .put(auth, updateSetById)
  .delete(auth, deleteSetById);
router.get("/exercise/:id", auth, getAllSetsByExerciseId);

export { router as setRoutes };
