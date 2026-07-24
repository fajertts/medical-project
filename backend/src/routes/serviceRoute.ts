import { Router } from "express";
import { getService, getServices } from "../controllers/serviceController";
import { addService } from "../controllers/serviceController";
import { editService } from "../controllers/serviceController";
import { delService } from "../controllers/serviceController";


const router = Router();


router.get("/", getServices);
router.post("/", addService);
router.get("/:id", getService);
router.put("/:id", editService);
router.delete("/:id", delService);

export default router;