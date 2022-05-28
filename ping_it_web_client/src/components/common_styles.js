import { styled } from "@mui/material/styles";
import { Card, Typography, Box, TextField } from "@mui/material";

const Text = styled(Typography)(({ theme }) => ({
  fontFamily: "Sen",
  color: theme.palette.text.primary,
}));

const MyTextField = styled(TextField)(({ theme }) => ({}));

const MyTextFieldBg = styled(Box)(({ theme }) => ({}));

const common_styles = {
  Text,
  MyTextField,
  MyTextFieldBg,
};
export default common_styles;
