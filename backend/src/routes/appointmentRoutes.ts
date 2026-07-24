import { Router } from "express";
import { addAppointment } from "../controllers/appointmentcontroller";
import { availableTimes } from "../controllers/serviceController";

const router = Router();
router.get("/available", availableTimes);
router.post("/", addAppointment);

export default router;