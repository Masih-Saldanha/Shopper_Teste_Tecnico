import { Rides } from "@prisma/client";

export type RideData = Omit<Rides, "id">;
