import { useQuery } from "react-query";
import { IParkingSlot } from "../models/parking-slot.model";
import {api} from "../lib/api-client";

export const useAllParkingSlots = () => {
  return useQuery({
    queryKey: ["parking-slots"],
    queryFn: async () => {
      const { data: allParkingSlots } = await api.get<IParkingSlot[]>(
        "/parking-slots/all"
      );

      return allParkingSlots.map((parkingSlot: IParkingSlot) => ({
        key: parkingSlot.id,
        status: parkingSlot.parkingSlotStatus,
      }));
    },
  });
};
