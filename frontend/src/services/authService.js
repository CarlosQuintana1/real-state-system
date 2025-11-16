import api from "../api/axios_client.js"
import Cookies from "js-cookie";

export async function login(email, password) {
    try {
        const response = await api.post("/auth/login", {email, password});
        const { access_token } = response.data;

        Cookies.set("access_token", access_token, {
            expires: 6 / 24,
            secure: false,
            sameSite: "strict",
        });

        console.log("Token: ", Cookies.get("access_token"));
        return response.data;
    } catch (error) {
        console.error("Error en login: ", error);
        throw error.response?.data || {detail: "Error al iniciar sesión"};
    }
}