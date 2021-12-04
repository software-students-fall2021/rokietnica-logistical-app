const { useEffect } = require("react")
const { Redirect } = require("react-router-dom")

const Logout = props => {
  useEffect(() => {
    localStorage.removeItem("token")
  }, [])
  return (
    <>
      <Redirect to="/" />
    </>
  )
}

export default Logout
