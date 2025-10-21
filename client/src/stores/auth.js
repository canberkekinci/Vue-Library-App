// src/stores/auth.js
import { defineStore } from "pinia";
import { jwtDecode } from "jwt-decode";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    accessToken: "",
    user: null,
  }),
  actions: {
    setUser(token) {
      this.accessToken = token;
      try {
        const decoded = jwtDecode(token);
        this.user = {
          id: decoded.id,
          username: decoded.username,
          email: decoded.email,
          role: decoded.role,
        };
      } catch {
        this.user = null;
      }
    },
    clearUser() {
      this.accessToken = "";
      this.user = null;
    },
  },
});
