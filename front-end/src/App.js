import React, { useState } from "react";

import "./App.css";

// import your component functions for use in route links
import NavBar from "./NavBar";
import Homepage from "./Homepage";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <NavBar/>
      <div className = "mainContent">
        <Homepage changeState = {setLoggedIn}/>
      </div>
    </div>
  );
}

export default App;
