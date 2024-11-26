import { Driver } from "./driver";

export type EstimateRideData = {
  origin: {
    latitude: number;
    longitude: number;
  };
  destination: {
    latitude: number;
    longitude: number;
  };
  distance: number;
  duration: string;
  options: Driver[];
  routeResponse: {
    routes: {
      distanceMeters: number;
      duration: string;
    }[]
  }
}

export type GetEncodedPolyline = {
  origin: { latitude: number; longitude: number; };
  destination: { latitude: number; longitude: number; };
};
