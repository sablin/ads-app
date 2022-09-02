import axios from 'axios'
import TokenService from '../services/token.service'
import SERV from "../constants/server";

const axiosInstance = axios.create({
    baseURL: SERV,
    headers: {
        'Content-Type': 'application/json',
    },
})

axiosInstance.interceptors.request.use((config) => {
        const accessToken = TokenService.getLocalAccessToken()

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`
        }

        return config
    },
    (error) => Promise.reject(error)
)

axiosInstance.interceptors.response.use(
    (response) => {
        return response
    },
    async function (error) {
        const originalRequest = error?.config;

        if (error?.response?.status === 401 && error?.config && !error.config._isRetry) {
            try {
                originalRequest._isRetry = true
                await generateRefreshAccessToken()
                return axiosInstance.request(originalRequest)
            } catch (_error) {
                return Promise.reject(_error);
            }
        }
        return Promise.reject(error)
    }
)

async function generateRefreshAccessToken() {
    try {
        const localRefreshToken = TokenService.getLocalRefreshToken()

        const response = await axios.post(`${SERV}/token/refresh/`, {
            refresh: localRefreshToken
        }, {withCredentials: true})
        const {access, refresh} = await response.data

        TokenService.setLocalAccessToken(access)
        TokenService.setLocalRefreshToken(refresh)

        return {access, refresh}
    } catch (_error) {
        return _error
    }
}

export default axiosInstance
