// src/services/vehicle.service.ts
import { rtsaAPI } from "../lib/api-client";
import { VehicleDetails } from "../modules/vehicles/models/vehicle.model.ts";
import type { AxiosError } from "axios";

export const VehicleService = {
    async getVehicleDetails(regNumber: string): Promise<VehicleDetails> {
        try {
            const response = await rtsaAPI.get(`/vehicles/details/${regNumber}`);
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<{ message?: string }>;
            throw new Error(
                axiosError.response?.data?.message ||
                "Failed to fetch vehicle details. Please check the registration number and try again."
            );
        }
    }
};