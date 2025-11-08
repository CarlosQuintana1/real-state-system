import {useState} from "react";

export default function Search() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        console.log("Buscando: ", query);
    }

    return (
        <div className="grid grid-rows-2 w-full p-12">
            <h1 className="text-2xl text-center">BIENVENIDO/A</h1>
            <div className="flex justify-center w-full">
                <input type="text" placeholder="Casa, departamento ..." value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="w-1/2 p-3 focus:outline-none border"
                />
                <button type="button" onClick={handleSearch} className="btn-primary cursor-pointer">
                    Buscar
                </button>
                {results.length > 0 && (
                    <div className="mt-4">
                        {/*Aqui se mostraran los resultados*/}
                    </div>
                )}
            </div>
        </div>
    );
}