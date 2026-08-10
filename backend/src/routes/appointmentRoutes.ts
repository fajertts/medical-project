import { Router } from "express";
import {
  addAppointment,
  availableTimes,
} from "../controllers/appointmentcontroller";

const router = Router();

router.get("/available", availableTimes);
router.post("/", addAppointment);

export default router;