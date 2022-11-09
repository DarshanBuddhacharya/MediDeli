import {AxiosResponse} from "axios";
import {createContext, useState} from "react";

type AuthTypes = {
    token: string | null | undefined;
    isAuthenticated: boolean;
    authenticate: (token: string) => void;
    logout: () => void;
};

export const AuthContext = createContext<AuthTypes>({
    token: "",
    isAuthenticated: false,
    authenticate: () => {},
    logout: () => {},
});

const AuthContextProvider = ({children}: {children: React.ReactNode}) => {
    const [authToken, setAuthToken] = useState<string | null>();

    const authenticate = (token: string) => {
        setAuthToken(token);
    };

    const logout = () => {
        setAuthToken(null);
    };

    const value = {
        token: authToken,
        isAuthenticated: !!authToken,
        authenticate: authenticate,
        logout: logout,
    };
    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};

export default AuthContextProvider;
