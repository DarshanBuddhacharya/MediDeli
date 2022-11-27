// import { REACT_APP_DEV_MODE } from "@env";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import type { AxiosError } from "axios";
// import axios from "axios";
// import { useContext } from "react";
// import { AuthContext } from "../Store/auth-context";


// const getApiEndpoint = () => {
//     const url = REACT_APP_DEV_MODE;
//     if (url === undefined)
//         throw new Error(
//             "Please specify an API endpoint in the environment variable REACT_APP_DEV_MODE",
//         );
//     return url;
// };

// const axiosClient = axios.create({
//     baseURL: getApiEndpoint(),
// });
// axiosClient.interceptors.request.use(
//     async config => {
//         const accessToken = await AsyncStorage.getItem('access');
//         if (accessToken) {
//             config.headers = {
//                 ...config.headers,
//                 Authorization: `Bearer ${accessToken}`,
//             };
//         }
//         return config;
//     },
//     error => Promise.reject(error),
// );
// axiosClient.interceptors.response.use(
//     response => response,
//     async error => {
//         const accessToken = await AsyncStorage.getItem('access');
//         const refreshToken = await AsyncStorage.getItem('refresh');
//         const axiosError = error as AxiosError<{ code: string }>;
//         if (axiosError.response?.status === 401) {
//             // const errorCode = axiosError.response?.data?.code;
//             // if (errorCode === "user_not_found") {
//             //     getToken()?.logout();
//             //     return;
//             // }
//             const access = accessToken;
//             const refresh = refreshToken;

//             if (!access || !refresh) return Promise.reject(error);
//         }
//         return Promise.reject(error);
//     },
// );

// export { axiosClient };
import { REACT_APP_DEV_MODE } from "@env";
import type { AxiosError } from "axios";
import axios from "axios";
import { compareAsc, fromUnixTime } from "date-fns";
import jwtDecode from "jwt-decode";
import { useContext } from "react";
import { MMKV } from "react-native-mmkv";
import { authenticate, logout } from "../features/auth/authSlice";
import { useAppDispatch } from "../features/hooks";

const getApiEndpoint = () => {
    const url = REACT_APP_DEV_MODE;
    if (url === undefined)
        throw new Error(
            "Please specify an API endpoint in the environment variable NEXT_PUBLIC_API_URL"
        );
    return url;
};

const storage = new MMKV()

const tokenJson = storage.getString('user')

const token = JSON?.parse(tokenJson ? tokenJson : '')

const isTokenExpired = (token: string) => {
    const { exp } = jwtDecode<{ exp: number }>(token);
    const tokenExpirationDate = fromUnixTime(exp);
    const currentTime = new Date();
    return compareAsc(tokenExpirationDate, currentTime) === -1;
};

const refreshAuthTokens = async (refreshToken: string) => {
    const url = new URL("refresh/", getApiEndpoint());
    const dispatch = useAppDispatch()
    fetch(url.href, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({ refresh: refreshToken }),
    })
        .then((res) => res.json())
        .then((data) => {
            const { access, refresh } = <{ access: string; refresh: string }>(
                data
            );
            dispatch(authenticate(data));
        })
        .catch(() => dispatch(logout()));
};

const axiosClient = axios.create({
    baseURL: getApiEndpoint(),
});

axiosClient.interceptors.request.use(
    async (config) => {
        if (token.token.access && !isTokenExpired(token.token.access)) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${token.token.access}`,
            };
        }
        return config;
    },
    (error) => Promise.reject(error)
);
axiosClient.interceptors.response.use(
    (response) => response,
    async (error) => {
        const axiosError = error as AxiosError<{ code: string }>;
        if (axiosError.response?.status === 401) {
            const errorCode = axiosError.response?.data?.code;
            const access = token.token.access;
            const refresh = token.token.refresh;

            if (!access || !refresh) return Promise.reject(error);

            if (isTokenExpired(access)) {
                refreshAuthTokens(refresh);
            }
        }
        return Promise.reject(error);
    }
);

export { axiosClient };
