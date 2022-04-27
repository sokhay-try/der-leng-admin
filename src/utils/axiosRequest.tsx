import axios from "axios";
import { BASE_API } from "../constants";

const instance = axios.create({
  baseURL: BASE_API,
  method: "POST",
});
// const getToken = () => {
//   const auth = getFromLocalStorage("authentication", {});
//   return auth.access_token;
//};
instance.interceptors.request.use(
  async function (config) {
    config.headers = {
      //   Authorization: `Bearer ${getToken()}`,
    };

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  function (response) {
    if (response.data.error && response.data.error !== 0) {
      return Promise.reject(response.data);
    }
    return response;
  },
  function (err) {
    return Promise.reject(err);
  }
);

export { instance as axiosRequest };
