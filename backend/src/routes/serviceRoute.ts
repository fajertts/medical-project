import { Router } from "express";
import {
  getServices,
  getServiceById,
  addService,
  updateService,
  deleteService,
} from "../controllers/serviceController";

import { verifyToken } from "../middleware/authMiddleWare";
import { upload } from "../middleware/upload";

const router = Router();

// Public
router.get("/", getServices);
router.get("/:id", getServiceById);

// Admin
router.post("/", verifyToken, upload.single("image"), addService);

router.put(
  "/:id",
  verifyToken,
  upload.single("image"),
  updateService
);

router.delete("/:id", verifyToken, deleteService);

export default router;