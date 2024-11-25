import axios from "axios";

function getCordinates(address: string) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = "https://maps.googleapis.com/maps/api/geocode/json";
  const params = {
    params: {
      address: address,
      key: apiKey,
    }
  }

  return axios.get(url, params);
};

function calculateDistance(
  origin: { latitude: number, longitude: number },
  destination: { latitude: number, longitude: number }
) {
  const apiKey = process.env.GOOGLE_API_KEY;
  const url = "https://routes.googleapis.com/directions/v2:computeRoutes";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": apiKey,
    "X-Goog-FieldMask": "routes.duration,routes.distanceMeters,routes.polyline.encodedPolyline"
  };

  const data = {
    origin: {
      location: {
        latLng: {
          latitude: origin.latitude,
          longitude: origin.longitude,
        },
      },
    },
    destination: {
      location: {
        latLng: {
          latitude: destination.latitude,
          longitude: destination.longitude,
        },
      },
    },
    travelMode: "DRIVE",
  };
  return axios.post(url, data, { headers });
};

const returnAxiosRequisition = {
  getCordinates,
  calculateDistance,
};

export default returnAxiosRequisition;