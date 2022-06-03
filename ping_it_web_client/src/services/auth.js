import Urls from "./urls";
import api from "./axios_api";
import ErrorHandler from "../models/ErrorModel";

export default class Auth {
  static getRefreshToken() {
    return localStorage.getItem("refreshToken");
  }
  static deleteRefreshToken() {
    localStorage.removeItem("refreshToken");
  }
  static updateRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  static async login({ email, password }) {
    try {
      var result = await api.post(Urls.serverLoginUrl, { email, password });
      if (result.status === 200) {
        console.log(result.data);
        this.updateRefreshToken(result.data.refreshtoken);
        var accessToken = result.data.accessToken;
        return {
          accessToken,
          refreshToken: result.data.refreshToken,
        };
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }

  static async getAccessToken(refreshtoken) {
    try {
      var result = await api.post(Urls.getAccessTokenUrl, { refreshtoken });
      if (result.status === 200) {
        console.log(result.data);
        this.updateRefreshToken(result.data.refreshtoken);
        var accessToken = result.data.accessToken;
        return {
          accessToken,
          refreshToken: refreshtoken,
        };
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }
}

/*
how to use


    var refreshtoken = Auth.getRefreshToken();
    var result = await Auth.getAccessToken(refreshtoken);
    if (result instanceof ErrorHandler) {
      console.log(result);
    } else {
      console.log(result);
    }


*/
