import {useState} from "react";
import {login} from "../services/authService.js";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const data = await login(email, password);
            localStorage.setItem("token", data.token);
            alert("Login exitoso");
        } catch (err) {
            setError(err.detail);
        }
    }

    return (
        <div className="">
            <form onSubmit={handleSubmit} className="flex">
                {error && <p>{error}</p>}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className=""
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className=""
                />
                <div className="flex gap-2 w-50">
                    <button type="submit" className="border-2">Iniciar Sesion</button>
                    <button type="submit" className="bg-white text-black text-sm">Registrar</button>
                </div>
            </form>
        </div>
    );
}