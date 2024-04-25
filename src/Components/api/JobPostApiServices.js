import { apiClient } from "./ApiClient";

export const allJobPosts = () => apiClient.get("/v1/all-jobs");
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
  console.log("form add job Post with id method inside jobpostservices: ");
  console.log(jobPostId);
  return apiClient.post(`/v1/add-job-with-job-id?jobPostId=${jobPostId}`);
};

export const updateUserJobPost = (jobPost) =>
  apiClient.put("/v1/update-job-post", jobPost);

// export const addJobPostWithId = (jobPostId) =>
//   apiClient.post("/v1/add-job-with-job-id", {
//     params: { jobPostId: jobPostId },
//   });
