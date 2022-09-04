import api from "./api";

class PrizeRequestApi {
    #baseUrl = "prize/request/"

    async getListUserRequests() {
        return await api.get(`${this.#baseUrl}/me`)
    }
}

export default new PrizeRequestApi()