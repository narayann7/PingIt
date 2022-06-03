import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import RootContextProvider from "./context_api/root_context";
const root = ReactDOM.createRoot(document.querySelector("#root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RootContextProvider>
        <Routes>
          <Route path="/*" element={<App />} />
        </Routes>
      </RootContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
