import { apiClient } from "./ApiClient";

export const allJobPosts = ()=>apiClient.get('/v1/all-jobs')
export const addJobsApi = (body) => apiClient.post('/v1/add-job', body)