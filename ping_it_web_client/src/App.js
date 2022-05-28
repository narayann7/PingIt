import React from "react";
import Login from "./components/auth/login";
import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
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
      paper: "#22222f",
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
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
