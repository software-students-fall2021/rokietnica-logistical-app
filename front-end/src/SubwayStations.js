import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import axios from "axios";

import SubwayStationItem from "./SubwayStationItem";
import "./SubwayStations.css";

const SubwayStations = () => {
  const [stations, setStations] = useState([
    { "Station ID": "", "Stop Name": "", "Daytime Routes": [] },
  ]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
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
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1>Stations</h1>;
  }

  return (
    <div>
      <h1>Stations</h1>
      <ListGroup className="stationsWrapper">
        {stations.map((st) => {
          return <SubwayStationItem station={st} />;
        })}
      </ListGroup>
    </div>
  );
};

export default SubwayStations;
