import { Response, Request } from "express";
import { PrismaClient, Prisma } from ".prisma/client";
import upload from "../utils/multer";
import cloudinary from "../utils/cloudinary";

const prisma = new PrismaClient();

// @desc    Create a new progress
// @route  POST /api/progress
// @access Private
const createProgress = async (req: Request, res: Response) => {
  try {
    const { userId, picture, description, weight } = req.body;

    const progress = await prisma.progress.create({
      data: {
        picture: picture,
        description: description,
        weight: weight,
        cloudinary_id: "hi",
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

// Testing express-fileupload
const test = async (req: Request, res: Response) => {
  if (req.files) {
    const image = req.files["image"];
    console.log(image);
  }

  res.status(201).json(req.files);
};

export { createProgress, test };
