import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import "./SubwayStations.css";
import stationData from "./stationData";

const SubwayStations = () => {
  return (
    <div class="stationsWrapper">
      <ListGroup>
        {stationData.map((station) => (
          <ListGroup.Item
            action
            onClick={() => {
              alert(`tapped on ${station.name}`);
            }}
          >
            {station.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default SubwayStations;
