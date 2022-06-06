// import React, { useState } from "react";
// import styles from "./styles";
// import common_styles from "../common_styles";
// import { Button } from "@mui/material";

// function Otp({ email }) {
//   const arr = [1, 2, 3];
//   const [focusedArray, setfocusedArray] = useState([true, false, false]);

//   const [currentField, setcurrentField] = useState(0);

//   const testOnChange = (e) => {
//     e.preventDefault();
//     setcurrentField(currentField + 1);
//     // setfocusedArray([false, true, false]);
//   };

//   const test = () => {};

//   return (
//     <BackgroundBox>
//       <CenterCard
//         style={{
//           height: "45vh",
//         }}
//       >
//         <OTPBox></OTPBox>
//         {/* {arr.map((item, index) => {
//           return (
//             <MyTextFieldBg
//               style={{
//                 width: "20vw",
//               }}
//             >
//               <MyTextField
//                 tabIndex={index}
//                 onChange={testOnChange}
//                 variant="filled"
//                 type="text"
//                 placeholder={index}
//                 autoFocus={index === currentField}
//                 focused={focusedArray[index]}
//                 inputProps={{
//                   maxLength: 1,
//                 }}
//               ></MyTextField>
//             </MyTextFieldBg>
//           );
//         })}

//         <Button onClick={test}>click</Button> */}
//       </CenterCard>
//     </BackgroundBox>
//   );
// }
// const OTPBox = () => {
//   const [otp, setOtp] = useState(new Array(4).fill(""));

//   const handleChange = (element, index) => {
//     if (isNaN(element.value)) return false;

//     setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

//     //Focus next input
//     if (element.nextSibling) {
//       element.nextSibling.focus();
//       // element.previousSibling.focus();
//     }
//   };

//   return (
//     <>
//       <div className="row">
//         <div className="col text-center">
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "row",
//             }}
//           >
//             {otp.map((data, index) => {
//               return (
//                 <MyTextFieldBg
//                   style={{
//                     width: "5vw",
//                   }}
//                 >
//                   <input
//                     style={{
//                       backgroundColor: "transparent",
//                       border: "none",
//                       width: "5vw",
//                       color: "white",
//                       //   outline: "none",
//                       //   border: "1px solid red",

//                       // }
//                     }}
//                     className="otp-field"
//                     type="text"
//                     name="otp"
//                     maxLength="1"
//                     key={index}
//                     value={data}
//                     onKeyDown={(e) => {
//                       console.log(e.target.value);

//                       if (e.key === "Backspace") {
//                         if (e.target.value === "") {
//                           e.target.previousSibling.focus();
//                           e.target.previousSibling.value = "";
//                           setOtp([
//                             ...otp.map((d, idx) =>
//                               idx === index - 1
//                                 ? e.target.previousSibling.value
//                                 : d
//                             ),
//                           ]);
//                         }
//                       }
//                     }}
//                     onChange={(e) => {
//                       handleChange(e.target, index);
//                     }}
//                     onFocus={(e) => {
//                       e.target.select();
//                     }}
//                   />
//                 </MyTextFieldBg>
//               );
//             })}
//           </div>

//           <p>OTP Entered - {otp.join("")}</p>
//           <p>
//             <button
//               className="btn btn-secondary mr-2"
//               onClick={(e) => setOtp([...otp.map((v) => "")])}
//             >
//               Clear
//             </button>
//             <button
//               className="btn btn-primary"
//               onClick={(e) => alert("Entered OTP is " + otp.join(""))}
//             >
//               Verify OTP
//             </button>
//           </p>
//         </div>
//       </div>
//     </>
//   );
// };
// export default Otp;
// const BackgroundBox = styles.BackgroundBox;
// const CenterCard = styles.CenterCard;
// const MyTextField = common_styles.MyTextField;
// const MyTextFieldBg = common_styles.MyTextFieldBg;
{/* 
          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isLoading}
            onClick={handleClose}
          >
            <CircularProgress color="inherit" />
          </Backdrop> */}