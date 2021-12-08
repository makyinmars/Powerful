import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.headers.authorization) {
      res.status(401).send("Access denied. Not token provided");
    }

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      try {
        const token = req.headers.authorization.split(" ")[1];

        const decoded: any = jwt.verify(token, process.env.JWT_SECRET);

        const user = await prisma.user.findUnique({
          where: {
            id: decoded.id,
          },
        });

        if (!user) {
          return res.status(401).send("Access denied. User not found.");
        }

        req.user = user;
        next();
      } catch (error) {
        res.status(401).send("Access denied. Invalid token.");
      }
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.meta);
    }
  }
};

const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { auth, admin };
