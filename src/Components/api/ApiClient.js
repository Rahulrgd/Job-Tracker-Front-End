import axios from "axios";

export const apiClient = axios.create({ baseURL: "http://localhost:5000" });
// export const apiClient = axios.create({ baseURL: "http://job-tracker-2-version-env.eba-rimccpcb.eu-north-1.elasticbeanstalk.com" });
