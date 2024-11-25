import axios from "axios";

import { BodyConfirmRide, GetEncodedPolyline } from "../contexts/generalContext";

const BASE_URL = process.env.REACT_APP_BASE_URL;

function estimateRide(customer_id: string, origin: string, destination: string) {
  return axios.post(`${BASE_URL}/ride/estimate`, { customer_id, origin, destination });
};

function confirmRide(body: BodyConfirmRide) {
  return axios.patch(`${BASE_URL}/ride/confirm`, body);
};

function getRideHistory(userId: string, driverId?: number) {
    const params = driverId ? { userId, driverId } : { userId };
    return axios.get(`${BASE_URL}/ride/history`, { params });
};

function getEncodedPolylineData(body: GetEncodedPolyline) {
  return axios.post(`${BASE_URL}/ride/encodedpolyline`, body);
};

const rideService = {
  estimateRide,
  confirmRide,
  getRideHistory,
  getEncodedPolylineData,
};

export default rideService;