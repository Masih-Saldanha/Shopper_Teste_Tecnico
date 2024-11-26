import prisma from "../config/database.js";

async function findAll() {
  return prisma.drivers.findMany({ orderBy: { taxa: "asc" } });
};

async function findById(id: number) {
  return prisma.drivers.findUnique({ where: { id } });
};

const driverRepository = {
  findAll,
  findById,
};

export default driverRepository;