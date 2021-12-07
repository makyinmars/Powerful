import express from "express";
import {
  createSet,
  deleteSetById,
  getAllSets,
  getSetById,
  updateSetById,
} from "../controllers/setController";

const router = express.Router();

router.route("/").post(createSet).get(getAllSets);
router.route("/:id").get(getSetById).put(updateSetById).delete(deleteSetById);

export { router as setRoutes };
