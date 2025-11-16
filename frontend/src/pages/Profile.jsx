import { Card, CardBody, CardFooter, CardHeader } from "@heroui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {getUser} from "../services/sellerService.js";

export default function ProfilePage() {
    const { user_id } = useParams();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user_id) {
            setError("ID no encontrado en la URL");
            setLoading(false);
            return;
        }

        async function fetchUser() {
            try {
                const data = await getUser(user_id);
                setUser(data);
            } catch (err) {
                console.error(err);
                setError("Error al cargar el perfil");
            } finally {
                setLoading(false);
            }
        }

        fetchUser().then();
    }, [user_id]);

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>Usuario no encontrado</p>;

    return (
        <div className="h-[620px] w-full flex items-center justify-center">
            <Card className="bg-gray-100 w-[1200px] h-[500px] rounded-2xl p-4">
                <CardHeader className="text-2xl font-bold">Perfil</CardHeader>
                <CardBody>
                    <p>Nombre: {user.name}</p>
                </CardBody>
                <CardFooter className="text-md font-semibold justify-end text-[#beaf87]">
                    <p>Vendedor</p>
                </CardFooter>
            </Card>
        </div>
    );
}
