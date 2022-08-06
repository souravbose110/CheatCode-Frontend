import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/loginPage/Login";
import Register from "./pages/registerPage/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/homePage/HomePage";
import Explore from "./pages/Explore/Explore";
import ProblemsPage from "./pages/ProblemsPage/ProblemsPage";

import Constants from "./api/Routes";

function App() {
  return (
    <>
      {/* <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Routes> */}
      <Routes>
        <Route path={Constants.Root} element={<HomePage />} />
        <Route path={Constants.Login} element={<Login />} />
        <Route path={Constants.Register} element={<Register />} />
        <Route path={Constants.Explore} element={<Explore />} />
        <Route path={Constants.Problems} element={<ProblemsPage />} />
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
