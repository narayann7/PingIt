import { React, useState, useEffect } from "react";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utility/theme";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import "./App.css";
import TestComp from "./components/test_component";
import RootContext from "./context_api/root_context";
import ProtectedRoutes from "./components/protected_routes";
import { Backdrop, CircularProgress, Switch, Typography } from "@mui/material";
import Urls from "./services/urls";
import api from "./services/axios_api";
import auth from "./services/auth";
function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    // let refreshtoken = localStorage.getItem("refreshToken");
    // if (refreshtoken) {
    //   setIsLoading(true);
    //   api
    //     .post(Urls.getAccessTokenUrl, { refreshtoken })
    //     .then((response) => {
    //       console.log(response.data);
    //       if (response.status === 200) {
    //         console.log(response.data);
    //         setIsAuthenticated(true);
    //         setIsLoading(false);
    //       }
    //     })
    //     .catch((error) => {});
    // }
    // else{
    //   setIsLoading(false);
    // }
  }, []);

  return (
    //  isLoading ? (
    //   <Backdrop
    //     sx={{
    //       color: "#fff",
    //       backgroundColor: "#000000",
    //       display: "flex",
    //       justifyContent: "center",
    //       alignItems: "center",
    //       flexDirection: "column",
    //       zIndex: (theme) => theme.zIndex.drawer + 1,
    //     }}
    //     open={true}
    //   >
    //     <CircularProgress color="inherit" />
    //     <Typography paddingTop={5}>Please wait..</Typography>
    //   </Backdrop>
    // ) : (
    <RootContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route path="/test" element={<TestComp />} />
          <Route
            path="*"
            element={
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  height: "100vh",
                }}
              >
                <h2>404 Page Not Found ☹️</h2>
                <Link to={"/"}>go back</Link>
              </div>
            }
          />
        </Routes>
      </ThemeProvider>
    </RootContext.Provider>
  );
}

export default App;
