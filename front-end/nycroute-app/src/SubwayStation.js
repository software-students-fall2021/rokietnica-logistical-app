import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";

import "./SubwayStation.css";
import LineCard from "./LineCard";

const SubwayStation = (props) => {
  const stationID = props.match.params.id;
  const [station, setStation] = useState({
    "Stop Name": "",
    "Daytime Routes": [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios(`http://localhost:4000/station/${stationID}`)
      .then((res) => {
        setStation(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div></div>;
  }

  return (
    <div className="container">
      <h1 className="stationName">{station["Stop Name"]}</h1>
      <div className="backBtnWrapper">
        <Link className="App-link" to="/stations">
          <Button variant="danger">Back</Button>
        </Link>
      </div>
      <div className="cardsWrapper">
        {station["Daytime Routes"].map((line) => {
          return <LineCard line={line} />;
        })}
      </div>
    </div>
  );
};

export default SubwayStation;
