import { Request, Response } from "express";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

// @desc    Create a new set
// @route   POST /api/set/
// @access  Private
const createSet = async (req: Request, res: Response) => {
  try {
    const { exerciseId, reps, weight } = req.body;

    const set = await prisma.set.create({
      data: {
        reps: reps,
        weight: weight,
        exercise: {
          connect: {
            id: exerciseId,
          },
        },
      },
    });

    if (set) {
      res.status(201).json(set);
    } else {
      res.status(500).json("Set not created");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(500).json(error.meta.cause);
  }
};

// @desc    Get set by id
// @route   GET /api/set/:id
// @access  Private
const getSetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const set = await prisma.set.findUnique({
      where: {
        id: id,
      },
      select: {
        weight: true,
        reps: true,
        exerciseId: true,
      },
    });

    if (set) {
      res.status(200).json(set);
    } else {
      res.status(404).json("Set not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(404).json(error.meta.cause);
  }
};

// @desc    Update set by id
// @route   PUT /api/set/:id
// @access  Private
const updateSetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { reps, weight } = req.body;

    const set = await prisma.set.update({
      where: {
        id: id,
      },
      data: {
        reps: reps,
        weight: weight,
      },
    });

    if (set) {
      res.status(200).json(set);
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(404).json(error.meta.cause);
  }
};

// @desc    Delete set by id
// @route   DELETE /api/set/:id
// @access  Private
const deleteSetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const set = await prisma.set.delete({
      where: {
        id: id,
      },
    });

    if (set) {
      res.status(200).json("Set deleted");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(404).json(error.meta.cause);
  }
};

// @desc    Get all sets
// @route   GET /api/set/
// @access  Private
const getAllSets = async (req: Request, res: Response) => {
  try {
    const sets = await prisma.set.findMany({});

    if (sets) {
      res.status(200).json(sets);
    } else {
      res.status(404).json("Sets not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }

    res.status(404).json(error.meta.cause);
  }
};

export { createSet, getSetById, updateSetById, deleteSetById, getAllSets };
