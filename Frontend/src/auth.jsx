import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        user: null,
        token: "",
    });

    useEffect(() => {
        const storedAuth = localStorage.getItem("auth");
        if (storedAuth) {
            const parsedAuth = JSON.parse(storedAuth);
            setAuth(parsedAuth);
            if (parsedAuth.token) {
                axios.defaults.headers.common["Authorization"] = `Bearer ${parsedAuth.token}`;
            }
        }
    }, []);

    useEffect(() => {
        if (auth?.token) {
            axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
        } else {
            delete axios.defaults.headers.common["Authorization"];
        }
        localStorage.setItem("auth", JSON.stringify({ user: auth.user, token: auth.token }));
    }, [auth]);

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {children}
        </AuthContext.Provider>
    );
};

const useAuth = () => {
    return useContext(AuthContext); // Trả về context đúng cách
};

export { AuthProvider, useAuth };
