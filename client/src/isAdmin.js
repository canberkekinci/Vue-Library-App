import { useAuthStore } from "./stores/auth";

function isAdmin() {
    const auth = useAuthStore();
    const role = auth.user.role;

    if (role !== "admin") {
        return false;
    }
    else if (role === "admin") {
        return true;
    }
}

export default isAdmin;
