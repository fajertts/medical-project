import { Request, Response } from "express";
import { createAppointment,getAvailableTimes } from "../services/appiontmentservice";

// ADD APPOINTMENT
export const addAppointment = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      patient_name,
      patient_phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time,
    } = req.body;

    const appointment = await createAppointment(
      patient_name,
      patient_phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time
    );

    res.status(201).json(appointment);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
export const availableTimes = async (
  req: Request,
  res: Response
) => {
  try {
    const doctorId = Number(req.query.doctorId);
    const date = req.query.date as string;

    const times = await getAvailableTimes(
      doctorId,
      date
    );

    res.status(200).json(times);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};