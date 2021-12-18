import { Request, Response } from "express";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

// @desc    Create a new workout
// @route   POST /api/workout
// @access  Private
const createWorkout = async (req: Request, res: Response) => {
  try {
    const { userId, name } = req.body;

    const workout = await prisma.workout.create({
      data: {
        name: name,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (workout) {
      res.status(201).json(workout);
    } else {
      res.status(404).json("Workout not created");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Get workout by id
// @route   GET /api/workout/:id
// @access  Private
const getWorkoutById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const workout = await prisma.workout.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        userId: true,
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    if (workout) {
      res.status(200).json(workout);
    } else {
      res.status(404).json("Workout not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Update workout by id
// @route   PUT /api/workout/:id
// @access  Private
const updateWorkoutById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, exercises } = req.body;

    const workout = await prisma.workout.update({
      where: {
        id: id,
      },
      data: {
        name: name,
        exercises: exercises,
      },
    });

    if (workout) {
      res.status(200).json(workout);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Delete workout by id
// @route   DELETE /api/workout/:id
// @access  Private
const deleteWorkoutById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const workout = await prisma.workout.delete({
      where: {
        id: id,
      },
    });

    if (workout) {
      res.status(200).json("Workout deleted");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc Get all workouts by user id
// @route GET /api/workout/user/:id
// @access Private
const getAllWorkoutsByUserId = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const workouts = await prisma.workout.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        exercises: {
          include: {
            sets: true,
          },
        },
      },
    });

    if (Object.keys(workouts).length > 0) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json("Exercises not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

// @desc    Get all workouts
// @route   GET /api/workout
// @access  Private
const getAllWorkouts = async (req: Request, res: Response) => {
  try {
    const workouts = await prisma.workout.findMany({});

    if (Object.keys(workouts).length > 0) {
      res.status(200).json(workouts);
    } else {
      res.status(404).json("Workouts not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

export {
  createWorkout,
  getWorkoutById,
  updateWorkoutById,
  deleteWorkoutById,
  getAllWorkoutsByUserId,
  getAllWorkouts,
};
