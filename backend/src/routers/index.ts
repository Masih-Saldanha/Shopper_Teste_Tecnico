import { Router } from "express";

import healthRouter from "./healthRouter.js";
import rideRouter from "./rideRouter.js";

const router = Router();

router.use(healthRouter);
router.use(rideRouter);

export default router;