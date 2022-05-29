import { createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#d8a01f",
      light: "#F8E7A1",
      dark: "#f3c158",
    },
    secondary: {
      main: "#ecb75e",

    },
    background: {
      default: "#030e21",
      paper: "#1A1A2B",
    },
    text: {
      secondary: "#000000",
      primary: "#ffffff",
    },
  },
  typography: {
    fontFamily: `"Poppins","Sen"`,

  },
});

export default theme;