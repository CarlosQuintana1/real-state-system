export function mapPropertyStatus(status){
    const statusMap = {
        available : "Disponible",
        rented : "Rentada",
        sold : "Vendida",
    };

    return statusMap[status] || 'Desconocido';
}