import api from "./api";

class PrizeRequestApi {
    #baseUrl = "prize/request"

    async getListUserRequests() {
        return await api.get(`${this.#baseUrl}/me/`)
    }
    async creatingRequestForGift(prize) {
        return await api.post(`${this.#baseUrl}/`, prize)
    }
}

export default new PrizeRequestApi()