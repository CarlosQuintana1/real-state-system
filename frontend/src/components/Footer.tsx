export default function Footer() {
    return (
        <footer className="w-full">
            <div className="grid grid-cols-2 gap-6 bg-[#252525] text-white">
                <div className="justify-self-center flex items-center">
                    <div className="w-full">
                        <img src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg" width="200" height="200" alt="Century 21 Logo" draggable={false}/>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 m-6">
                    <div>
                        <h4>Empresa</h4>
                        <ul>
                            <li><a href="#">Nosotros</a></li>
                            <li><a href="#">Legal</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Servicios</h4>
                        <ul>
                            <li><a href="#">Comprar</a></li>
                            <li><a href="#">Vender</a></li>
                            <li><a href="#">Rentar</a></li>
                            <li><a href="#">Asesoría</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4>Recursos</h4>
                        <ul>
                            <li><a href="#">Guías</a></li>
                            <li><a href="#">Preguntas frecuentes</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="bg-[#303030] text-white text-center p-4">
                <p>©️ 2025 Century 21. Todos los derechos reservados.</p>
                <div className="flex gap-4 justify-center m-2">
                    <a href="#">Política de privacidad</a>
                    <a href="#">Términos de servicio</a>
                </div>
            </div>
        </footer>
    )
}