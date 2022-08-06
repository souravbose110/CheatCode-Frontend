import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (localStorage.getItem("cheat-code-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    if (!username || !password) {
      toast.error("Invalid username or password", toastStyle);
      return false;
    }
    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const validation = handleValidation();

    if (validation) {
      const obj = {
        username: username,
        password: password,
      };
      async function userLogin() {
        try {
          const response = await axios.post(
            "https://cheatcode.pythonanywhere.com/token",
            obj
          );
          if (response.data.access) {
            const item = {
              username: username,
              token: response.data.access,
            };
            // console.log(item);
            localStorage.setItem("cheat-code-user", JSON.stringify(item));
            toast.success(`Welcome Back ${username}`, toastStyle);
            navigate("/");
          }
        } catch (error) {
          toast.error("something went wrong", toastStyle);
          return;
        }
      }
      userLogin();
    }
  };

  const handleGuestLogin = () => {
    const obj = {
      username: "guest",
      password: "cheat1234",
    };
    async function userLogin() {
      try {
        const response = await axios.post(
          "https://cheatcode.pythonanywhere.com/token",
          obj
        );
        if (response.data.access) {
          const item = {
            username: "guest",
            token: response.data.access,
          };
          // console.log(item);
          localStorage.setItem("cheat-code-user", JSON.stringify(item));
          toast.success(`Welcome Guest`, toastStyle);
          navigate("/");
        }
      } catch (error) {
        toast.error("something went wrong", toastStyle);
        return;
      }
    }
    userLogin();
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <div className="login">
      <div className="login-nav">
        <h2 className="glowing-logo" data-text="CHEATCODE">
          CHEATCODE
        </h2>
      </div>
      <div className="login-container">
        <img
          src="https://www.freeiconspng.com/uploads/login-button-png-15.png"
          alt=""
        ></img>
        <div className="login-info">
          <div className="login-id">
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
              value={username}
            ></input>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              value={password}
            />
          </div>
          <button onClick={handleLogin}>Continue</button>
        </div>
        <div className="register-link">
          <p>Create new account!</p>
          <Link to="/register">
            <span>REGISTER</span>
          </Link>
        </div>
        <button onClick={handleGuestLogin}>Login as Guest</button>
      </div>
    </div>
  );
};

export default Login;
