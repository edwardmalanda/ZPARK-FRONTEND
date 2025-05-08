import { useMutation, useQuery, useQueryClient } from "react-query";
import { IAddRental, IRental } from "../models/rental.model";
import {api} from "../lib/api-client";
import { RentalRequest } from "../modules/rentals/Rental";

export const useAllRentals = () => {
  return useQuery({
    queryKey: ["allRentals"],
    queryFn: async () => {
      const { data: allRentals } = await api.get<IRental[]>("/rental/all");

      return allRentals.map((rental: IRental) => ({
        key: rental.id,
        parkingSlot: rental.parkingSlot,
        driver: rental.driver,
        truck: rental.truck,
        date: new Date(rental.date),
        status: rental.paymentStatus,
        parkingSlotId: rental.parkingSlot.id.toString(),
      }));
    },
  });
};

export const useAddRental = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newRental: RentalRequest) => {
      return await api.post("/rental/add", newRental);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRentals"] });
    },
    onError: (error) => {
      console.log("api call failed cause: " + error);
    },
  });
};

export const useDeleteRental = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (rentalId: number) => {
      return await api.delete(`/rental/${rentalId}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allRentals"] });
    },
    onError: (error) => {
      console.log("api call failed cause: " + error);
    },
  });
};
