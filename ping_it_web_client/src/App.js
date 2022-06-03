import { React, useState, useEffect, useContext } from "react";
import Login from "./components/auth/login";
import Home from "./components/home/home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./utility/theme";
import { Routes, Route, Navigate, Link, Outlet } from "react-router-dom";
import "./App.css";
import TestComp from "./components/test_component";
import { RootContext } from "./context_api/root_context";
import ProtectedRoutes from "./components/protected_routes";
import { CircularProgress } from "@mui/material";
import { Typography } from "@mui/material";
import { Backdrop } from "@mui/material";
import api from "./services/axios_api";
import Urls from "./services/urls";

function App() {
  const { isAuthenticated, setIsAuthenticated } = useContext(RootContext);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    let refreshtoken = localStorage.getItem("refreshToken");
    console.log(isAuthenticated);

    setIsLoading(true);
    if (refreshtoken) {
      api
        .post(Urls.getAccessTokenUrl, { refreshtoken })
        .then((response) => {
          console.log(response.data);
          if (response.status === 200) {
            console.log(response.data);
            setIsAuthenticated(true);
          }
        })
        .catch((error) => {
          console.log(error);
          setIsAuthenticated(false);
        });
    } else {
      setIsAuthenticated(false);
    }
    setIsLoading(false);
  }, [isAuthenticated, setIsAuthenticated]);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="home" element={<Home />} />
            <Route path="test" element={<TestComp />} />
          </Route>
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );

  // isLoading ? (
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
  //   <ThemeProvider theme={theme}>
  //     <Routes>
  //       <Route
  //         path="/"
  //         element={
  //           !isAuthenticated ? (
  //             <Navigate to="/login" />
  //           ) : (
  //             <Navigate to="/home" />
  //           )
  //         }
  //       />
  //       <Route path="/login" element={<Login />} />
  //       <Route
  //         path="/home"
  //         element={
  //           <ProtectedRoutes>
  //             <Home />
  //           </ProtectedRoutes>
  //         }
  //       />
  //       <Route path="/test" element={<TestComp />} />
  //       <Route
  //         path="*"
  //         element={
  //           <div
  //             style={{
  //               display: "flex",
  //               justifyContent: "center",
  //               alignItems: "center",
  //               flexDirection: "column",
  //               height: "100vh",
  //             }}
  //           >
  //             <h2>404 Page Not Found ☹️</h2>
  //             <Link to={"/"}>go back</Link>
  //           </div>
  //         }
  //       />
  //     </Routes>
  //   </ThemeProvider>
  // );
}

function Layout() {
  return <Outlet />;
}
function Error() {
  return (
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
  );
}
export default App;
