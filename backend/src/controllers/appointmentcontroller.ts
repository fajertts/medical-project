import { Request, Response } from "express";
import { createAppointment } from "../services/appiontmentservice";
export const addAppointment = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      patient_name,
      phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time,
    } = req.body;

    const appointment = await createAppointment(
      patient_name,
      phone,
      Number(doctor_id),
      Number(service_id),
      appointment_date,
      appointment_time
    );

    res.status(201).json({
      message: "Appointment booked successfully",
      appointment,
    });
  } catch (error: any) {
    if (error.message === "Appointment already booked") {
      res.status(409).json({
        message: error.message,
      });
      return;
    }

    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};