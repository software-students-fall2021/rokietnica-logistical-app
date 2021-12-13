import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import axios from "axios";

import "./Signup.css";

const Signup = (props) => {
  const [status, setStatus] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // if the user is logged-in, save the token to local storage
    if (status.success && status.token) {
      localStorage.setItem("token", status.token); // store the token into localStorage
      localStorage.setItem("user", status.username);
      this.props.location.state.changeState(true);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault();

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value,
        password: e.target.password.value,
        passwordCheck: e.target.passwordCheck.value,
      };

      // send the request to the server api to authenticate
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND}/signup`,
        requestData
      );
      // store the response data into the data state variable
      setStatus(response.data);
    } catch (err) {
      // throw an error
      setErrorMessage(status.message);
    }
  };

  if (!status.success)
    return (
      <div className="content">
        <h1>NYC Route Sign Up</h1>
        <p>{errorMessage}</p>
        <p>{status.success}</p>

        <div className="formContent">
          <form onSubmit={handleSubmit}>
            <label>Username:</label>
            <input type="text" name="username" placeholder=" Username..." />
            <br />
            <br />
            <label>Password: </label>
            <input type="password" name="password" placeholder=" Password..." />
            <br />
            <br />
            <label>Verify Password: </label>
            <input
              type="password"
              name="passwordCheck"
              placeholder=" Reenter password..."
            />
            <br />
            <br />
            <input type="submit" value="Sign Up" />
          </form>
        </div>
        <br />
        <br />
        <p>
          If you already have an account you can{" "}
          <Link to="/login">Login In</Link>
        </p>
      </div>
    );
  else return <Redirect to="/login" />;
};

export default Signup;
