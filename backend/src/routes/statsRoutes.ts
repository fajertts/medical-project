import { Router } from "express";

import { getStatistics } from "../controllers/statsController";

const router = Router();

router.get("/", getStatistics);

export default router;