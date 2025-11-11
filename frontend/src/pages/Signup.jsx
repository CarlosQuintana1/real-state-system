import {useState } from "react";
import {useNavigate} from "react-router-dom";
import {registerUser} from "../api/auth_signup.js";

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Intentando registrar con: ", name, email, role);
        setError("");

        try {
            const data = await registerUser({name, email, password, role});
            console.log("Registro exitoso: ", data);
            alert("Registro exitoso");
            navigate("/login");
        } catch (err) {
            console.error("Error de Registro: ", err);
            setError(err.detail);
        }
    }

    return (
        <div className="w-full h-screen md:grid md:grid-cols-2">
            <div className="flex flex-col gap-6 justify-center items-center btn-primary">
                <label className="text-2xl text-[#252525] font-extralight">¿Ya tienes cuenta?</label>
                <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="bg-white text-black w-1/2 p-2 rounded-md text-md  font-semibold cursor-pointer">
                    Iniciar Sesión
                </button>
            </div>
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col p-6 w-2/3 gap-5">
                    {error && <p>{error}</p>}
                    <label className="text-2xl font-bold">Registrarse</label>
                    <input
                        type="text"
                        placeholder="Nombre"
                        value={name}
                        onChange={(e)=> setName(e.target.value)}
                        className="border-2 p-3"
                    />

                    <input
                        type="email"
                        placeholder="Correo"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-2 p-3"
                    />
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-2 p-3"
                    />
                    <div className="flex gap-4 justify-center">
                        <input type="radio" id="client" name="userRole" value="client"
                            onChange={(e)=> setRole(e.target.value)}
                        />
                        <label id="client">Soy Cliente</label>
                        <input type="radio" id="seller" name="userRole" value="seller"
                            onChange={(e)=> setRole(e.target.value)}
                        />
                        <label id="seller">Soy Vendedor</label>
                    </div>
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="btn-primary text-[#252525] p-2 w-full rounded-md text-md font-semibold cursor-pointer">Registrarse</button>
                    </div>
                </form>
            </div>
        </div>
    );
}