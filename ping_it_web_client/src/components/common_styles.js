import { styled } from "@mui/material/styles";

import {
  Card,
  Typography,
  Box,
  Button,
  TextField,
  Input,
  Alert,
} from "@mui/material";

const Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Sen",
  color: theme.palette.text.primary,
}));

const MyTextField = styled(TextField)(({ theme }) => ({
  paddingBottom: "6px",
}));

const MyButton = styled(Button)(({ theme }) => ({
  height: "7vh",
  width: "23vw",
  marginTop: "2.5vh",
  borderRadius: "10px",
  fontSize: "2.5vh",
  textTransform: "none",
}));

const MyTextFieldBg = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  height: "8vh",
  width: "23vw",
  paddingRight: "15px",
  paddingLeft: "15px",
  marginTop: "1.8vh",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "15px",
}));

const centerStyle = {
  height: "100vh",
  width: "100vw",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};
// function GetAlert({ message, type, handleClose }) {
//   let messageType;
//   if (type === "success") {
//     messageType = "success";
//   } else if (type === "error") {
//     messageType = "error";
//   } else if (type === "warning") {
//     messageType = "warning";
//   } else {
//     messageType = "info";
//   }
//   return (
    // <Alert onClose={handleClose} severity={messageType} sx={{ width: "100%" }}>
    //   {message}
    // </Alert>
//   );
// }

const common_styles = {
  Text,
  MyTextField,
  MyTextFieldBg,
  MyButton,
  centerStyle
};

export default common_styles;
