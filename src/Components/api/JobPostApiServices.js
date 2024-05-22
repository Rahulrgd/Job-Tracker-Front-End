import { apiClient } from "./ApiClient";

export const allJobPosts = () => apiClient.get("/v1/dashboard/all-jobs", {params:{pageNumber:0}});
export const addJobsApi = (body) => apiClient.post("/v1/add-job", body);
export const deleteUserJobPost = (jobPostId) =>
  apiClient.delete("/v1/delete-job-post", {
    params: {
      jobPostId: jobPostId,
    },
  });

export const retrieveJobPostWithId = (jobPostId) =>
  apiClient.get("/v1/retrieve-job-post-with-user-id", {
    params: {
      jobPostId: jobPostId,
    },
  });

export const addJobPostWithId = (jobPostId) => {
  return apiClient.post(`/v1/add-job-with-job-id?jobPostId=${jobPostId}`);
};

export const updateUserJobPost = (jobPost) =>
  apiClient.put("/v1/update-job-post", jobPost);

export const retrieveUsersPostPerDay = () =>
  apiClient.get("/v1/retrive-users-per-day-jobposts" , {params:{pageNumber:0}});

export const retrieveJobPostsContainingString = (searchString) =>
  apiClient.get("/v1/dashboard/search-jobposts-containing-strings", {params:{string:searchString, pageNumber:0}});


