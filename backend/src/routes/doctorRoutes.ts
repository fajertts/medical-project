import { Router } from "express";

import {
  getDoctors,
  getDoctor,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorcontroller";

const router = Router();

router.get("/", getDoctors);

router.get("/:id", getDoctor);

router.post("/", addDoctor);

router.put("/:id", updateDoctor);

router.delete("/:id", deleteDoctor);

export default router;