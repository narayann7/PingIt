const { google } = require("googleapis");
const axios = require("axios").default;
require('dotenv').config()

const googleConfig = {
  clientID: process.env.googleClientID,
  clientSecret: process.env.googleClientSecret,
  redirect: "http://localhost:3001/api/auth/google/callback",
};




const defaultScope = [
    "https://www.googleapis.com/auth/plus.me",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];
  

  function createConnection() {
    return new google.auth.OAuth2(
      googleConfig.clientID,
      googleConfig.clientSecret,
      googleConfig.redirect
    );
  }
  
  function getConnectionUrl(auth) {
    return auth.generateAuthUrl({
      access_type: "offline",
      prompt: "consent",
      scope: defaultScope,
    });
  }

  function getGooglePlusApi(auth) {
    return google.plus({ version: "v1", auth });
  }
  
  function urlGoogle() {
    const auth = createConnection();
    const url = getConnectionUrl(auth);
    return url;
  }
  

  async function getGoogleAccountFromCode(code) {
    const auth = createConnection();
    const { tokens } = await auth.getToken(code);
    // console.log(auth.credentials);
    var getUserUrl =
      "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=";
    getUserUrl += tokens.access_token;
  
    var result = await axios.get(getUserUrl);
    if (result.status === 200) {
      return result.data;
    }
    return null;
  }

module.exports = { urlGoogle, getGoogleAccountFromCode };
