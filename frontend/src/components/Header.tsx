import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../hooks/useAuth.js";
import MobileMenu from "../hooks/MobileMenu";
import {forceScrollTop} from "../utils/scrollToTop";

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
                <div className="md:w-1/3 pl-4">
                    <Link to="/" onClick={forceScrollTop}>
                        <img
                            src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg"
                            alt="Century 21 Logo"
                            draggable={false}
                        />
                    </Link>
                </div>
                <nav className="hidden md:flex justify-center">
                        <ul className="flex flex-row gap-6 items-center">
                            <li><Link to="/properties" onClick={forceScrollTop}>Propiedades</Link></li>
                            <li><Link to="/services" onClick={forceScrollTop}>Servicios</Link></li>
                            <li><Link to="/seller" onClick={forceScrollTop}>Vendedores</Link></li>
                            <li><Link to="/contact" onClick={forceScrollTop}>Contacto</Link></li>
                        </ul>
                </nav>
                <div className="hidden md:flex justify-end pr-4 gap-4">
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
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1"
                                    />
                                </svg>

                            </button>
                    )}
                </div>
            </div>
            <div className="flex md:hidden justify-end pr-4">
                <MobileMenu/>
            </div>
        </header>
    );
}