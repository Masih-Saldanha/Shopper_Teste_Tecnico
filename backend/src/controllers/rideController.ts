import { Request, Response } from "express";

import rideService from "../services/rideServices.js";
import { GetEncodedPolyline, SendEstimateRide, SendRideConfirm } from "../types/rideTypes.js";

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

async function getRideHistory(req: Request, res: Response) {
  const { customer_id } = req.params;
  const { driver_id }: { driver_id?: string } = req.query;

  const result = await rideService.getRidesListByCustomerIdAndDriverId(customer_id, driver_id);

  res.status(200).json(result);
};

async function getGeneral(req: Request, res: Response) {
  res.status(400).json({ error_code: "INVALID_DATA", error_description: "Id de usuário não foi informado" });
};

async function getEncodedPolylineData(req: Request, res: Response) {
  const body: GetEncodedPolyline = req.body;

  const result = await rideService.getEncodedPolylineData(body);

  res.status(200).json(result);
};

const rideController = {
  estimateRide,
  confirmRide,
  getRideHistory,
  getGeneral,
  getEncodedPolylineData,
};

export default rideController;