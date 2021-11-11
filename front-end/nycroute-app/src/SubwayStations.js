import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import "./SubwayStations.css";
import stationData from "./stationData";

const SubwayStations = () => {
  return (
    <ListGroup className="stationsWrapper">
      {stationData.map((station) => (
        <Link className="App-link" to={`/stations/${station.id}`}>
          <ListGroup.Item action>{station.name}</ListGroup.Item>
        </Link>
      ))}
    </ListGroup>
  );
};

export default SubwayStations;
