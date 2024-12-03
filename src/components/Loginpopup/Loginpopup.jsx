import React, { useContext, useState } from "react";
import "./Loginpopup.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/storeContext";
import axios from "axios";

const Loginpopup = ({ setShowLogin }) => {
  const { url, setToken } = useContext(StoreContext);

  const [currentstate, setCurrentState] = useState("Login");

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangehandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (event) => {
    event.preventDefault();
    let newurl = url;
    if (currentstate === "Login") {
      newurl += "/api/user/login";
    } else {
      newurl += "/api/user/register";
    }

    const response = await axios.post(newurl, data);

    if (response.data.success) {
      setToken(response.data.token);
      localStorage.setItem("token", response.data.token);
      setShowLogin(false);
    } else {
      alert(response.data.message);
    }
  };

  return (
    <div className="login-popup">
      <form onSubmit={onLogin} className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currentstate}</h2>
          <img
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt=""
          />
        </div>

        <div className="login-popup-inputs">
          {currentstate === "Login" ? (
            <></>
          ) : (
            <input
              type="text"
              name="name"
              onChange={onChangehandler}
              value={data.name}
              placeholder="Your name"
              required
            />
          )}
          <input
            type="email"
            name="email"
            onChange={onChangehandler}
            value={data.email}
            placeholder="Enter your Email"
            required
          />
          <input
            type="password"
            name="password"
            onChange={onChangehandler}
            value={data.password}
            placeholder="Enter your Password"
            required
          />
        </div>
        <button type="submit">
          {currentstate === "Sign Up" ? "Create Account" : "Login"}
        </button>
        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>By continue I am accepting the term and policies</p>
        </div>
        {currentstate === "Login" ? (
          <p>
            Create a new Account?
            <span onClick={() => setCurrentState("Sign Up")}>Click here</span>
          </p>
        ) : (
          <p>
            Already have an acccount
            <span onClick={() => setCurrentState("Login")}>Login here</span>
          </p>
        )}
      </form>
    </div>
  );
};

export default Loginpopup;
