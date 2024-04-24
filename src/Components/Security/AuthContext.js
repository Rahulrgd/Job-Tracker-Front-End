import { createContext, useContext, useState } from "react";
import { apiClient } from "../api/ApiClient";
import { jwtAuthenticationServiceApi } from "../api/AuthenticationApiServices";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setAuthenticated] = useState(false);

  const [token, setToken] = useState(null);

  async function login(request) {
    try {
      const response = await jwtAuthenticationServiceApi(request);
      setToken(response.data.jwtToken);
      setAuthenticated(true);

      apiClient.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${response.data.jwtToken}`
        return config
      });
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function logout() {
    setAuthenticated(false);
    setToken(null);
    setTimeout(()=>window.location.reload(),100)
  }
  return (
    <AuthContext.Provider
      value={{ isAuthenticated, setAuthenticated, login, logout, token }}
    >
      {children}
    </AuthContext.Provider>
  );
}
