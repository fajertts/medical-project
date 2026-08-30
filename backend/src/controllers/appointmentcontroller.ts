import { Request, Response } from "express";

import {
  createAppointment,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
  deleteAppointmentById,
  getAvailableTimes,
} from "../services/appiontmentservice";


// ADD APPOINTMENT

export const addAppointment = async (
  req: Request,
  res: Response
) => {
  try {

    const {
  patient_name,
  phone,
  email,
  doctor_id,
  service_id,
  appointment_date,
  appointment_time,
} = req.body;

    const appointment =
      await createAppointment(
        patient_name,
        phone,
        email,
        Number(doctor_id),
        Number(service_id),
        appointment_date,
        appointment_time
      );


    res.status(201).json(
      appointment
    );

  } catch (error: any) {

    console.error(error);

    if (
      error.message ===
      "Appointment already booked"
    ) {
      return res.status(409).json({
        message:
          "Appointment already booked",
      });
    }


    res.status(500).json({
      message: error.message,
    });
  }
};


// GET ALL APPOINTMENTS

export const getAppointments = async (
  req: Request,
  res: Response
) => {
  try {

    const appointments =
      await getAllAppointments();


    res.status(200).json(
      appointments
    );

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      message:
        "Internal Server Error",
    });
  }
};


// GET APPOINTMENT BY ID

export const getAppointment = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;


    const appointment =
      await getAppointmentById(
        Number(id)
      );


    if (!appointment) {
      return res.status(404).json({
        message:
          "Appointment Not Found",
      });
    }


    res.status(200).json(
      appointment
    );

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};


// UPDATE APPOINTMENT

export const updateAppointment = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;


    const {
      patient_name,
      email,
      phone,
      doctor_id,
      service_id,
      appointment_date,
      appointment_time,
    } = req.body;


    const appointment =
      await updateAppointmentById(
        Number(id),
        patient_name,
        phone,
        email,
        Number(doctor_id),
        Number(service_id),
        appointment_date,
        appointment_time
      );


    if (!appointment) {
      return res.status(404).json({
        message:
          "Appointment Not Found",
      });
    }


    res.status(200).json(
      appointment
    );

  } catch (error: any) {

    console.error(error);


    if (
      error.message ===
      "Appointment already booked"
    ) {
      return res.status(409).json({
        message:
          "Appointment already booked",
      });
    }


    res.status(500).json({
      message: error.message,
    });
  }
};


// DELETE APPOINTMENT

export const deleteAppointment = async (
  req: Request,
  res: Response
) => {
  try {

    const { id } = req.params;


    const appointment =
      await getAppointmentById(
        Number(id)
      );


    if (!appointment) {
      return res.status(404).json({
        message:
          "Appointment Not Found",
      });
    }


    await deleteAppointmentById(
      Number(id)
    );


    res.status(200).json({
      message:
        "Appointment Deleted Successfully",
    });

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      message:
        "Internal Server Error",
    });
  }
};


// AVAILABLE TIMES

export const availableTimes = async (
  req: Request,
  res: Response
) => {
  try {

    const {
      doctorId,
      date,
    } = req.query;


    if (!doctorId || !date) {
      return res.status(400).json({
        message:
          "doctorId and date are required",
      });
    }


    const times =
      await getAvailableTimes(
        Number(doctorId),
        String(date)
      );


    res.status(200).json(
      times
    );

  } catch (error: any) {

    console.error(error);

    res.status(500).json({
      message:
        error.message,
    });
  }
};