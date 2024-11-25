import driverRepository from "../repositories/driverRepository.js";

async function getAllDrivers() {
  const driversList = await driverRepository.findAll();

  return driversList;
}

const driverService = {
  getAllDrivers,
};

export default driverService;