import returnAxiosRequisition from "../helpers/returnAxiosRequisition.js";
import driverRepository from "../repositories/driverRepository.js";
import { SendEstimateRide } from "../schemas/rideSchema.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function estimateRide(estimateRideData: SendEstimateRide) {
  try {
    const origin = estimateRideData.origin;
    const destination = estimateRideData.destination;

    const originResponse = await returnAxiosRequisition.getCordinates(origin);
    const originData = originResponse.data.results[0].geometry.location;
    const originCoordinates = {
      latitude: originData.lat,
      longitude: originData.lng
    };

    const destinationResponse = await returnAxiosRequisition.getCordinates(destination);
    const destinationData = destinationResponse.data.results[0].geometry.location;
    const destinationCoordinates = {
      latitude: destinationData.lat,
      longitude: destinationData.lng
    };

    const calculateDistanceResponse = await returnAxiosRequisition.calculateDistance(originCoordinates, destinationCoordinates);
    const calculateDistance = calculateDistanceResponse.data;

    const distanceInKm = calculateDistance.routes[0].distanceMeters / 1000;
    const distanceInKmRounded = parseFloat(distanceInKm.toFixed(3));

    const durationinSeconds: string = calculateDistance.routes[0].duration;
    
    const drivers = await driverRepository.findAll();
    const validDrivers = drivers.filter(driver => driver.kmMinimo < distanceInKmRounded)
    const options = validDrivers.map(driver => {
      const totalValue = driver.taxa * distanceInKmRounded;
      return {
        id: driver.id,
        name: driver.nome,
        description: driver.descricao,
        vehicle: driver.carro,
        review: {
          rating: driver.pontuacao,
          comment: driver.avaliacao,
        },
        value: parseFloat(totalValue.toFixed(2)),
      }
    });

    const result = {
      origin: originCoordinates,
      destination: destinationCoordinates,
      distance: distanceInKmRounded,
      duration: durationinSeconds,
      options,
      routeResponse: calculateDistance
    }

    return result;

  } catch (error: any) {
    console.error(error);
    if (error.code === 400) {
      throwError(true, "Bad Request", error.message);
    } else if (error.code === 403) {
      throwError(true, "Forbidden", error.message);
    } else {
      throwError(error.response.status, error.response.statusText, error.response.data.error);
    }
  }
}

const rideService = {
  estimateRide,
};

export default rideService;