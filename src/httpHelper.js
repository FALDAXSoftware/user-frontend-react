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
  }
};
export { APIUtility };
