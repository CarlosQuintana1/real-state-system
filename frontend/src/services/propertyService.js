import api from "../api/axios_client.js"

export async function getAllProperties({
        page = 1,
        limit = 10,
        type_f = "",
        min_price = "",
        max_price = "",
        location = ""
} = {}) {
    try{
        const response = await api.get("/properties/", {
            params: {
                page,
                limit,
                type_f : type_f || undefined,
                min_price : min_price || undefined,
                max_price : max_price || undefined,
                location : location || undefined
            }
        });

        return response.data;
    } catch (err) {
        console.error("Error: ", err);
        const formatted =
            err.response?.data?.detail ||
            err.response?.data?.message ||
            JSON.stringify(err.response?.data) ||
            "Error al obtener propiedades";

        throw new Error(formatted);
    }
}