import { React, useState, useEffect } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route, Navigate } from "react-router-dom";
import { CircularProgress, Typography, Backdrop } from "@mui/material";
import ProtectedRoutes, { Layout } from "./components/protected_routes";
import Auth from "./services/auth";
import TestComp from "./components/test_component";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import Error from "./components/error_component";
import api from "./services/axios_api";
import theme from "./utility/theme";
import Urls from "./services/urls";
import "./App.css";
import Signup from "./components/auth/signup";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  let refreshtoken = Auth.getRefreshToken();
  const [isAuth, setisAuth] = useState(refreshtoken ? true : false);
  useEffect(() => {
    setIsLoading(true);
    if (refreshtoken) {
      api
        .post(Urls.getAccessTokenUrl, { refreshtoken })
        .then((response) => {
          console.log(response.data);

          if (response.status === 200) {
            console.log(response.data);
          }
        })
        .catch((error) => {
          console.log(error);
          // deleteRefreshToken();
          setisAuth(false);
        });
    }
    setIsLoading(false);
  }, [refreshtoken]);

  return !isLoading ? (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Navigate to={"/login"} />} />
          <Route
            path="login"
            element={isAuth ? <Navigate to={"/home"} /> : <Login />}
          />
          <Route
            path="signup"
            element={isAuth ? <Navigate to={"/home"} /> : <Signup />}
          />
          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
            <Route path="test" element={<TestComp />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </ThemeProvider>
  ) : (
    <Backdrop
      sx={{
        color: "#fff",
        backgroundColor: "#000000",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={true}
    >
      <CircularProgress color="inherit" />
      <Typography paddingTop={5}>Please wait..</Typography>
    </Backdrop>
  );
}

export default App;
