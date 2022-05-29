import React from "react";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utility/theme";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
      <Routes>
        <Route path="/login" element={<Login />} />
      </Routes>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
{
  /* <Routes>
<Route
  path="/home"
  element={loggedIn ? <Home /> : <Navigate to="/login" />}
/>
<Route
  path="/login"
  element={loggedIn ? <Navigate to="/home" /> : <Login />}
/>
<Route
  path="/"
  element={loggedIn ? <Home /> : <Navigate to="/login" />}
/>
</Routes> */
}
