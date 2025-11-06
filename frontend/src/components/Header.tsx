export default function Header(){
    return (
        <header className="flex bg-[#252525] text-white text-md">
            <div className="">
                <div className="">
                    <img src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg" alt="Century 21 Logo"/>
                </div>
                <nav className="">
                    <ul className="">
                        <li><a href="#">Propiedades</a></li>
                        <li><a href="#">Servicios</a></li>
                        <li><a href="#">Contact</a></li>
                    </ul>
                </nav>
                <div className="">
                    <a href="#" className="bg-[#] text-white p-2">Iniciar Sesion</a>
                    <a href="#" className="bg-black text-white p-2">Registrar</a>
                </div>
            </div>
        </header>
    );
}