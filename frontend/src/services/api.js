import axios from 'axios';
import { jwtDecode } from "jwt-decode";

const BASEURL = "http://127.0.0.1:8000"

const api = axios.create({
     baseURL: BASEURL,
   });

   api.interceptors.request.use(
    async (config) => {
        let acces = window.localStorage.getItem("access_token");
        const refreshToken = window.localStorage.getItem("refresh_token");
        
        if (acces) {
            const decoded = jwtDecode(acces);
            const tokenExpiration = decoded.exp;
            const now = Date.now() / 1000;

            if (tokenExpiration < now) {
                const response = await axios.post(BASEURL + "/token/refresh/", { refresh: refreshToken });
                window.localStorage.setItem("access_token", response.data.access);
                config.headers.Authorization = `Bearer ${response.data.access}`;
            }
            else {
                config.headers.Authorization = `Bearer ${acces}`;
            }   
        }
        return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
    if (401 === error.response.status) {
        window.localStorage.clear();
        window.location.reload(false);
    } else {
        return Promise.reject(error);
    }
  });

export default api