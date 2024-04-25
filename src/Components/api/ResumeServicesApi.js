import { apiClient } from "./ApiClient";

export const retrieveUserResumes = () =>
  apiClient.get("/v1/retrieve-user-resumes");

export const deleteUserResumeWitId = (resumeId) =>
  apiClient.delete("/v1/delete-user-resume", {
    params: { resumeId: resumeId },
  });

export const uploadResume = (formData) => apiClient.post("/v1/create-resume", formData, {headers:{ "Content-Type": "multipart/form-data"}});

export const downloadUserResume = (resumeId) => apiClient.get(`/v1/download-user-resume?resumeId=${resumeId}`)

