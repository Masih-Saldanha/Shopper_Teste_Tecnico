import { Rides } from "@prisma/client";

import prisma from "../config/database.js";

export type RideData = Omit<Rides, "id">;

async function saveRide(data: RideData) {
  await prisma.rides.create({ data });
};

async function getRidesListByCustomerId(customerId: string) {
  return prisma.rides.findMany({
    where: {
      customerId,
    },
    include: {
      drivers: true,
    },
    orderBy: { date: "desc" },
  });
};

const rideRepository = {
  saveRide,
  getRidesListByCustomerId,
};

export default rideRepository;