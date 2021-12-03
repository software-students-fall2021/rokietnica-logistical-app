import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

import "./SubwayStation.css";
import LineCard from "./LineCard";

const EXPRESS_DOMAIN = "http://localhost:4000";

const SubwayStation = (props) => {
  const stationID = props.match.params.id;
  const [station, setStation] = useState({
    name: "",
    routes: [],
    traintimes: {},
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${EXPRESS_DOMAIN}/station/${stationID}`)
      .then((res) => {
        console.log("res.data: " + res.data);
        setStation(res.data);
        console.log(station);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [stationID]);

  if (loading) {
    return (
      <div className="spinnerWrapper">
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (station == "no station with specified id") {
    return (
      <div className="no-station">
        No station with the specified ID was found.
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="stationName">{station.name}</h1>
      <div className="backBtnWrapper">
        <Link className="App-link" to="/stations">
          <Button variant="danger">Back</Button>
        </Link>
      </div>
      <div className="cardsWrapper">
        {station.routes.map((line) => {
          return <LineCard key={line} line={line} />;
        })}
      </div>
    </div>
  );
};

export default SubwayStation;
