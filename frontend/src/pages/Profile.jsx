import { Card, CardBody, CardFooter, CardHeader, Image } from "@heroui/react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUser } from "../services/sellerService.js";

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

        fetchUser();
    }, [user_id]);

    const handleEdit = () => {
        console.log("Editar usuario");
        // Aquí puedes abrir un modal o navegar a /user/edit/:id
    };

    if (loading) return <p>Cargando perfil...</p>;
    if (error) return <p>{error}</p>;
    if (!user) return <p>Usuario no encontrado</p>;

    return (
        <div className="h-[620px] w-full flex items-center justify-center">
            <Card className="bg-gray-100 w-[1200px] h-[500px] rounded-2xl p-4 flex flex-col">
                <CardHeader className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">Perfil</h1>

                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 bg-[#beaf87] text-white px-4 py-2 rounded-xl hover:bg-black transition"
                    >
                        Editar
                    </button>
                </CardHeader>

                <CardBody className="flex flex-row gap-6 flex-1">
                    <div className="w-1/2 flex justify-center items-center">
                        <Image
                            src="https://res.cloudinary.com/drxg6xc6a/image/upload/v1763328979/photo_iozasp.jpg"
                            width={500}
                            height={500}
                            className="object-contain shadow-lg"
                        />
                    </div>

                    <div className="bg-white border rounded-2xl p-6 w-1/2 shadow-sm flex flex-col justify-between">
                        <div className="space-y-4">
                            <Detail label="Nombre" value={user.name} />
                            <Detail label="Correo" value={user.email} />
                            <Detail label="Contraseña" value="********" />
                        </div>
                    </div>
                </CardBody>

                <CardFooter className="text-lg font-semibold justify-end text-[#beaf87]">
                    <p>Tipo de cuenta: {user.role}</p>
                </CardFooter>
            </Card>
        </div>
    );
}

function Detail({ label, value }) {
    return (
        <p className="text-lg">
            <span className="font-semibold text-gray-700">{label}: </span>
            <span className="text-gray-900">{value}</span>
        </p>
    );
}
