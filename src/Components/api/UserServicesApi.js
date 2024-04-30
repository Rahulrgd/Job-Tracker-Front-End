import { apiClient } from "./ApiClient";

export const retrieveUserDetails = () => apiClient.get("/v1/user-detail");
export const retrieveUserJobPosts = () =>
  apiClient.get("/v1/retrieve-user-job-posts");

//   ============================Retrieve User Jobposts Containg String=============================
export const retrieveUserJobPostsContainingString = (searchString) => {
  console.log("from user services ");
  return apiClient.get("/v1/search-user-jobposts-containing-string", {
    params: { string: searchString },
  });
};
