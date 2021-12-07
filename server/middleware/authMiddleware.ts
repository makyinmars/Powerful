import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { PrismaClient, Prisma } from ".prisma/client";

const prisma = new PrismaClient();

const auth = async (req: Request, res: Response, next: NextFunction) => {
  async (req: Request, res: Response, next: NextFunction) => {
    const cookie = req.cookies.token;

    if (!cookie) {
      return res.status(401).send("Access denied. No token provided.");
    }

    try {
      const decoded: any = jwt.verify(cookie, process.env.JWT_SECRET);

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
  };
};

export { auth };
