import api from "./api";


export const stage_add = async (board, title) => {
    try {
        const response = await api.post("/api/board/" + board + "/stage_create/", {title: title}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const stage_update = async (board, stage, title) => {
    try {
        const response = await api.put("/api/board/" + board + "/stage_update/" + stage + "/", {title: title}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const stage_delete = async (board, stage) => {
    try {
        const response = await api.delete("/api/board/" + board + "/stage_delete/" + stage + "/", {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}