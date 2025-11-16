import Cookies from "js-cookie";

export function getUserFromToken() {
    const token = Cookies.get("access_token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload;
    } catch {
        return null;
    }
}
