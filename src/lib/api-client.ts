// src/lib/api-client.ts
import axios from "axios";

// Local API instance
export const api = axios.create({
  baseURL: "http://localhost:5201",
});

// RTSA API instance
export const rtsaAPI = axios.create({
  baseURL: "https://clientsapi.gari.dev",
});