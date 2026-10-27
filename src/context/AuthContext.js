"use client";

import {createContext, useCallback, useContext, useEffect, useState} from "react";
import {request} from "@/lib/api";

const AuthContext = createContext(null);

export function AuthProvider({children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem("token")) return setLoading(false);
        request("/auth/me")
            .then(setUser)
            .catch(() => localStorage.removeItem("token"))
            .finally(() => setLoading(false));
    }, []);

    const saveSession = useCallback((session) => {
        localStorage.setItem("token", session.accessToken);
        setUser(session.user);
        window.dispatchEvent(new Event("auth-changed"));
    }, []);

    const login = useCallback(
        async (credentials) => saveSession(await request("/auth/login", {method: "POST", body: credentials})),
        [saveSession],
    );

    const register = useCallback(
        async (payload) => saveSession(await request("/auth/register", {method: "POST", body: payload})),
        [saveSession],
    );

    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setUser(null);
        window.dispatchEvent(new Event("auth-changed"));
    }, []);

    return (
        <AuthContext.Provider value={{user, loading, login, register, logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
