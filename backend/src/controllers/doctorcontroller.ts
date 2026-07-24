import { Request, Response } from "express";

import {
  getAllDoctors,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
} from "../services/doctorservice";

// GET ALL DOCTORS
export const getDoctors = async (
  req: Request,
  res: Response
) => {
  try {
    const doctors = await getAllDoctors();

    res.status(200).json(doctors);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// ADD DOCTOR
export const addDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const {
      name,
      specialization,
      image,
      days,
      times,
    } = req.body;

    const doctor = await createDoctor(
      name,
      specialization,
      image,
      days,
      times
    );

    res.status(201).json(doctor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// UPDATE DOCTOR
export const updateDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const {
      name,
      specialization,
      image,
      days,
      times,
    } = req.body;

    const doctor = await updateDoctorById(
      Number(id),
      name,
      specialization,
      image,
      days,
      times
    );

    res.status(200).json(doctor);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// DELETE DOCTOR
export const deleteDoctor = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteDoctorById(Number(id));

    res.status(200).json({
      message: "Doctor Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};