import express, { Request, Response } from "express";

import { userRoutes } from "./routes/userRoutes";
import { workoutRoutes } from "./routes/workoutRoutes";
import { exerciseRoutes } from "./routes/exerciseRoutes";

const app = express();

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Powerful API is running!!");
});

// User Routes
app.use("/api/user", userRoutes);

// Workout Routes
app.use("/api/workout", workoutRoutes);

// Exercise Routes
app.use("/api/exercise", exerciseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
