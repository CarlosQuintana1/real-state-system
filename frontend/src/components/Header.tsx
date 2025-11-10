import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";

export default function Header(){
    const navigate = useNavigate();
    const {isAuthenticated, logout } = useAuth();

    const handleLoginClick = () => {
        navigate("/login");
    }

    const handleSignupClick = () => {
        navigate("/signup");
    }

    return (
        <header className="w-full sticky top-0 z-50 flex bg-[#252525] text-white text-md justify-items-center p-2" draggable={false}>
            <div className="w-full grid grid-cols-3 items-center">
                <div className="w-1/3 pl-4">
                    <Link to="/">
                        <img src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg" alt="Century 21 Logo" draggable={false}/>
                    </Link>
                </div>
                    <nav className="flex justify-center">
                        <ul className="flex flex-row gap-6 items-center">
                            <li><Link to="/properties">Propiedades</Link></li>
                            <li><Link to="/services">Servicios</Link></li>
                            <li><Link to="/seller">Vendedores</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                        </ul>
                    </nav>
                <div className="flex justify-end pr-4 gap-4">
                    { !isAuthenticated ? (
                        <>
                            <button onClick={handleLoginClick} type="button" className="hover:bg-white hover:text-black border-2 p-2 text-sm rounded-md cursor-pointer">
                                Iniciar Sesion
                            </button>
                            <button onClick={handleSignupClick} type="button" className="bg-white text-black text-sm p-2 rounded-md cursor-pointer">
                                Registrarse
                            </button>
                        </> ) : (
                            <button onClick={logout} type="button" className="bg-red-500 text-white text-sm p-2 rounded-md cursor-pointer">
                                Cerrar Sesión
                            </button>
                    )}
                </div>
            </div>
        </header>
    );
}