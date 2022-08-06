import React, { useEffect, useState } from "react";
// import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import registerlogo from "../../assets/images/register.png";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleValidation = () => {
    if (!email || !password || !cpassword || !username) {
      toast.error("Please fill all the details", toastStyle);
      return false;
    }
    if (password.length < 8) {
      toast.error("Password should contain atleast 8 letters", toastStyle);
      return false;
    }
    if (cpassword !== password) {
      toast.error("Password missmatch", toastStyle);
      return false;
    }
    return true;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const validation = handleValidation();
    if (!validation) {
      return;
    }

    const obj = {
      username: username,
      password: password,
      password2: cpassword,
      email: email,
    };
    const newobj = {
      username: username,
      password: password,
    };
    async function userLogin() {
      const response = await axios.post(
        "https://cheatcode.pythonanywhere.com/token",
        newobj
      );
      if (response.data.access) {
        const item = {
          username: username,
          token: response.data.access,
        };
        // console.log(item);
        localStorage.setItem("cheat-code-user", JSON.stringify(item));
        navigate("/");
      }
    }
    async function userRegister() {
      await axios
        .post("https://cheatcode.pythonanywhere.com/signup", obj)
        .then((res) => {
          if (res) {
            // console.log(res);
            toast.success("Registration Complete", toastStyle);
            userLogin();
          }
        })
        .catch((err) => console.log(err.message));
    }
    userRegister();
  };

  useEffect(() => {
    if (localStorage.getItem("cheat-code-user")) {
      navigate("/");
    }
  }, []);

  const toastStyle = {
    position: "top-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };

  return (
    <div className="register">
      <div className="login-nav">
        <h2 className="glowing-logo" data-text="CHEATCODE">
          CHEATCODE
        </h2>
      </div>
      <div className="register-container">
        <img src={registerlogo} alt=""></img>
        <div className="register-info">
          <div className="register-id">
            <input
              onChange={(e) => setUserName(e.target.value)}
              type="text"
              placeholder="Username"
              value={username}
            />
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="text"
              placeholder="Email Address"
              value={email}
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Enter your password"
              value={password}
            />
            <input
              onChange={(e) => setCPassword(e.target.value)}
              type="password"
              placeholder="Confirm your password"
              value={cpassword}
            />
          </div>
        </div>
        <button onClick={handleRegister} className="register-button">
          Create New Account
        </button>
        <div className="login-link">
          <p>Already have an account!</p>
          <Link to="/login">
            <span>LOGIN</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
