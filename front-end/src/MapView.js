import React from "react";


import "./MapView.css";

import {
    ComposableMap,
    Geographies,
    Geography,
  } from "react-simple-maps"


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
     <ComposableMap
            projectionConfig={{
            scale: 175,
            rotation: [0, 0, 0],
            }}
            width={800}
            height={400}
            style={{ width: "100%", height: "100%" }} 
    >
       <Geographies geography={geoUrl}>
         {({geographies}) => geographies.map(geo =>
           <Geography key={geo.rsmKey} geography={geo} />
         )}
       </Geographies>
     </ComposableMap>
   </div>
   </div>
  );
};

export default MapView;