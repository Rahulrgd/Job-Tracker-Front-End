import { apiClient } from "./ApiClient"

export const signUpServicesApi = async (body) => { await apiClient.post("/sign-up/", body)}

export const jwtAuthenticationServiceApi = async (request) => await apiClient.post("/authenticate", request);