import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import "./Homepage.css"

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";

// import your component functions for use in route links
import SubwayLinesInfo from "./SubwayLinesInfo";
import SubwayStation from "./SubwayStation";
import SubwayStations from "./SubwayStations";

function App() {
  // add links to your pages for now
  return (
    <Switch>
      <Route exact path="/" component={Homepage}></Route>
      <Route exact path="/SubwayLinesInfo" component={SubwayLinesInfo}></Route>
      <Route exact path="/stations" component={SubwayStations}></Route>
      <Route exact path="/stationView" component={SubwayStation}></Route>
    </Switch>
  );
}
  
const Homepage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <div>
   <h2>Welcome to NYCRoute!</h2>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Start your route here!
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>Map View</MenuItem>
        <Link className="App-link" to="/stations"> <MenuItem onClick={handleClose}>List of Stations</MenuItem> </Link>
        <MenuItem onClick={handleClose}>List of Subway Lines</MenuItem>
      </Menu>
    </div>
  );
};
  
export default App;
