import { Request, Response } from "express";
import {
  getAllServices,
  getServiceById,
  updateService,
  deleteService,
} from "../services/serviceService";
import { createService } from "../services/serviceService";
import { getAvailableTimes } from "../services/appiontmentservice";
export const getServices = async (
  req: Request,
  res: Response,
): Promise<void> => {
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
export const addService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const { title, description, image } = req.body;

    const newService = await createService(title, description, image);

    res.status(201).json(newService);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const getService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const service = await getServiceById(id);

    if (!service) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const editService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const { title, description, image } = req.body;

    const service = await updateService(id, title, description, image);

    if (!service) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const delService = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const id = Number(req.params.id);

    const { title, description, image } = req.body;

    const service = await deleteService(id, title, description, image);

    if (!service) {
      res.status(404).json({
        message: "Service not found",
      });
      return;
    }

    res.status(200).json(service);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
export const availableTimes = async (req: Request, res: Response) => {
  try {
    const { doctor_id, date } = req.query;

    const times = await getAvailableTimes(
      Number(doctor_id),
      String(date)
    );

    res.json(times);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};