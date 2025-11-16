export function mapTypeProperty(typeValue) {
    const typeP = {
        house : "Casa",
        department : "Departamento",
    };

    return typeP[typeValue] || 'Desconocido';
}