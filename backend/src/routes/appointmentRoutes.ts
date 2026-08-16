import { Router } from "express";

import {
  addAppointment,
  getAppointments,
  getAppointment,
  updateAppointment,
  deleteAppointment,
  availableTimes,
} from "../controllers/appointmentcontroller";

const router = Router();


// GET ALL

router.get(
  "/",
  getAppointments
);


// GET AVAILABLE TIMES

router.get(
  "/available",
  availableTimes
);


// GET BY ID

router.get(
  "/:id",
  getAppointment
);


// ADD

router.post(
  "/",
  addAppointment
);


// UPDATE

router.put(
  "/:id",
  updateAppointment
);


// DELETE

router.delete(
  "/:id",
  deleteAppointment
);


export default router;