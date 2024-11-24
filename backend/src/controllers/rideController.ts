import { Request, Response } from "express";

import { SendEstimateRide, SendRideConfirm } from "../schemas/rideSchema.js";
import rideService from "../services/rideServices.js";

async function estimateRide(req: Request, res: Response) {
  const body: SendEstimateRide = req.body;

  const result = await rideService.estimateRide(body);

  res.status(200).json(result);
};

async function confirmRide(req: Request, res: Response) {
  const body: SendRideConfirm = req.body;

  const result = await rideService.confirmRide(body);

  res.status(200).json(result);
};

async function getCustomerData(req: Request, res: Response) {
  const { customer_id } = req.params;
  const { driver_id }: { driver_id?: string } = req.query;

  const result = await rideService.getRidesListByCustomerIdAndDriverId(customer_id, driver_id);

  res.status(200).json(result);
};

const rideController = {
  estimateRide,
  confirmRide,
  getCustomerData
};

export default rideController;