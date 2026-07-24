import { Router } from "express";

import {
  getDoctors,

  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorcontroller";

import { verifyToken } from "../middleware/authMiddleWare";

const router = Router();

// جميع المستخدمين يستطيعون رؤية الأطباء
router.get("/", getDoctors);


// الأدمن فقط
router.post("/", verifyToken, addDoctor);
router.put("/:id", verifyToken, updateDoctor);
router.delete("/:id", verifyToken, deleteDoctor);

export default router;