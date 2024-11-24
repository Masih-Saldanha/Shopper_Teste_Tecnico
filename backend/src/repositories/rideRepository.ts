import { Rides } from "@prisma/client";

import prisma from "../config/database.js";

export type RideData = Omit<Rides, "id">;

async function saveRide(data: RideData) {
  await prisma.rides.create({ data });
};

const rideRepository = {
  saveRide,
};

export default rideRepository;