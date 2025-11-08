import Search from "../components/Search.tsx";

export default function Home() {
    return (
        <>
            <div className="h-[640px] bg-amber-50 -m-4">
                <Search/>
                <div>
                    {/*Aqui va la imagen de fondo*/}
                </div>
            </div>
            <div className="h-auto flex flex-col items-center p-6">
                <div className="text-center w-[500px] p-8">
                    <h2 className="font-bold text-2xl pb-2 text-[#38383a]">CENTURY 21®: Tu Agencia de Bienes Raíces de Confianza en México</h2>
                    <p className="font-semibold text-md">Otorgando el 121%</p>
                    <p className="font-light text-xl pt-6 -ml-10 -mr-10 text-justify">
                        Solo la marca CENTURY 21® tiene la escala y la reputación para liderar la
                        industria de bienes raíces hacia el futuro. Mientras que otros se enfocan
                        simplemente en facilitar una transacción, los asesores de CENTURY 21® creen
                        en el valor de brindar experiencias extraordinarias desafiando la mediocridad
                        y siempre otorgando el 121%.
                    </p>
                </div>
                <div className="mb-4 p-4 text-white bg-[#38383a] text-center text-2xl w-[500px]">
                    <span>SOMOS UNA RED GLOBAL</span><br/>
                    <span>DE ESPECIALISTAS LOCALES.</span>
                    <img src="https://century21mexico.com/img/c21mx/index/mapac21.png" alt="Mapa de Century 21" width="500" height="500" className="object-contain"/>
                </div>
            </div>
            <div className="h-[640px]">
                <h1 className="font-bold text-2xl">Encuentra un Asesor</h1>
                {/*Más info de la empresa*/}
            </div>
        </>
    )
}