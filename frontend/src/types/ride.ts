export type Ride = {
  id: number;
  date: string;
  destination: string;
  distance: number;
  driver: {
    id: number;
    name: string;
  }
  duration: string;
  origin: string;
  value: number;
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
