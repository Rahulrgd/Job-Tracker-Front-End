import { apiClient } from "./ApiClient";

export const topThreePerformers = () => apiClient.get("/v1/top-three-performer-of-the-day-with-their-job-count");