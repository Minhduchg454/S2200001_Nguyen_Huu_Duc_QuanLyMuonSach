import createApiClient from "./api.service";

class TheoDoiMuonSachService {
    constructor(baseUrl = "/api/theodoimuonsach") {
        this.api = createApiClient(baseUrl);
    }

    async getAll(params = {}) {
    return (await this.api.get("/", { params })).data;
}

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }

    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
}

export default new TheoDoiMuonSachService();