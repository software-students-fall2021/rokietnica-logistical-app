import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";

import "./SubwayStations.css";
import stationData from "./stationData";

const SubwayStations = () => {
  return (
    <div>
      <h1>Stations</h1>
      <Dropdown className="filter">
        <Dropdown.Toggle variant="info" id="dropdown-basic">
          Filter by Bourough
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item>Manhattan</Dropdown.Item>
          <Dropdown.Item>Brooklyn</Dropdown.Item>
          <Dropdown.Item>Queens</Dropdown.Item>
          <Dropdown.Item>Bronx</Dropdown.Item>
          <Dropdown.Item>Staten Island</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <ListGroup className="stationsWrapper">
        {stationData.map((station) => (
          <Link className="App-link" to={`/stations/${station.id}`}>
            <ListGroup.Item action>{station.name}</ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default SubwayStations;
