import React from "react";
import Card from "react-bootstrap/Card";

import "./SubwayStation.css";

// temp mock data for a single station
// needs to be extracted from props
const station = {
  name: "Astor Pl",
  lines: ["4", "5", "6", "A", "B", "C", "1", "2", "3"],
};

const SubwayStation = () => {
  return (
    <div className="container">
      <h1 className="stationName">{station.name}</h1>
      <div className="cardsWrapper">
        {station.lines.map((line) => (
          <div className="cardWrapper">
            <Card>
              <Card.Body>
                <Card.Title>{line}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Downtown
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  Uptown
                </Card.Subtitle>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubwayStation;
