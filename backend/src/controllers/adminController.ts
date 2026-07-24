import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getAdminByUsername } from "../services/adminServices";
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const admin = await getAdminByUsername(username);
    console.log("Username received:", username);
    console.log("Admin from DB:", admin);

    console.log("Admin:", admin);
    if (!admin) {
      return res.status(401).json({
        message: "Invalid Username or Password",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Username or Password",
      });
    }
    console.log("Password Match:", isMatch);

    const token = jwt.sign(
      {
        id: admin.id,
        username: admin.username,
      },
      "SmileCareSecretKey",
      {
        expiresIn: "2h",
      },
    );

    res.status(200).json({
      token,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
