import ErrorHandler from "../models/ErrorModel";
import Auth from "./auth";
import api from "./axios_api";
import Urls from "./urls";

class UserService {
  static async getMe() {
    var refreshToken = Auth.getRefreshToken();

    var result = await Auth.getAccessToken(refreshToken);
    if (result instanceof ErrorHandler) {
      return result;
    }
    var accessToken = result.accessToken;
    let config = {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        refreshtoken: refreshToken,
      },
    };
    try {
      var result2 = await api.get(Urls.serverGetMeUrl, config);
      if (result2.status === 200) {
        return result2.data;
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }
  static getMeFromLocalStorage() {
    var result = localStorage.getItem("user_me");
    return JSON.parse(result);
  }
  static setMeLocalStorage(user) {
    localStorage.setItem("user_me", JSON.stringify(user));
  }
  static deleteMeLocalStorage() {
    localStorage.removeItem("user_me");
  }

  static async searchUser(searchText) {
    try {
      var refreshToken = Auth.getRefreshToken();

      var result = await Auth.getAccessToken(refreshToken);
      if (result instanceof ErrorHandler) {
        return result;
      }
      var accessToken = result.accessToken;
      let config = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          refreshtoken: refreshToken,
        },
      };
      var url = Urls.serverGetUserUrl + "?name=" + searchText;
      result = await api.get(url, config);
      if (result.status === 200) {
        await timeout(1000);
          return result.data;
      }
    } catch (error) {
      return new ErrorHandler({
        message: error.response.data,
        statusCode: error.response.status,
      });
    }
  }
}
function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}
export default UserService;
