import axios from "axios";
import { globalVariables } from "./Globals";
const { API_URL } = globalVariables;
// Add a response interceptor
axios.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
const APIUtility = {
  getThresholdData: function(token) {
    return axios({
      method: "get",
      url: API_URL + "/users/get-user-thresholds",
      headers: {
        Authorization: "Bearer " + token
      }
    });
  },
  setThresholdData: function(token, data) {
    return axios({
      method: "post",
      url: API_URL + "/users/add-thresholds-limits",
      headers: {
        Authorization: "Bearer " + token
      },
      data: data
    });
  },
  getPanicStatus: function(token) {
    return axios({
      method: "get",
      url: API_URL + "/check-panic-status",
      headers: {
        Authorization: "Bearer " + token
      }
    });
  },
  getUserTradeStatus: function(token) {
    return axios({
      method: "get",
      url: API_URL + "/users/get-user-trade-status",
      headers: {
        Authorization: "Bearer " + token
      }
    });
  },
  getCrypto: function(token) {
    return axios({
      method: "get",
      url: API_URL + "/get-simplex-coin-list",
      headers: {
        Authorization: "Bearer " + token
      }
    });
  },
  calculateDigitalCurrency: function(token, data) {
    return axios({
      method: "post",
      url: API_URL + "/get-qoute-details",
      headers: {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json"
      },
      data: data
    });
  }
};
export { APIUtility };
