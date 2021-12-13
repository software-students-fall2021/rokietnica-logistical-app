import React, { useState } from "react";

import "./App.css";
import {ReactComponent as MTASvg} from './MTA_NYC_logo.svg'

// import your component functions for use in route links
import NavBar from "./NavBar";
import Homepage from "./Homepage";

function App() {

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div>
      <NavBar/>
<div>
        <MTASvg style = {{height: 100, width:100}} />
      </div>
      <div className = "mainContent">
        <Homepage changeState = {setLoggedIn} state = {loggedIn} />

      </div>
    </div>
  );
}

export default App;
