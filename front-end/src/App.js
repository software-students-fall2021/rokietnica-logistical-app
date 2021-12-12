import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./App.css";
import Homepage from "./Homepage";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import {ReactComponent as MTASvg} from './MTA_NYC_logo.svg';

// import your component functions for use in route links
import NavBar from "./NavBar";

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <MTASvg style = {{height: 100, width:100}} />
      </div>
      <div className = "mainContent">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
