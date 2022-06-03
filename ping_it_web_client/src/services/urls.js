class Urls {
  static serverBaseUrl = process.env.REACT_APP_SERVER_BASE_URL;
  static clientBaseUrl = process.env.REACT_APP_BASE_URL;
  static serverLoginUrl = `${Urls.serverBaseUrl}/api/auth/login`;
  static severLoginWithGoogleUrl = `${Urls.serverBaseUrl}/api/auth/google`;
  static serverSignupUrl = `${Urls.clientBaseUrl}/signup`;
  static serverTestUrl = `${Urls.serverBaseUrl}/test`;
  static getAccessTokenUrl = `${Urls.serverBaseUrl}/api/auth/getaccesstoken`;
}

export default Urls;
