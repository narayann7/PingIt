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
  static async getAccessToken(refreshToken) {
        console.log("1");
    
    api
      .post(Urls.getAccessTokenUrl, { refreshToken })
      .then((response) => {
        console.log("2");

        console.log(response.data);

        if (response.status === 200) {
          console.log(response.data);
          this.updateRefreshToken(response.data.refreshToken);
          var accessToken = response.data.accessToken;
          return {
            accessToken,
            refreshToken,
          };
        }
      })
      .catch((error) => {
        console.log("3");

        var errorx = new ErrorHandler({
          message: error.response.data.message,
          statusCode: error.response.statusCode,
        });
        return errorx;
      });
      console.log("4");

  }
}
