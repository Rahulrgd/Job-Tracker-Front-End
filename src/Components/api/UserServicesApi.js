import { apiClient } from "./ApiClient";

export const retrieveUserDetails = () => apiClient.get("/v1/user-detail");
export const retrieveUserJobPosts = () =>
  apiClient.get("/v1/retrieve-user-job-posts" , {params:{pageNumber:0}});

//   ============================Retrieve User Jobposts Containg String=============================
export const retrieveUserJobPostsContainingString = (searchString) => {
  return apiClient.get("/v1/search-user-jobposts-containing-string", {
    params: { string: searchString, pageNumber:0 },
  });
};

export const countTotalUsers = () => apiClient.get("/v1/dashboard/count-total-users");
