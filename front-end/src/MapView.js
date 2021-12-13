import React from "react";


import "./MapView.css";

import {
    ComposableMap,
    Geographies,
    Geography,
  } from "react-simple-maps"

  import {ReactComponent as SubwayMapSvg} from './NYC_subway-4D.svg';
  //import {ReactComponent as SubwayMapSvg} from './New_York_Subway_Map_Alargule.svg';


const geoUrl = "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";



const MapView = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  return (
    <div>
     <div>
        <SubwayMapSvg style = {{height: 800, width:800}} />
      </div>
   </div>
  );
};

export default MapView;