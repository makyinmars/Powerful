import express from "express";

import {
  registerUser,
  loginUser,
  getUserById,
  updateUserById,
  deleteUserById,
  getAllUsers,
} from "../controllers/userController";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);
router
  .route("/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(deleteUserById);

export { router as userRoutes };
