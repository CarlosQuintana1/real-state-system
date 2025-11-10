import api from "../api/axios_client.js"

export async function getAllProperties() {
    try{
        const response = await api.get("/properties/");
        console.log("Propiedades: ", response.data);
        return response.data;
    } catch (err) {
        console.error("Error: ", err);
        throw err.response?.data || {detail: "Error al obtener propiedades"};
    }
}