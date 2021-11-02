import React from "react";
import ListGroup from "react-bootstrap/ListGroup";

// temp mock data
const stationData = [
  {
    name: "8 St - NYU",
    lines: ["R", "W"],
  },
  {
    name: "West 4 St - Washington Square",
    lines: ["A", "C"],
  },
  {
    name: "14 St - Union Square",
    lines: ["R", "W", "L", "6"],
  },
  {
    name: "Astor Pl",
    lines: ["4", "5", "6"],
  },
  {
    name: "Times Square - 42 St",
    lines: ["A", "C", "E", "N"], // a lot more in reality
  },
];

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
