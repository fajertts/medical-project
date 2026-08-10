import { Router } from "express";

import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../controllers/doctorcontroller";

import { verifyToken } from "../middleware/authMiddleWare";
import { upload,} from "../middleware/upload";

const router = Router();

// الجميع يستطيع مشاهدة الأطباء
router.get("/", getDoctors);

// الأدمن فقط
router.post(
  "/",
  verifyToken,
  upload.single("image"),
  addDoctor
);

router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  updateDoctor
);

router.delete("/:id", verifyToken, deleteDoctor);

export default router;