import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import ProblemsContainer from "../../components/problemContainer/ProblemsContainer";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("cheat-code-user")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      <Header />
      <ProblemsContainer />
    </>
  );
}

export default HomePage;
