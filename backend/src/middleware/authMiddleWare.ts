import {Request, Response, NextFunction} from "express";
import jwt from "jsonwebtoken";
interface JwtPayload {
  id: number;
  username: string;
}
export const verifyToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: "Access denied. No token provided." });
    }
    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token,"SmileCareSecretKey") as JwtPayload;
        (req as any).admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token." });
    }
};