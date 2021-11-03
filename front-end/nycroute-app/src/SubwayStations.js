import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

import stationData from "./stationData";

const SubwayStations = () => {
  return (
    <ListGroup>
      {stationData.map((station) => (
        <ListGroup.Item>{station.name}</ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default SubwayStations;
