import api from "./api";

class AdvertisementApi {
    #baseUrl = "advertisement"

    async fetch() {
        try {
            return await api.get(`${this.#baseUrl}/`)
        } catch (e) {
            return e
        }
    }

    async viewingAdsByCurrentUser(id,data) {
        try {
            return await api.post(`${this.#baseUrl}/${id}/watch/`, data)
        } catch (e) {
            return e
        }
    }
}

export default new AdvertisementApi()