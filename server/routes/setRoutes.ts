import express from "express";
import {
  createSet,
  deleteSetById,
  getAllSets,
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

export { router as setRoutes };
