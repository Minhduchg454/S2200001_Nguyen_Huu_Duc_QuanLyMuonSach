import createApiClient from "./api.service";

class XacThucService {
    constructor(baseUrl = "/api/xacthuc") {
        this.api = createApiClient(baseUrl);
    }

    async dangKy(data) {
        return (await this.api.post("/dangky", data)).data;
    }

    async dangNhap(data) {
        return (await this.api.post("/dangnhap", data)).data;
    }
}

export default new XacThucService();