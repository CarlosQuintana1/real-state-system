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
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                {error && <p>{error}</p>}
                <input
                    type="email"
                    placeholder="Correo"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="submit"
                >
                    Iniciar Sesion
                </button>
            </form>
        </div>
    );
}