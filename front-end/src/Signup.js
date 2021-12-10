import React, { useState, useEffect } from "react"
import { Link, Redirect } from "react-router-dom";
import axios from "axios"
import NavBar from "./NavBar";

import "./App.css";

const Signup = (props) => {
    const [status, setStatus] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    useEffect(() => {
        // if the user is logged-in, save the token to local storage
        if (status.success && status.token) {
          console.log(`User successfully logged in: ${status.username}`)
          localStorage.setItem("token", status.token) // store the token into localStorage
          localStorage.setItem("user", status.username)
        }
      }, [status])

    const handleSubmit = async e => {
        // prevent the HTML form from actually submitting... we use React's javascript code instead
        e.preventDefault()

        try {
          // create an object with the data we want to send to the server
            const requestData = {
                username: e.target.username.value,
                password: e.target.password.value,
                passwordCheck: e.target.passwordCheck.value,
            }

            //console.log(requestData); debugging
            //console.log(process.env.REACT_APP_BACKEND); debugging

            // send the request to the server api to authenticate
            const response = await axios.post(
            `${process.env.REACT_APP_BACKEND}/signup`,
            requestData
            )
            // store the response data into the data state variable
            setStatus(response.data)
        }
        catch (err) {
            // throw an error
            setErrorMessage(status.message)
        }
    }

    if (!status.success)
        return (
        <div>
          <NavBar />
          <div className="mainContent">
              <h1>NYC Route Sign Up</h1>
              <p>{errorMessage}</p>
              <p>{status.success}</p>
              <form onSubmit={handleSubmit}>
                  <label>Username:</label> 
                  <input type="text" name="username" placeholder="Username" />
                  <br />
                  <br />
                  <label>Password: </label>
                  <input type="password" name="password" placeholder="Password" />
                  <br />
                  <br />
                  <label>Verify Password: </label>
                  <input type="password" name="passwordCheck" placeholder="Reenter password..." />
                  <br />
                  <br />
                  <input type="submit" value="Sign Up" />
              </form>
              <br />
              <br />
              <p>
                  If you already have an account you can <Link  to="/login">Login In
                  </Link>
              </p>
          </div>
        </div>
        )
    // otherwise, if the user has successfully logged-in, redirect them to a different page
    // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
    else return <Redirect to = "/login" />
}

export default Signup;
