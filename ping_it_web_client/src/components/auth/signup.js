import { React, useState, useEffect } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import common_styles from "../common_styles";
import styles from "./styles";
import {
  Box,
  Snackbar,
  Backdrop,
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
import api from "../../services/axios_api";
import Urls from "../../services/urls";
import Auth from "../../services/auth";
import ErrorHandler from "../../models/ErrorModel";
import common_utility_functions from "../../utility/common_fumctions";

function Signup() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [name, setname] = useState("");

  const [SignupLoading, setSignupLoading] = useState(false);
  const [isVisibile, setIsVisibile] = useState(false);
  const [searchParams] = useSearchParams();
  const [alertMessage, setalertMessage] = useState("hello");
  const [openAlert, setOpenAlert] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const navigate = useNavigate();

  useEffect(() => {
    //check if user is already logged in by google
    let refreshtoken = searchParams.get("user");

    if (!refreshtoken) {
      //check if user has refresh token in local storage
      let temp = Auth.getRefreshToken();

      if (temp) {
        refreshtoken = temp;
      }
    }

    if (refreshtoken) {
      setisLoading(true);

      api
        .post(Urls.getAccessTokenUrl, { refreshtoken })
        .then((response) => {
          console.log(response.data);

          if (response.status === 200) {
            setisLoading(false);
            setAlertType("success");
            setalertMessage("Signup Successful");
            setOpenAlert(true);
            console.log(response.data);
            localStorage.setItem("refreshToken", response.data.refreshToken);
            navigate("/home", { replace: true });
          }
        })
        .catch((error) => {
          setisLoading(false);
          setOpenAlert(true);
          setAlertType("error");
          setalertMessage("Signup Failed. try again");
        });
    }
  }, [navigate, searchParams]);

  const toggleVisibility = () => {
    setIsVisibile(!isVisibile);
  };
  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };
  const googleSignIn = () => {
    window.open(`${Urls.severSignupWithGoogleUrl}`, "_self");
  };

  const SignupOnClick = async () => {
    if (email === "") {
      setOpenAlert(true);
      setAlertType("error");
      setalertMessage("Email is required");
      return;
    } else if (!common_utility_functions.isEmail(email)) {
      setOpenAlert(true);
      setAlertType("error");
      setalertMessage("Invalid Email");
      return;
    } else if (password === "") {
      setOpenAlert(true);
      setAlertType("error");
      setalertMessage("Password is required");
      return;
    } else {
      setSignupLoading(true);
      var result = await Auth.Signup({ email, password });
      if (result instanceof ErrorHandler) {
        setOpenAlert(true);
        setAlertType("error");
        setalertMessage(result.message.error_message);
        console.log(result);
      } else {
        console.log(result);
        navigate("/home", { replace: true });
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
                <HiOutlineEyeOff size={25} style={iconProp}></HiOutlineEyeOff>
              )}
            </Box>
          </MyTextFieldBg>
          <MyTextFieldBg>
            <MyTextField
              value={name}
              variant="filled"
              type={"text"}
              onChange={handleChangePassword}
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

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
        onClick={handleClose}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </BackgroundBox>
  );
}

//----------- EXTRA------------------

const BackgroundBox = styles.BackgroundBox;
const CenterCard = styles.CenterCard;
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
