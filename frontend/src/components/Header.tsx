export default function Header(){
    return (
        <header className="w-full sticky top-0 z-50 flex bg-[#252525] text-white text-md justify-items-center p-1" draggable={false}>
            <div className="w-full grid grid-cols-3 items-center">
                <div className="w-1/3 pl-4">
                    <img src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg" alt="Century 21 Logo" draggable={false}/>
                </div>
                    <nav className="flex justify-center">
                        <ul className="flex flex-row gap-6 items-center">
                            <li><a href="#">Propiedades</a></li>
                            <li><a href="#">Servicios</a></li>
                            <li><a href="#">Contact</a></li>
                        </ul>
                    </nav>
                <div className="flex justify-end pr-4">
                    <a href="#" className="text-white p-2">Iniciar Sesion</a>
                    <a href="#" className="text-white p-2">Registrar</a>
                </div>
            </div>
        </header>
    );
}