import { Router } from "express";

import healthRouter from "./healthRouter.js";
import rideRouter from "./rideRouter.js";
import driverRouter from "./driverRouter.js";

const router = Router();

router.use(healthRouter);
router.use(rideRouter);
router.use(driverRouter);

export default router;