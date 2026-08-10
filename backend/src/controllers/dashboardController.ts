import { Request, Response } from "express";
import pool from "../config/db";

export const getDashboardStats = async (
  req: Request,
  res: Response
) => {
  try {
    const doctors = await pool.query(
      "SELECT COUNT(*) FROM doctors"
    );

    const services = await pool.query(
      "SELECT COUNT(*) FROM services"
    );

    const appointments = await pool.query(
      "SELECT COUNT(*) FROM appointments"
    );

    const admins = await pool.query(
      "SELECT COUNT(*) FROM admins"
    );

    res.json({
      doctors: Number(doctors.rows[0].count),
      services: Number(services.rows[0].count),
      appointments: Number(appointments.rows[0].count),
      admins: Number(admins.rows[0].count),
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};