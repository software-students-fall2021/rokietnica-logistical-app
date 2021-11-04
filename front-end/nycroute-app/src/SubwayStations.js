import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import "./SubwayStations.css";
import stationData from "./stationData";

const SubwayStations = () => {
  return (
    <ListGroup className="stationsWrapper">
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
  );
};

export default SubwayStations;
