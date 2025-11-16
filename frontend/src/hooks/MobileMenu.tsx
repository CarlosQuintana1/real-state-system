import {
    Avatar,
    Button,
    Drawer,
    DrawerBody,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    Tooltip,
    useDisclosure,
} from "@heroui/react";
import { HiOutlineMenu } from "react-icons/hi";
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {forceScrollTop} from "../utils/scrollToTop";
import {getUserFromToken} from "../utils/getUserFromToken";

export default function MobileMenu() {
    const [active, setActive] = useState("Home");
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const user = getUserFromToken();
    const user_id = user?.id;

    const handleLoginClick = (onClose: () => void) => {
        navigate("/login");
        onClose();
    };

    const handleSignupClick = (onClose: () => void) => {
        navigate("/signup");
        onClose();
    };

    const handleLogoutClick = (onClose: () => void) => {
        logout();
        onClose();
    };

    const navItemsMobile = [
        { id: "properties", name: "Propiedades", href: "/properties" },
        { id: "services", name: "Servicios", href: "/services" },
        { id: "seller", name: "Vendedores", href: "/seller" },
        { id: "contact", name: "Contacto", href: "/contact" },
    ];

    return (
        <>
            <div className="md:hidden">
                <Button isIconOnly radius="lg" variant="light" onPress={onOpen}>
                    <HiOutlineMenu size={25} color="white" />
                </Button>
            </div>

            <Drawer
                hideCloseButton
                size="xs"
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                className="select-none bg-[#252525] text-white"
            >
                <DrawerContent>
                    {(onClose: () => void) => (
                        <>
                            <DrawerHeader
                                className="absolute top-0 inset-x-0 z-50 flex flex-row gap-2 px-2 py-2
                                border-b border-default-200/50 justify-between bg-content1/50
                                backdrop-saturate-150 backdrop-blur-lg"
                            >
                                <Tooltip content="Cerrar" className="text-white">
                                    <Button
                                        isIconOnly
                                        className="text-default-400"
                                        size="sm"
                                        variant="light"
                                        radius="lg"
                                        onPress={onClose}
                                    >
                                        <svg
                                            fill="none"
                                            height="20"
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            viewBox="0 0 24 24"
                                            width="20"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path d="m13 17 5-5-5-5M6 17l5-5-5-5" />
                                        </svg>
                                    </Button>
                                </Tooltip>
                            </DrawerHeader>

                            <DrawerBody className="pt-16">
                                <div className="grid grid-cols-1 mb-6">
                                    {navItemsMobile.map((item) => (
                                        <button
                                            key={item.id}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                setActive(item.id);
                                                navigate(item.href);
                                                onClose();
                                            }}
                                            className={`p-4 text-center text-lg font-extralight 
                                                ${
                                                active === item.id
                                                    ? "font-bold text-[#beaf87]"
                                                    : "transition hover:text-[#beaf87] text-white"
                                            }`}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>

                                <div className="flex flex-col gap-3 items-center">
                                    {!isAuthenticated ? (
                                        <>
                                            <button
                                                onClick={() => handleLoginClick(onClose)}
                                                className="w-3/4 border-2 border-white hover:bg-white hover:text-black p-2 text-sm rounded-md cursor-pointer"
                                            >
                                                Iniciar Sesión
                                            </button>
                                            <button
                                                onClick={() => handleSignupClick(onClose)}
                                                className="w-3/4 bg-white text-black text-sm p-2 rounded-md cursor-pointer"
                                            >
                                                Registrarse
                                            </button>
                                        </> ) : (
                                            <>
                                                <div className="flex flex-row gap-4 items-center" draggable={false} onClick={onClose}>
                                                <Link to={`/user/${user_id}`} onClick={forceScrollTop}
                                                      className="p-2 bg-white  text-black text-lg rounded-lg cursor-pointer"
                                                >
                                                    <div className="flex flex-row gap-2 items-center" draggable={false}>
                                                    <Avatar showFallback className="p-2"/>
                                                        <p>Ver Perfil</p>
                                                    </div>
                                                </Link>
                                                <button onClick={logout} type="button" className="flex flex-row gap-2 items-center text-white hover:text-red-400 border-1 text-lg p-2 rounded-lg cursor-pointer">
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
                                                    <p>Cerrar Sesión</p>
                                                </button>
                                                </div>
                                            </>
                                    )}
                                </div>
                            </DrawerBody>

                            <DrawerFooter className="flex items-center justify-center gap-4">
                                <img
                                    src="https://century21mexico.com/img/c21mx/c21MexWebRGold.svg"
                                    alt="Century 21 Logo"
                                    draggable={false}
                                    className="w-40 h-40 object-contain"
                                />
                            </DrawerFooter>
                        </>
                    )}
                </DrawerContent>
            </Drawer>
        </>
    );
}
