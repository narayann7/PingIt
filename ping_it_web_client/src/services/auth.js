import Urls from "./urls";
import api from "./axios_api";
import ErrorHandler from "../models/ErrorModel";

export default class Auth {
  static getRefreshToken() {
    var result = localStorage.getItem("refreshToken");
    return result;
  }
  static deleteRefreshToken() {
    localStorage.removeItem("refreshToken");
  }
  static updateRefreshToken(refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  static async signup({ email, password, username, otp_token, otp }) {
    try {
      var result = await api.post(Urls.serverSignupUrl, {
        email,
        password,
        username,
        otp_token,
        otp,
      });
      if (result.status === 200) {
        this.updateRefreshToken(result.data.refreshToken);

        var accessToken = result.data.accessToken;

        return {
          accessToken,
          refreshToken: result.data.refreshToken,
          user: result.data.user,
        };
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }

  static async sendOtp({ email, password, username }) {
    try {
      var result = await api.post(Urls.sendOtpUrl, {
        email,

        password,
        username,
      });
      if (result.status === 200) {
        localStorage.setItem(
          "otp_data",
          JSON.stringify({
            email: result.data.email,
            password: result.data.password,
            username: result.data.username,
            otp_token: result.data.otp_token,
          })
        );
        return {
          otp_token: result.data.otp_token,
        };
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }

  static async login({ email, password }) {
    try {
      var result = await api.post(Urls.serverLoginUrl, { email, password });
      if (result.status === 200) {
        this.updateRefreshToken(result.data.refreshToken);
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
        this.updateRefreshToken(result.data.refreshToken);
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
