import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { loginSuccess } from './redux/authSlice';
const refreshToken = async () => {
    try {
        const res = await axios.post("/api/auth/refresh-token", {
            withCredentials: true
        });
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export const createAxios = (user, dispatch) => {
    const newInstance = axios.create();

    newInstance.interceptors.request.use(
        async (config) => {
            let date = new Date();
            const decodedToken = jwt_decode(user?.token);
            if (decodedToken.exp < date.getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...user,
                    token: data.token
                }
                dispatch(loginSuccess(refreshUser));
                config.headers["authorization"] = data.token;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    )
    return newInstance;
}