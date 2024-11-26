export type SendEstimateRide = {
  customer_id: string;
  origin: string;
  destination: string;
};

export type SendRideConfirm = {
  customer_id: string;
  origin: string;
  destination: string;
  distance: number;
  duration: string;
  driver: {
    id: number;
    name: string;
  };
  value: number;
};

export type GetEncodedPolyline = {
  origin: { latitude: number; longitude: number; };
  destination: { latitude: number; longitude: number; };
};
