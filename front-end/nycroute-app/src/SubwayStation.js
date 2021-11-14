import React from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

import "./SubwayStation.css";
import LineCard from "./LineCard";
import stationData from "./stationData";

const SubwayStation = (props) => {
  const stationID = props.match.params.id;
  let station;

  // find station with matching id, assuming array format
  for (let st of stationData) {
    if (st.id == stationID) {
      station = st;
    }
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
        {station.lines.map((line) => {
          return <LineCard line={line} />;
        })}
      </div>
    </div>
  );
};

export default SubwayStation;
