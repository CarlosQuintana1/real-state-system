import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";

export function useAuth() {
    const navigate = useNavigate();

    const isAuthenticated = !!Cookies.get("access_token");

    const logout = () => {
        Cookies.remove("access_token");
        navigate("/");
    };

    return { isAuthenticated, logout };
}