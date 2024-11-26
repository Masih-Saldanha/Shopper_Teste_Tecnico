import prisma from "../config/database.js";
import { RideData } from "../types/dataBaseTypes.js";

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