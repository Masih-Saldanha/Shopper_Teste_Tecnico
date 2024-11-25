import { Request, Response } from "express";

import driverService from "../services/driverServices.js";

async function getAllDrivers(req: Request, res: Response) {
  const result = await driverService.getAllDrivers();

  res.status(200).json(result);
};

const driverController = {
  getAllDrivers,
};

export default driverController;