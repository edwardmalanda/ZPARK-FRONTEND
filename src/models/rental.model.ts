import { IDriver } from "./drivers.model";
import { IParkingSlot } from "./parking-slot.model";
import { ITruck } from "./trucks.model";

export interface IRental {
  id: number;
  parkingSlot: IParkingSlot;
  truck: ITruck;
  driver: IDriver;
  date: Date;
  paymentStatus: "paid" | "pending";
}

export interface IAddRental {}
