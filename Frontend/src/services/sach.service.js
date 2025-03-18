import createApiClient from "./api.service";

class SachService {
    constructor(baseUrl = "/api/sach") {
        this.api = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.api.get("/")).data;
    }

    async create(data) {
        return (await this.api.post("/", data,)).data;
    }
    /*
    async create(data, token) {
        return (await this.api.post("/", data, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    }    
    
    */


    async deleteAll(token) {
        return (await this.api.delete("/")).data;
    }

    async get(id) {
        return (await this.api.get(`/${id}`)).data;
    }


    async update(id, data) {
        return (await this.api.put(`/${id}`, data,)).data;
    }

    /*
    async update(id, data, token) {
        return (await this.api.put(`/${id}`, data, {
            headers: { Authorization: `Bearer ${token}` }
        })).data;
    }
    */

    async delete(id) {
        return (await this.api.delete(`/${id}`,)).data;
    }
}

export default new SachService();