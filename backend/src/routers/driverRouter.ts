import { Router } from "express";

import driverController from "../controllers/driverController.js";

const driverRouter = Router();

driverRouter.get("/driver/list", driverController.getAllDrivers);

export default driverRouter;