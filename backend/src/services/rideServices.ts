import { Drivers, Rides } from "@prisma/client";

import returnAxiosRequisition from "../helpers/returnAxiosRequisition.js";
import driverRepository from "../repositories/driverRepository.js";
import rideRepository from "../repositories/rideRepository.js";
import { GetEncodedPolyline, SendEstimateRide, SendRideConfirm } from "../schemas/rideSchema.js";
import { throwError } from "../utils/errorTypeUtils.js";

async function estimateRide(estimateRideData: SendEstimateRide) {
  try {
    const origin = estimateRideData.origin;
    const destination = estimateRideData.destination;

    const originResponse = await returnAxiosRequisition.getCordinates(origin);
    throwError(!!originResponse.data.error_message, "Bad Request", originResponse.data.error_message);
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
    throwError(!calculateDistance.routes, "Bad Request", "Rota impossível");

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

    calculateDistance.routes = calculateDistance.routes.map((route: any) => {
      return {
        distanceMeters: route.distanceMeters,
        duration: route.duration,
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
    console.error("error: ", error);
    if (error.type) {
      throwError(true, error.type, error.message);
    } else if (error.response.data.error.message) {
      throwError(true, "Bad Request", error.response.data.error.message)
    } else {
      throwError(true, "Bad Request", "Erro na estimativa")
    }
  }
};

async function confirmRide(confirmRideData: SendRideConfirm) {
  const driver = await driverRepository.findById(confirmRideData.driver.id);
  throwError(!driver, "Not Found", "Motorista não encontrado");
  if (driver) {
    throwError(
      confirmRideData.distance < driver.kmMinimo,
      "Not Acceptable",
      "Quilometragem inválida para o motorista"
    );
  }

  const data = {
    customerId: confirmRideData.customer_id,
    date: new Date(),
    origin: confirmRideData.origin,
    destination: confirmRideData.destination,
    distance: confirmRideData.distance,
    duration: confirmRideData.duration,
    driverId: confirmRideData.driver.id,
    value: confirmRideData.value,
  }
  rideRepository.saveRide(data);

  return { success: true }
}

async function getRidesListByCustomerIdAndDriverId(customer_id: string, driver_id: string | undefined) {
  const isCustomerInvalid = !customer_id
    || typeof customer_id !== "string"
    || customer_id.trim() === "";
  throwError(isCustomerInvalid, "Bad Request", "Usuario invalido");

  let ridesFound: (Rides & { drivers: Drivers })[] = await rideRepository.getRidesListByCustomerId(customer_id);
  throwError(ridesFound.length < 1, "Not Found", "Esse usuário ainda não solicitou uma viagem");
  if (driver_id) {
    const isNumeric = /^\d+$/.test(driver_id);
    const driver_id_number = parseInt(driver_id, 10);
    const isDriverIdInvalid = !isNumeric || isNaN(driver_id_number) || driver_id_number <= 0;
    throwError(isDriverIdInvalid, "Bad Request", "Motorista invalido");

    ridesFound = ridesFound.filter(ride => ride.driverId === driver_id_number)
    throwError(ridesFound.length < 1, "Not Found", "Nenhum registro encontrado para esse motorista");
  }

  const rides = ridesFound.map(ride => {
    return {
      id: ride.id,
      date: ride.date,
      origin: ride.origin,
      destination: ride.destination,
      distance: ride.distance,
      duration: ride.duration,
      driver: {
        id: ride.drivers.id,
        name: ride.drivers.nome,
      },
      value: ride.value,
    };
  });

  const result = {
    customer_id,
    rides
  };

  return result;
}

async function getEncodedPolylineData(getEncodedPolyline: GetEncodedPolyline) {
  try {
    const calculateDistanceResponse = await returnAxiosRequisition.calculateDistance(getEncodedPolyline.origin, getEncodedPolyline.destination);
    const urlSafePolyline = encodeURIComponent(calculateDistanceResponse.data.routes[0].polyline.encodedPolyline);

    return urlSafePolyline;
  } catch (error: any) {
    console.error("error: ", error);
    if (error.type) {
      throwError(true, error.type, error.message);
    } else if (error.response.data.error.message) {
      throwError(true, "Bad Request", error.response.data.error.message)
    } else {
      throwError(true, "Bad Request", "Erro na estimativa")
    }
  }
}

const rideService = {
  estimateRide,
  confirmRide,
  getRidesListByCustomerIdAndDriverId,
  getEncodedPolylineData,
};

export default rideService;