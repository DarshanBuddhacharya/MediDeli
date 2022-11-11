import axios, {AxiosResponse} from "axios";
import {createContext, useEffect, useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {REACT_APP_DEV_MODE} from "@env";

type AuthTypes = {
    token: {access: string; refresh: string} | null | undefined;
    isAuthenticated: boolean;
    authenticate: (token: {access: string; refresh: string}) => void;
    update: () => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthTypes>({
    token: {access: "", refresh: ""},
    isAuthenticated: false,
    authenticate: () => {},
    update: () => {},
    logout: () => {},
});

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authToken, setAuthToken] = useState<{
        access: string;
        refresh: string;
    } | null>();
    const authenticate = (token: {access: string; refresh: string}) => {
        setAuthToken(token);
        AsyncStorage.setItem("access", token.access);
        AsyncStorage.setItem("refresh", token.refresh);
    };

    const logout = () => {
        setAuthToken(null);
        AsyncStorage.removeItem("access");
        AsyncStorage.removeItem("refresh");
    };

    const updateToken = () => {
        const response =
            authToken &&
            axios
                .post(`${REACT_APP_DEV_MODE}refresh/`, {
                    refresh: authToken.refresh,
                })
                .then(res => authenticate(res.data))
                .catch(err => {
                    console.log("taht", err.response.data), logout();
                });
    };

    useEffect(() => {
        const timeoutvalue = 1500 * 100 * 10;
        const interval = setInterval(() => {
            if (authToken) {
                updateToken();
            }
        }, timeoutvalue);

        return () => clearInterval(interval);
    }, [authToken]);

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        update: updateToken,
        logout: logout,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
