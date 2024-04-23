import api from "./api";


export const sign_in = async (username, password) => {
    try {
        const response = await api.post("/token/", { username: username, password: password , withCredentials: true})
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const sign_up = async (username, password) => {
    try {
        const response = await api.post("/api/register/", { username: username, password: password })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const sign_out = async () => {
    try {
        const response = await api.post("/api/logout/", { refresh_token: window.localStorage.getItem('refresh_token') })
        return response.data;
    } catch (error) {
        console.log(error);
    }
}