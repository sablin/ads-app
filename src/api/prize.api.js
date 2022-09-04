import api from "./api";

class PrizeApi {
    #baseUrl = 'prize'

    async fetch() {
        return await api.get(this.#baseUrl)
    }

    async getGift(data) {
        return await api.get(`${this.#baseUrl}/request/`, data)
    }

    async informationAboutGiftsById(id) {
        return await api.get(`${this.#baseUrl}/${id}`)
    }
}

export default new PrizeApi()