import BaseHttpService from "./base-http.service";

export default class ProvinceService extends BaseHttpService {
  BASE_ROUTE = "province";
  getAllProvinces(query = "", options = {}) {
    return this.get(`${this.BASE_ROUTE}${query}`, options);
  }

  create(data) {
    return this.post(`${this.BASE_ROUTE}`, data);
  }

  update(data) {
    return this.put(`${this.BASE_ROUTE}`, data);
  }

  remove(id) {
    return this.delete(`${this.BASE_ROUTE}/${id}`);
  }

  getProvinceImages(id, options = {}) {
    return this.get(`${this.BASE_ROUTE}/${id}/images`, options);
  }
}
