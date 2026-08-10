import { Request, Response } from "express";

import {
  getAllDoctors,
  createDoctor,
  updateDoctorById,
  deleteDoctorById,
} from "../services/doctorservice";

// GET ALL DOCTORS
export const getDoctors = async (req: Request, res: Response) => {
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
export const addDoctor = async (req: Request, res: Response) => {
  try {
    const { name, specialization } = req.body;

    const image = req.file
      ? `http://localhost:3000/uploads/doctors/${req.file.filename}`
      : "";

    const doctor = await createDoctor(name, specialization, image);

    res.status(201).json(doctor);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE DOCTOR
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, specialization } = req.body;

    let image = req.body.image || "";

    // إذا تم رفع صورة جديدة
    if (req.file) {
      image = `http://localhost:3000/uploads/doctors/${req.file.filename}`;
    }

    const doctor = await updateDoctorById(
      Number(id),
      name,
      specialization,
      image,
    );

    res.status(200).json(doctor);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE DOCTOR
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await deleteDoctorById(Number(id));

    res.status(200).json({
      message: "Doctor Deleted Successfully",
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};
