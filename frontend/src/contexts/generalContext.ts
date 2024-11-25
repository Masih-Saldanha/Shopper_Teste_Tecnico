import { createContext } from 'react';

export type GeneralContextType = {
  global: string;
  teste: string;
  customerId: string;
  setCustomerId: React.Dispatch<React.SetStateAction<string>>;
  origin: string;
  setOrigin: React.Dispatch<React.SetStateAction<string>>;
  destination: string;
  setDestination: React.Dispatch<React.SetStateAction<string>>;
  estimateRideData: EstimateRideData | null;
  setEstimateRideData: React.Dispatch<React.SetStateAction<EstimateRideData | null>>;
  driversList: Driver[];
  setDriversList: React.Dispatch<React.SetStateAction<Driver[]>>;
  urlSafePolyline: string;
  setUrlSafePolyline: React.Dispatch<React.SetStateAction<string>>;
};

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

export type Driver = {
  id: number;
  name: string;
  description: string;
  vehicle: string;
  review: {
    rating: number;
    comment: string;
  };
  value: number
}

export type BodyConfirmRide = {
    customer_id: string;
    origin: string;
    destination: string;
    distance: number | undefined;
    duration: string | undefined;
    driver: {
        id: number;
        name: string;
    };
    value: number;
}

export type GetEncodedPolyline = {
  origin: { latitude: number; longitude: number; };
  destination: { latitude: number; longitude: number; };
};

const GeneralContext = createContext<GeneralContextType | null>(null);

export default GeneralContext;
