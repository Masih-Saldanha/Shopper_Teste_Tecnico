import { createContext } from 'react';

import { EstimateRideData, Driver } from "../types";

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

const GeneralContext = createContext<GeneralContextType | null>(null);

export default GeneralContext;
