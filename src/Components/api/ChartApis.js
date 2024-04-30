import { apiClient } from "./ApiClient";

export const topThreePerformers = () => apiClient.get("/v1/dashboard/top-three-performer-of-the-day-with-their-job-count");