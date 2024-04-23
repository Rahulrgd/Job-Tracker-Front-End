import axios from "axios";

const apiClient = axios.create({baseURL:'http://localhost:5000'})

export const jobPosts = ()=>apiClient.get('/v1/all-jobs')
export const deleteJobPost = (jobId)=>{apiClient.delete(`/jobpost-delete`, {params:{jobID:jobId}})}
export const updateJobPost = (string) => {apiClient.put("/update-jobpost", string)}