import {useState, useEffect } from "react";
import {login} from "../services/authService.js";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        const token = Cookies.get("access_token");
        if (token) {
            console.log("Sesión Iniciada, redireccionando a Home");
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Intentando iniciar sesion con: ", email, password);
        setError("");

        try {
            const data = await login(email, password);
            console.log("Login exitoso: ", data);
            navigate("/");
            alert("Login exitoso");
        } catch (err) {
            console.error("Error de Login: ", err);
            setError(err.detail);
        }
    }

    return (
        <div className="w-full h-screen grid grid-cols-2">
            <div className="flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col p-6 w-2/3 gap-5">
                    {error && <p>{error}</p>}
                    <label className="text-2xl font-bold">Iniciar Sesion</label>
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
                    <div className="flex flex-col gap-4">
                        <button type="submit" className="btn-primary text-[#252525] p-2 w-full rounded-md text-md font-semibold cursor-pointer">Iniciar Sesion</button>
                        <a className="text-[#999999] font-light underline cursor-pointer">¿Olvidaste tú contraseña?</a>
                    </div>
                </form>
            </div>
            <div className="flex flex-col gap-6 justify-center items-center btn-primary">
                <label className="text-2xl text-[#252525] font-extralight">¿Aún no tienes cuenta?</label>
                <button
                    type="button"
                    onClick={() => navigate("/signup")}
                    className="bg-white text-black w-1/2 p-2 rounded-md text-md  font-semibold cursor-pointer"
                >
                    Registrarse
                </button>
            </div>
        </div>
    );
}