import Urls from "./urls";
import api from "./axios_api";

class Auth {
  checkUser() {
    let refreshtoken = this.getRefreshToken();
    if (refreshtoken) {
      api
        .post(Urls.getAccessTokenUrl, { refreshtoken })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            console.log(response.data);
            return true;
          }
        })
        .catch((error) => {
          console.log(error);
          return false;
        });
    } else {
      return false;
    }
    //callback
  }
  getRefreshToken() {
    let refreshtoken = localStorage.getItem("refreshToken");
    if (refreshtoken) {
      return refreshtoken;
    } else {
      return null;
    }
  }
}

export default new Auth();
