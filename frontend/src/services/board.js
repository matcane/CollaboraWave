import api from "./api";


export const board_list = async () => {
    try {
        const response = await api.get("/api/board_list/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const board_stages = async (board_id) => {
    try {
        const response = await api.get("/api/board/" + board_id + "/stages/")
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const board_add = async (title) => {
    try {
        const response = await api.post("/api/board_create/", {title: title}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const board_update = async (board, title) => {
    try {
        const response = await api.put("/api/board_update/" + board + "/", {title: title}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const board_delete = async (board) => {
    try {
        const response = await api.delete("/api/board_delete/" + board, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}
