import React from "react";

import "./App.css";
import Homepage from "./Homepage";
import NavBar from "./NavBar";

function App() {
  // add links to your pages for now
  return (
    <div>
      <NavBar />
      <div className = "mainContent">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
