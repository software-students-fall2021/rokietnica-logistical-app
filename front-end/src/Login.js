import React, { useState, useEffect } from "react"
import { Redirect } from "react-router-dom";
import axios from "axios"

import NavBar from "./NavBar";

const Login = (props) => {
    const [status, setStatus] = useState({})
    const [errorMessage, setErrorMessage] = useState("")

    /*
    useEffect(() => {
        if(status.success){
            props.setuser(status)
        }
    }, [status])
    */

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
                username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
                password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
            }

            console.log(requestData);
            console.log(process.env.REACT_APP_BACKEND);
            // send the request to the server api to authenticate
            const response = await axios.post(
            `${process.env.REACT_APP_BACKEND}/login`,
            requestData
            )
            // store the response data into the data state variable
            console.log(response.data)
            setStatus(response.data)
        }
        catch (err) {
            // throw an error
            setErrorMessage("You entered invalid credentials.")
        }
    }

    if (!status.success)
        return (
          <div>
            <NavBar />
            <div className="mainContent">
              <h1>Log in</h1>
              <p>{errorMessage}</p>
              <p> {status.message} </p>
              <form onSubmit={handleSubmit}>
                  <label>Username: </label>
                  <input type="text" name="username" placeholder="username" />
                  <br />
                  <br />
                  <label>Password: </label>
                  <input type="password" name="password" placeholder="password" />
                  <br />
                  <br />
                  <input type="submit" value="Log In" />
              </form>
            </div>
          </div>
        )
    // otherwise, if the user has successfully logged-in, redirect them to a different page
    // in this example, we simply redirect to the home page, but a real app would redirect to a page that shows content only available to logged-in users
    else return <Redirect to = "/" />
}

export default Login;
