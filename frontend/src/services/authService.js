import api from "../api/axios_client.js"

export async function login(email, password) {
    try {
        const response = await api.post("/auth/login", {email, password});
        return response.data;
    } catch (error) {
        console.error("Error: ", error);
        throw error.response?.data || {detail: "Error al iniciar sesión"};
    }
}