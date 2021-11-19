import React, { useState, useEffect } from "react"
import { Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"

const Login = props => {
    let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters
  
    // create state variables to hold username and password
    const [status, setStatus] = useState({}) // the API will return an object indicating the login status in a success field of the response object
    const [errorMessage, setErrorMessage] = useState(``) // will contain any error message that explains why the user was redirected to this page.
  
    // if the user got here by trying to access our Protected page, there will be a query string parameter called 'error' with the value 'protected'
    useEffect(() => {
      const qsError = urlSearchParams.get("error") // get any 'error' field in the URL query string
      if (qsError === "protected")
        setErrorMessage(
          "Signup here"
        )
    }, [])
    useEffect(() => {
        
        if (status.success) {
          console.log(`User successfully logged in: ${status.username}`)
          props.setuser(status)
        }
      }, [status])
    
      const handleSubmit = async e => {
        e.preventDefault()
    
        try {
            
          const requestData = {
            username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
            password: e.target.password.value, // gets the value of the field in the submitted form with name='password',
          }
          // send the request to the server api to authenticate
          const response = await axios.post(
            "https://my.api.mockaroo.com/login.json?key=d9ddfc40",
            requestData
          )
          // store the response data into the data state variable
          console.log(response.data)
          setStatus(response.data)
        } catch (err) {
          // throw an error
          throw new Error(err)
        }
      }
    
      // if the user is not logged in, show the login form
      if (!status.success)
        return (
          <div className="Login">
            <h1>Log in</h1>
            {errorMessage ? <p className="error">{errorMessage}</p> : ""}
            <section className="main-content">
              <img alt="login!" src="https://picsum.photos/200?page=home" />
              <form onSubmit={handleSubmit}>
                {
                  //handle error condition
                }
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
              <p>
                Server response (for debugging purposes):
                <br />
                <br />
                {JSON.stringify(status, null, 2)}
              </p>
            </section>
          </div>
        )

      }

        export default Signup;