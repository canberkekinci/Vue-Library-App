import { useAuthStore } from "./stores/auth";

function isAuthenticated() {
    const auth = useAuthStore();
    const user = auth.user;
    
    return !!user;
}

export default isAuthenticated;