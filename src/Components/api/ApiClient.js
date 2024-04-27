import axios from "axios";

export const apiClient = axios.create({ baseURL: "http://localhost:5000" });
// export const apiClient = axios.create({ baseURL: "http://jobtracker-001-snapshot-env.eba-d27is6xd.eu-north-1.elasticbeanstalk.com" });
