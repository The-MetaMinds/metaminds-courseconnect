/* things to do 

1. Make sure the emails show "Invalid email" if the email is invalid
2. Make sure the password shows "Wrong password" if the password is wrong
3. Make sure the api for the login is changed since i changed it the backend

*/

import React from "react";
import "./LoginPage.css"; // Make sure to create an appropriate CSS file for styling
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { useUser } from "../contexts/UserProvider";

const LoginBox = () => {
  const navigate = useNavigate();

  /*
  const { login } = useAuth();

  */

  const { auth } = useUser();

  console.log(auth);

  const login = auth.login;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    const lowerCaseEmail = email.toLowerCase();

    try {
      await login(lowerCaseEmail, password);
      // Redirect or perform other actions upon successful login
      navigate("/");
    } catch (error) {
      // Error Message for Password
      if (error.response && error.response.status === 401) {
        setErrorMessage("Incorrect password.");
        // Error Message for Email
      } else if (error.response && error.response.status === 404) {
        setErrorMessage(
          "The email you entered is not connected to an account."
        );
      } else {
        // Handle other errors
        console.error("Login error:", error);
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-box">
      <div className="options">
        <Link to="/registration">
          <button className="signup-btn">Sign Up</button>
        </Link>
      </div>
      <h2>Login</h2>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          type="text"
          name="email"
          value={formData.email}
          placeholder="ScarletMail"
        />
        <div className="password-input">
          <input
            onChange={handleChange}
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            placeholder="Password"
          />
          <img
            src="eyesymbol.png"
            alt="Show Password"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          />
        </div>{" "}
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

const LoginPage = () => (
  <div className="login-page">
    <div className="container">
      <LoginBox />
    </div>
  </div>
);

export default LoginPage;
