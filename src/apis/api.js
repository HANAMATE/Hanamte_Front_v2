import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("AccessToken"),
  },
  withCredentials: true,
});

// AccessToken이 업데이트될 때마다 헤더도 업데이트
function updateAuthorizationHeader() {
  const accessToken = localStorage.getItem("AccessToken");
  api.defaults.headers["Authorization"] = accessToken;
}

export { updateAuthorizationHeader };

export default api;
