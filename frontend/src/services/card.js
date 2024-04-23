import api from "./api";


export const card_add = async (board, stage, title) => {
    try {
        const response = await api.post("/api/board/" + board + "/stage_detail/" + stage + "/card_create/", {title: title, stage: stage}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const card_update = async (board, stage, card, title) => {
    try {
        const response = await api.put("/api/board/" + board + "/stage_detail/" + stage + "/card_update/" + card + "/", {title: title}, {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

export const card_delete = async (board, stage, card) => {
    try {
        const response = await api.delete("/api/board/" + board + "/stage_detail/" + stage + "/card_delete/" + card + "/", {withCredentials: true});
        return response.data;
    } catch (error) {
        console.log(error);
    }
}