import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";
import axios from "axios";

import "./SubwayStations.css";

const SubwayStations = () => {
  const [stations, setStations] = useState([]);
  useEffect(() => {
    axios("http://localhost:4000/stationData")
      .then((res) => {
        setStations(
          res.data.stations.sort((a, b) =>
            a["Stop Name"] >= b["Stop Name"] ? 1 : -1
          )
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);
  return (
    <div>
      <h1>Stations</h1>
      <ListGroup className="stationsWrapper">
        {stations.map((st) => (
          <Link className="App-link" to={`/stations/${st["Station ID"]}`}>
            <ListGroup.Item action>{st["Stop Name"]}</ListGroup.Item>
          </Link>
        ))}
      </ListGroup>
    </div>
  );
};

export default SubwayStations;
