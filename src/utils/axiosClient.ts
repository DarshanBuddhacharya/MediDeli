import { REACT_APP_DEV_MODE } from "@env";
import type { AxiosError } from "axios";
import axios from "axios";
import { compareAsc, fromUnixTime } from "date-fns";
import jwtDecode from "jwt-decode";
import { MMKV } from "react-native-mmkv";
import { logout, refresh, storage } from "../features/auth/authSlice";
import { useAppDispatch } from "../features/hooks";

const getApiEndpoint = () => {
    const url = REACT_APP_DEV_MODE;
    if (url === undefined)
        throw new Error(
            "Please specify an API endpoint in the environment variable NEXT_PUBLIC_API_URL"
        );
    return url;
};

const getToken = () => {
    const tokenJson = storage.getString('user')
    const token = JSON?.parse(tokenJson ? tokenJson : "null")
    return token
}


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
        .then((res) => {
            console.log("🚀 ~ file: axiosClient.ts:42 ~ refreshAuthTokens ~ res", res)
            return res.json()
        })
        .then((data) => {
            console.log('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa')
            dispatch(refresh(data));
        })
        .catch(() => {
            console.log('bbbbbbbbbbbbbbbbbbbbbbbbbbb')
            dispatch(logout())
        });
};

const axiosClient = axios.create({
    baseURL: getApiEndpoint(),
});

axiosClient.interceptors.request.use(
    async (config) => {
        if (getToken().token.access && !isTokenExpired(getToken().token.access)) {
            config.headers = {
                ...config.headers,
                Authorization: `Bearer ${getToken().token.access}`,
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
            const access = getToken().token.access;
            const refresh = getToken().token.refresh;

            if (!access || !refresh) return Promise.reject(error);

            if (isTokenExpired(access)) {
                refreshAuthTokens(refresh);
            }
        }
        return Promise.reject(error);
    }
);

export { axiosClient };
