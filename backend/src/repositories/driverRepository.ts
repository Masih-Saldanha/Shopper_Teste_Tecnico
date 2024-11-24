import { Drivers } from "@prisma/client";

import prisma from "../config/database.js";

export type DriverData = Omit<Drivers, "id">;

async function findAll() {
  return prisma.drivers.findMany({ orderBy: { taxa: "asc" } });
};

const driverRepository = {
  findAll
};

export default driverRepository;