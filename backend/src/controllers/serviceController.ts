import { Request, Response } from "express";

import {
  getAllServices,
  createService,
  updateServiceById,
  deleteServiceById,
  getServiceByIdService,
} from "../services/serviceService";

// GET ALL SERVICES
export const getServices = async (
  req: Request,
  res: Response
) => {
  try {
    const services = await getAllServices();

    res.status(200).json(services);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

// GET SERVICE BY ID
export const getServiceById = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const service = await getServiceByIdService(Number(id));

    if (!service) {
      return res.status(404).json({
        message: "Service Not Found",
      });
    }

    res.status(200).json(service);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// ADD SERVICE
export const addService = async (
  req: Request,
  res: Response
) => {
  try {
    const { title, description } = req.body;

    const image = req.file
      ? `http://localhost:3000/uploads/services/${req.file.filename}`
      : "";

    const service = await createService(
      title,
      description,
      image
    );

    res.status(201).json(service);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// UPDATE SERVICE
export const updateService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    const { title, description } = req.body;

    const image = req.file
      ? `http://localhost:3000/uploads/services/${req.file.filename}`
      : req.body.image;

    const service = await updateServiceById(
      Number(id),
      title,
      description,
      image
    );

    res.status(200).json(service);
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

// DELETE SERVICE
export const deleteService = async (
  req: Request,
  res: Response
) => {
  try {
    const { id } = req.params;

    await deleteServiceById(Number(id));

    res.status(200).json({
      message: "Service Deleted Successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};