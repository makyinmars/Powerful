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
    // Cloudinary upload
    const result = await cloudinary.v2.uploader.upload(
      req.files["image"].tempFilePath,
      { folder: "progress" }
    );

    const { userId, description, weight } = req.body;

    const weightInt = parseInt(weight);

    const progress = await prisma.progress.create({
      data: {
        picture: result.secure_url,
        description: description,
        weight: weightInt,
        cloudinary_id: result.public_id,
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

export { createProgress };
