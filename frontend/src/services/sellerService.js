import api from "../api/axios_client.js";

export async function getAllSellers() {
    const response = await api.get("/user", {
        params: {
            role: "seller"
        }
    });
    return response.data;
}
