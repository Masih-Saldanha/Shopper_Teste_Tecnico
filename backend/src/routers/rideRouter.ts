import { Router } from "express";

import rideController from "../controllers/rideController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import rideSchema from "../schemas/rideSchema.js";

const rideRouter = Router();

rideRouter.post("/ride/estimate", validateSchema(rideSchema.sendEstimateRideData), rideController.estimateRide);
rideRouter.patch("/ride/confirm", rideController.confirmRide);
rideRouter.get("/ride/:customer_id", rideController.getCustomerData);

export default rideRouter;