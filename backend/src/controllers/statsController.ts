import { Request, Response } from "express";

import { getStats } from "../services/statsService";

export const getStatistics = async (
  req: Request,
  res: Response
) => {
  try {
    const stats = await getStats();

    res.status(200).json({
      doctors: Number(stats.doctors),
      services: Number(stats.services),
      appointments: Number(stats.appointments),
      patients: Number(stats.patients),
    });
  } catch (error: any) {
    console.error("GET STATS ERROR:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};