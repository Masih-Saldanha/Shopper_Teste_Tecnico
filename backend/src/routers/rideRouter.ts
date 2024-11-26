import { Router } from "express";

import rideController from "../controllers/rideController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import rideSchema from "../schemas/rideSchema.js";

const rideRouter = Router();

rideRouter.post("/ride/estimate", validateSchema(rideSchema.sendEstimateRideData), rideController.estimateRide);
rideRouter.patch("/ride/confirm", validateSchema(rideSchema.sendRideConfirmData), rideController.confirmRide);
rideRouter.get("/ride/:customer_id", rideController.getRideHistory);
rideRouter.get("/ride/", rideController.getGeneral);
rideRouter.post("/ride/encodedpolyline", validateSchema(rideSchema.getEncodedPolylineData), rideController.getEncodedPolylineData);

export default rideRouter;