const ErrorHandlerClass = require("../services/error_handler_class");
const JwtService = require("../services/jwt_service");


const getAccessTokenController = {

    async getAccessToken(req, res, next) {
 
 
    
         let accessToken
         let result
         let refreshToken=req.body.refreshtoken 
         try {
 
 
             const { _id, email } = JwtService.refreshVerify(req.body.refreshtoken)
             accessToken = JwtService.sign({ _id: _id, email: email })
 
 
         } catch (error) {
             return next(error)
         }
         res.json({ accessToken: accessToken, refreshToken: refreshToken })
     }
 }