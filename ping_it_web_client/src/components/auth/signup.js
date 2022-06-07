import { React, useState, useEffect, useCallback } from "react";
import { Link, Outlet, useNavigate,  } from "react-router-dom";
import common_styles from "../common_styles";
import {
  Box,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import {
  HiOutlineMail,
  HiOutlineEye,
  HiOutlineEyeOff,
  HiUserCircle,
} from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import Urls from "../../services/urls";
import Auth from "../../services/auth";
import ErrorHandler from "../../models/ErrorModel";
import { useRoot } from "../../context_api/root_context";
import common_utility_functions from "../../utility/common_fumctions";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");
  const { switchKeys, setswitchKeys } = useRoot();
  const [SignupLoading, setSignupLoading] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const [alertMessage, setalertMessage] = useState("");
  const [alertType, setAlertType] = useState("success");
  const [openAlert, setOpenAlert] = useState(false);
  const navigate = useNavigate();

  const setAlert = useCallback(
    ({ message, type, willActivate }) => {
      setOpenAlert(willActivate);
      setAlertType(type);
      setalertMessage(message);
    },
    [setOpenAlert, setAlertType, setalertMessage]
  );
  const otpRecived = useCallback(
    (key) => {
      var temp = switchKeys;
      temp.otpReceived = key;
      setswitchKeys(temp);
    },
    [setswitchKeys, switchKeys]
  );
  useEffect(() => {
    otpRecived(false);
  }, [otpRecived]);

  const toggleVisibility = () => {
    setIsVisibile(!isVisibile);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeName = (e) => {
    setname(e.target.value);
  };
  const googleSignIn = () => {
    window.open(`${Urls.severLoginWithGoogleUrl}`, "_self");
  };

  const SignupOnClick = async () => {
    if (email === "") {
      setAlert({
        message: "Email is required",
        type: "error",
        willActivate: true,
      });

      return;
    } else if (!common_utility_functions.isEmail(email)) {
      setAlert({
        message: "Email is not valid",
        type: "error",
        willActivate: true,
      });
      return;
    } else if (password === "") {
      setAlert({
        message: "Password is required",
        type: "error",
        willActivate: true,
      });

      return;
    } else if (name === "") {
      setAlert({
        message: "Name is required",
        type: "error",
        willActivate: true,
      });
      return;
    } else if (name.length < 3) {
      setAlert({
        message: "Name must be at least 3 characters",
        type: "error",
        willActivate: true,
      });

      return;
    } else {
      setSignupLoading(true);
      var result = await Auth.sendOtp({
        email,
        username: name,
        password,
      });
      if (result instanceof ErrorHandler) {

        setAlert({
          message: result.message.error_message,
          type: "error",
          willActivate: true,
        });
      } else {
        otpRecived(true);
        navigate("/signup/otp", {
          replace: true,
        });
      }
      setSignupLoading(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenAlert(false);
  };

  return (
    <>
      {!switchKeys.otpReceived ? (
        <BackgroundBox>
          <CenterCard
            style={{
              height: "75vh",
            }}
          >
            <Box display="flex" flexDirection="Row" alignItems="flex-end">
              <Text fontSize={"2.5rem"} marginTop={"5vh"}>
                Sign up
              </Text>
              <div style={yellowDot}></div>
            </Box>
            <form
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MyTextFieldBg>
                <MyTextField
                  // disabled={SignupLoading}
                  variant="filled"
                  type="email"
                  placeholder="Enter your email"
                  onChange={handleChangeEmail}
                  value={email}
                ></MyTextField>

                <Box>
                  <HiOutlineMail size={25} style={iconProp}></HiOutlineMail>
                </Box>
              </MyTextFieldBg>
              <MyTextFieldBg>
                <MyTextField
                  value={password}
                  variant="filled"
                  type={isVisibile ? "text" : "password"}
                  onChange={handleChangePassword}
                  placeholder="Enter your Password"
                ></MyTextField>

                <Box onClick={toggleVisibility}>
                  {!isVisibile ? (
                    <HiOutlineEye size={25} style={iconProp}></HiOutlineEye>
                  ) : (
                    <HiOutlineEyeOff
                      size={25}
                      style={iconProp}
                    ></HiOutlineEyeOff>
                  )}
                </Box>
              </MyTextFieldBg>
              <MyTextFieldBg>
                <MyTextField
                  value={name}
                  variant="filled"
                  type={"text"}
                  onChange={handleChangeName}
                  placeholder="Enter your Name"
                ></MyTextField>

                <Box onClick={toggleVisibility}>
                  <HiUserCircle size={25} style={iconProp}></HiUserCircle>
                </Box>
              </MyTextFieldBg>
              <MyButton id="Signup" onClick={SignupOnClick} variant="contained">
                {SignupLoading ? (
                  <CircularProgress thickness={6} size={22} color="inherit" />
                ) : (
                  "Signup"
                )}
              </MyButton>
              <MyButton
                onClick={googleSignIn}
                variant="contained"
                style={{
                  backgroundColor: "#030e21",
                }}
              >
                <FcGoogle size={30}></FcGoogle>
              </MyButton>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  paddingTop: "2vh",
                  justifyContent: "center",
                }}
              >
                <Text>have an account? </Text>
                <Link
                  to="/login"
                  style={{
                    textDecoration: "none",
                  }}
                >
                  <Text
                    style={{
                      color: "#FFC107",
                      cursor: "pointer",
                      marginLeft: "5px",
                    }}
                  >
                    Log in
                  </Text>
                </Link>
              </div>
            </form>
          </CenterCard>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            open={openAlert}
            autoHideDuration={6000}
            onClose={handleClose}
          >
            <Alert
              onClose={handleClose}
              severity={alertType}
              sx={{ width: "100%" }}
            >
              {alertMessage}
            </Alert>
          </Snackbar>

        </BackgroundBox>
      ) : (
        <Outlet />
      )}
    </>
  );
}

//----------- EXTRA------------------

const BackgroundBox = common_styles.BackgroundBox;
const CenterCard = common_styles.CenterCard;
const Text = common_styles.Text;
const MyTextField = common_styles.MyTextField;
const MyTextFieldBg = common_styles.MyTextFieldBg;
const MyButton = common_styles.MyButton;
const yellowDot = {
  height: "1.5vh",
  width: "1.5vh",
  backgroundColor: "#d8a01f",
  borderRadius: "50%",
  marginBottom: "15px",
  marginLeft: "10px",
};
const iconProp = {
  marginTop: "10px",
  marginLeft: "12px",
};
export default Signup;
