const { urlGoogle, getGoogleAccountFromCode } = require("../services/google");

const controller = {
  loginWithGoogle: function (req, res) {
    let url = urlGoogle();
    // res.redirect(url);
    res.send({url})
    
  },

  loginWithGoogleCallback:async function (req, res) {
    var result = req.url;
    var code = result.split("code=")[1];
    var codex = code.split("&scope=")[0];
    codex = codex.replace(/%2F/g, "/");
    var data = await getGoogleAccountFromCode(codex);
    console.log(data);
    res.json({
      data,
    });

  },
};



module.exports = controller;