import api from './api';
import TokenService from "../services/token.service";
import axios from "axios";
import SERV from "../constants/server";

class UserService {
    #baseUrl = "user"


    async signIn({email, password}) {
        const options = {
            email,
            password,
        }

        const response = await axios.post(`${SERV}/token/`, {...options})
        TokenService.setLocalAccessToken(response.data.access)
        TokenService.setLocalRefreshToken(response.data.refresh)

        return response.data
    }

    async signUp(data) {
        return await api.post(`${this.#baseUrl}/`, data)
    }

    async userInfo() {
        try {
            return api.get(`${this.#baseUrl}/me/`)
        } catch (err) {
            return err
        }
    }
}

export default new UserService();