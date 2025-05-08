import { useMutation, useQuery, useQueryClient } from "react-query";
import {api} from "../lib/api-client";
import { IDriver } from "../models/drivers.model";

export interface AddDriver {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  licence: string;
}

const queryKey = ["allDrivers"];

const transformDriver = (driver: IDriver) => ({
  key: driver.id.toString(),
  firstName: driver.firstName,
  lastName: driver.lastName,
  phoneNumber: driver.phoneNumber,
  licence: driver.licence,
});

export const useAllDrivers = () => {
  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data: allDrivers } = await api.get<IDriver[]>("/drivers");
      return allDrivers.map(transformDriver);
    },
  });
};

const commonMutationConfig = (queryClient: ReturnType<typeof useQueryClient>) => ({
  onError: (error: Error) => console.log("api call failed cause: " + error),
  onSuccess: () => queryClient.invalidateQueries({ queryKey }),
});


export const useAddDriver = (onSuccessCallback?: () => void) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newDriver: AddDriver) => api.post("/drivers/add", newDriver),
    onError: (error) => console.log("api call failed cause: " + error),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allDrivers"] });
      onSuccessCallback?.();
    },
  });
};
export const useEditDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (editDriverData: IDriver) => api.put("/drivers/edit", editDriverData),
    ...commonMutationConfig(queryClient),
  });
};

export const useDeleteDriver = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (driverId: number) => api.delete(`/drivers/${driverId}/delete`),
    ...commonMutationConfig(queryClient),
  });
};