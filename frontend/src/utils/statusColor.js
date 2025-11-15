export function getStatusColor(status) {
    const color = {
        available: "bg-green-400 text-white",
        rented: "bg-cyan-400 text-white",
        sold: "bg-red-400 text-white",
    };

    return color[status] || "bg-gray-400 text-white";
}