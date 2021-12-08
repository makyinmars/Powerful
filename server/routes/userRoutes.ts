import express from "express";

import {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
} from "../controllers/userController";
import { auth, admin } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", auth, admin, getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/:id")
  .get(auth, getUserById)
  .put(auth, updateUserById)
  .delete(auth, deleteUserById);

export { router as userRoutes };
