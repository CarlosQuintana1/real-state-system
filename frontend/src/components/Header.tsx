import {Link, useNavigate} from "react-router-dom";

export default function Header(){
    const navigate = useNavigate();

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
                    <img src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg" alt="Century 21 Logo" draggable={false}/>
                </div>
                    <nav className="flex justify-center">
                        <ul className="flex flex-row gap-6 items-center">
                            <li><Link to="/properties">Propiedades</Link></li>
                            <li><Link to="/services">Servicios</Link></li>
                            <li><Link to="/contact">Contacto</Link></li>
                        </ul>
                    </nav>
                <div className="flex justify-end pr-4 gap-4">
                    <button onClick={handleLoginClick} type="button" className="hover:bg-white hover:text-black border-2 p-2 text-sm rounded-md">Iniciar Sesion</button>
                    <button onClick={handleSignupClick} type="button" className="bg-white text-black text-sm p-2 rounded-md">Registrarse</button>
                </div>
            </div>
        </header>
    );
}