import { Request, Response } from "express";
import { SendEstimateRide } from "../schemas/rideSchema.js";
import rideService from "../services/rideServices.js";

async function estimateRide(req: Request, res: Response) {
  const body: SendEstimateRide = req.body;

  const result = await rideService.estimateRide(body);
  
  res.status(200).json(result);
};

async function confirmRide(req: Request, res: Response) {
//   Request Body
// {
//  "customer_id": string,
//  "origin": string,
//  "destination": string,
//  "distance": number,
//  "duration": string,
//  "driver": {
//  "id": number,
//  "name": string
//  },
//  "value": number
// }
  res.send("OK").status(200);
};

async function getCustomerData(req: Request, res: Response) {
  const { customer_id } = req.params;
  const { driver_id } = req.query;

  if (!customer_id || !driver_id) {
    return res.status(400).json({ error: "customer_id e driver_id são requiridas" });
  }

  res.status(200).json({
    message: "Detalhes capturados",
    customer_id,
    driver_id
  })
};

const rideController = {
  estimateRide,
  confirmRide,
  getCustomerData
};

export default rideController;