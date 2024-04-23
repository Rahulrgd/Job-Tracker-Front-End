import { apiClient } from "./ApiClient";

export const welcomeApi = () => apiClient.get("/welcome");
