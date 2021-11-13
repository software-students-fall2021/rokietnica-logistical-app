import React from "react";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

import "./SubwayStation.css";
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
        <Link className="App-link" to={`/stations`}>
          <Button variant="danger">Back</Button>
        </Link>
      </div>
      <div className="cardsWrapper">
        {station.lines.map((line) => (
          <Card className="cardWrapper">
            <Card.Body>
              <Card.Title className="lineTitle">{line}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Downtown
              </Card.Subtitle>
              <Card.Text>2 min</Card.Text>
              <Card.Subtitle className="mb-2 text-muted">Uptown</Card.Subtitle>
              <Card.Text>4 min</Card.Text>
            </Card.Body>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default SubwayStation;
