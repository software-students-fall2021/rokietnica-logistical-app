import React from "react";
import { Switch, Route, Link } from "react-router-dom";

import {ReactComponent as SubwaySvg} from './New_York_Subway_Map_Alargule.svg';


import "./Homepage.css";

import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";


// import your component functions for use in route links

import SubwayLinesInfo from "./SubwayLinesInfo";
import SubwayStation from "./SubwayStation";
import SubwayStations from "./SubwayStations";
import Subwaylines from "./Subwaylines";
import Login from "./Login";
import Signup from "./Signup";
import Logout from "./Logout";

import MapView from "./MapView";
import {
    ComposableMap,
    Geographies,
    Geography,
  } from "react-simple-maps"




function App(props) {
  return (
    <Switch>
      <Route exact path="/">
        <Homepage changeState = {props.changeState} />
      </Route>

      <Route path="/lines/:name" component={SubwayLinesInfo}></Route>
      <Route exact path="/stations" component={SubwayStations}></Route>
      <Route path="/stations/:id" component={SubwayStation}></Route>
      <Route exact path="/stationView" component={SubwayStation}></Route>
      <Route exact path="/lines" component={Subwaylines}></Route>
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/signup" component={Signup}></Route>
      <Route exact path="/logout" component={Logout}></Route>

      <Route exact path="/mapview" component={MapView}></Route>

    </Switch>
  );
}

// url to a valid topojson file

const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const Homepage = (props) => {

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };


  if (localStorage.getItem("token")){
    props.changeState(true)
  }
  else{
    props.changeState(false)
  }

  return (
      <div>
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

        <Link className="App-link" to="/stations">
          {" "}
          <MenuItem onClick={handleClose}>List of Stations</MenuItem>{" "}
        </Link>
        <Link className="App-link" to="/lines">
          {" "}
          <MenuItem onClick={handleClose}>List of Subway Lines</MenuItem>
        </Link>
      </Menu>

    </div>
    <div>
        <SubwaySvg style = {{height: 800, width:800}} />
      </div>
   </div>

  );
};

export default App;