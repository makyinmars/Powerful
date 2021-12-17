import { Request, Response } from "express";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

// @desc    Create a new exercise
// @route   POST /api/exercise/
// @access  Private
const createExercise = async (req: Request, res: Response) => {
  try {
    const { workoutId, name } = req.body;

    const exercise = await prisma.exercise.create({
      data: {
        name: name,
        workout: {
          connect: {
            id: workoutId,
          },
        },
      },
    });

    if (exercise) {
      res.status(201).json(exercise);
    } else {
      res.status(404).json("Exercise not created");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Get exercise by id
// @route   GET /api/exercise/:id
// @access  Private
const getExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exercise = await prisma.exercise.findUnique({
      where: { id: id },
      select: {
        id: true,
        name: true,
        workoutId: true,
        sets: true,
      },
    });

    if (exercise) {
      res.status(200).json(exercise);
    } else {
      res.status(404).json("Exercise not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Update exercise by id
// @route   PUT /api/exercise/:id
// @access  Private
const updateExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, sets } = req.body;

    const exercise = await prisma.exercise.update({
      where: { id: id },
      data: {
        name: name,
        sets: sets,
      },
    });

    if (exercise) {
      res.status(200).json(exercise);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @desc    Delete exercise by id
// @route   DELETE /api/exercise/:id
// @access  Private
const deleteExerciseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const exercise = await prisma.exercise.delete({
      where: { id: id },
      select: {
        id: true,
        name: true,
        workoutId: true,
        sets: true,
      },
    });

    if (exercise) {
      res.status(200).json("Exercise deleted");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

// @dec     Get all exercises
// @route   GET /api/exercise/
// @access  Private
const getAllExercises = async (req: Request, res: Response) => {
  try {
    const exercises = await prisma.exercise.findMany({});

    if (Object.keys(exercises).length > 0) {
      res.status(200).json(exercises);
    } else {
      res.status(404).json("Exercises not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).json(error.meta);
    }
  }
};

export {
  createExercise,
  getExerciseById,
  updateExerciseById,
  deleteExerciseById,
  getAllExercises,
};
