import { jwtDecode } from "jwt-decode";
import type { User } from "../entitles/User";

const key = "authToken";

const storeToken = (authToken: string) => {
  if (!authToken || typeof authToken !== "string") {
    console.warn("Invalid auth token.");
    return;
  }
  try {
    localStorage.setItem(key, authToken);
  } catch (error) {
    console.error("Failed to store token:", error);
  }
};

const getToken = (): string | null => {
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error("Failed to get token:", error);
    return null;
  }
};

const getUser = (): User | null => {
  const token = getToken();
  return token ? jwtDecode(token) : null;
};

const removeToken = () => {
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error("Failed to delete token:", error);
  }
};

export default { storeToken, removeToken, getUser, getToken };
