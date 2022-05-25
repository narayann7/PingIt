// const jwt = require("jsonwebtoken");

// const commonFunctions = require("./services/common_functions");

// class JwtService {
//   static sign({ payload, expiry = "10y", secret = "hellox" }) {
//     console.log(secret);

//     return jwt.sign(payload, secret, { expiresIn: expiry });
//   }
//   static refreshSign(payload, expiry = "1y", secret = "refreshkey") {
//     return jwt.sign(payload, secret, { expiresIn: expiry });
//   }
//   static verify(token, secret = "default") {
//     return jwt.verify(token, secret);
//   }
//   static refreshVerify(token, secret = "refreshkey") {
//     return jwt.verify(token, secret);
//   }
// }

// // // var token = JwtService.sign({ payload: { message: "hello world" },
// // // secret: "byex"
// // // });

// // // console.log(token);

// // // "secret":"hellox"

// // function checkPassword(str)
// // {
// //     //Minimum eight characters, at least one letter and one number:
// //     var regExp1 = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

// //    //Minimum eight characters, at least one letter, one number and one special character:
// //     var regExp2 = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

// //     //Minimum eight characters, at least one uppercase letter, one lowercase letter and one number:
// //     var regExp3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

// //     //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
// //     var regExp4 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;

// //     return regExp1.test(str);
// // }
// // // function checkPassword(str)
// // // {
// // //     var re = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
// // //     return re.test(str);
// // // }
// // console.log(checkPassword("qwertyq123"));

// // class xoxo{
// // ;
// //     constructor(x,o){
// //         this.x = x;
// //         this.o = o;
// //     }

// // }

// // let xoxoz = new xoxo(1,2);
// //     console.log(xoxoz);
// // const bcrypt = require("bcrypt");

// // async function tttt(){
// //     const hashedPassword = await bcrypt.hash("hello", 10);
// //     console.log(hashedPassword);
// // }

// // tttt()

// var en = commonFunctions.base64encode("hello");

// let token = JwtService.sign({
//   payload: { message: "hello world" },
//   secret: en,
// });

//     console.log(en);

// const { populate } = require("./models/user_model");
const JwtService = require("./services/jwt_service");

// async function pop() {
//   var token = JwtService.sign({
//     payload: { message: "hello world" },
//   });
//   // console.log(token);

//   try {
//     const vv = await JwtService.verify({
//       token:
//         "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtZXNzYWdlIjoiaGVsbG8gd29ybGQiLCJpYXQiOjE2NTMzOTkxMzEsImV4cCI6MTY1MzM5OTE0MX0.BhWFbPxxMdXA9eaIK5NkJo0fXJ05RwkDx55idoaVKMY",
//     });

//     console.log(vv);
//   } catch (e) {
//     console.log("error==");
//   }
// }

// pop();
// let otp = Math.floor(100000 + Math.random() * 900000);
    // console.log(otp);
    // var today = new Date();   
    // var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    //     console.log(time);
      var token = JwtService.sign({
    payload: { message: "hello world" },
  });
  console.log(token);