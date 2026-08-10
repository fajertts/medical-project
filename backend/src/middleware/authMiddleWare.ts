import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: number;
  username: string;
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  console.log("Authorization Header:", authHeader);

  if (!authHeader) {
    return res.status(401).json({
      message: "Access denied. No token provided.",
    });
  }

  const token = authHeader.split(" ")[1];

  console.log("Token:", token);

  try {
    const decoded = jwt.verify(
      token,
      "SmileCareSecretKey" // يجب أن يكون مطابقًا تمامًا
    ) as JwtPayload;

    console.log("Decoded:", decoded);

    (req as any).admin = decoded;

    next();
  } catch (error) {
    console.log("JWT Error:", error);

    return res.status(401).json({
      message: "Invalid token.",
    });
  }
};