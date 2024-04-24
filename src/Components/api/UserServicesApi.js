import { apiClient } from "./ApiClient"

export const retrieveUserDetails = () => apiClient.get("/v1/user-detail")
export const retrieveUserJobPosts = () => apiClient.get("/v1/retrieve-user-job-posts")