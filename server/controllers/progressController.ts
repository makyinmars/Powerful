import { Response, Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import cloudinary from "../utils/cloudinary";

const prisma = new PrismaClient();

// @desc    Create a new progress
// @route  POST /api/progress
// @access Private
const createProgress = async (req: Request, res: Response) => {
  try {
    // Cloudinary upload
    const result = await cloudinary.v2.uploader.upload(
      req.files["image"].tempFilePath,
      { folder: "progress" }
    );

    const { userId, description, weight } = req.body;

    const { secure_url, public_id } = result;

    const weightInt = parseInt(weight);

    const progress = await prisma.progress.create({
      data: {
        picture: secure_url,
        description: description,
        weight: weightInt,
        cloudinary_id: public_id,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    if (progress) {
      res.status(201).json(progress);
    } else {
      res.status(400).json("Progress not created");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

// @desc   Get progress by id
// @route  GET /api/progress/:id
// @access Private
const getProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const progress = await prisma.progress.findUnique({
      where: { id: id },
      select: {
        id: true,
        picture: true,
        description: true,
        weight: true,
        cloudinary_id: true,
        userId: true,
      },
    });

    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json("Progress not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

// @desc   Update progress by id
// @route  PUT /api/progress/:id
// @access Private
const updateProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.progress.findUnique({
      where: { id: id },
    });

    if (req.files) {
      // Delete old image if there is a new one
      await cloudinary.v2.uploader.destroy(user.cloudinary_id);

      // Upload new image
      const result = await cloudinary.v2.uploader.upload(
        req.files["image"].tempFilePath,
        { folder: "progress" }
      );

      req.body.picture = result.secure_url;
      req.body.cloudinary_id = result.public_id;
    }

    let weightInt: number;

    if (req.body.weight) {
      weightInt = parseInt(req.body.weight);
    } else {
      weightInt = user.weight;
    }

    const progress = await prisma.progress.update({
      where: { id: id },
      data: {
        description: req.body.description,
        picture: req.body.picture,
        weight: weightInt,
        cloudinary_id: req.body.cloudinary_id,
      },
    });

    if (progress) {
      res.status(200).json(progress);
    } else {
      res.status(404).json("Progress not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

// @desc   Delete progress by id
// @route  DELETE /api/progress/:id
// @access Private
const deleteProgressById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await prisma.progress.findUnique({
      where: { id: id },
    });

    if (user) {
      await cloudinary.v2.uploader.destroy(user.cloudinary_id);
    } else {
      res.status(404).json("User not found");
    }

    const progress = await prisma.progress.delete({
      where: { id: id },
    });

    if (progress) {
      res.status(200).json("Progress deleted");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

// @desc   Get all progress
// @route  GET /api/progress
// @access Private
const getAllProgress = async (req: Request, res: Response) => {
  try {
    const progress = await prisma.progress.findMany({});

    if (Object.keys(progress).length > 0) {
      res.status(200).json(progress);
    } else {
      res.status(404).json("Progress not found");
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
      res.status(400).send(error.meta);
    }
  }
};

export {
  createProgress,
  getProgressById,
  updateProgressById,
  deleteProgressById,
  getAllProgress,
};
