import { useMutation, useQuery, useQueryClient } from "react-query";
import {api} from "../lib/api-client";
import { ITruck } from "../models/trucks.model";

export interface AddTruck {
  registrationNumber: string;
  make: string;
  model: string;
}

export const useAllTrucks = () => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["allTrucks"],
    queryFn: async () => {
      const { data: allTrucks } = await api.get<ITruck[]>("/trucks");

      return allTrucks.map((truck: ITruck) => ({
        key: truck.id,
        licensePlate: truck.registrationNumber,
        make: truck.make,
        model: truck.model,
      }));
    },
    onSuccess: () => {
      // queryClient.invalidateQueries({ queryKey: ["allTrucks"] });
    },
    onError: (error) => {
      console.log("api call failed cause: " + error);
    },
  });
};

export const useAddTrucks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newTruck: AddTruck) => {
      return await api.post("/trucks/add", newTruck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTrucks"] });
    },
    onError: (error) => {
      console.log("api call failed cause: " + error);
    },
  });
};

export const useEditTrucks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (editTruck: ITruck) => {
      return await api.put(`/trucks/${editTruck.id}/edit`, editTruck);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTrucks"] });
    },
    onError: (error) => {
      console.log("api call failed cause: " + error);
    },
  });
};

export const useDeleteTrucks = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (truckId: number) => {
      return await api.delete(`trucks/${truckId}/delete`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allTrucks"] });
    },
  });
};
