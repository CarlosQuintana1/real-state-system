import api from "../api/axios_client.js";

export async function getAllSellers() {
    const response = await api.get("/user", {
        params: {
            role: "seller"
        }
    });
    return response.data;
}

export async function getUser(user_id) {
    const response = await api.get(`/user/${user_id}`);
    console.log(response.data);
    return response.data;
}
