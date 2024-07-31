import { jwtDecode } from "jwt-decode";
import axios from "axios";
const backend = process.env.REACT_APP_BACKEND_SERVER;
export default async function isAuthenticated() {
  try {
    let token = localStorage.getItem("authToken");
    const refreshToken = localStorage.getItem("refreshToken");
    if (!token) {
      return false;
    }

    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decodedToken.exp < currentTime) {
      try {
        const response = await axios.post(`${backend}/api/refresh-token`, {
          refreshToken,
        });
        token = response.data.token;
        localStorage.setItem("authToken", token);
        return true;
      } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.clear();
        window.location.href = "/login";
        return false;
      }
    }

    return true;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}
