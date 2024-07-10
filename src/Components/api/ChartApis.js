import { apiClient } from "./ApiClient";

export const topThreePerformers = () => apiClient.get("/v1/dashboard/top-three-performer-of-the-day-with-their-job-count");
export const totalJobPostsPerDay = () => apiClient.get("/v1/dashboard/retrive-jobpost-count-per-day", {params:{pageNumber:0}});