import React from "react";
import Accordion from "react-bootstrap/Accordion";

import "./SubwayLinesInfoItem.css";

const SubwayLinesInfoItem = (props) => {
  var num = 0;
  const listItems = props.details.uptown.map((number) => (
    <li key = {num++}>{number} Minutes Away</li>
  ));
  num = 0
  const listItemsD = props.details.downtown.map((number) => (
    <li key = {num++}>{number} Minutes Away</li>
  ));
  return (
    <Accordion.Item eventKey={props.details.id}>
      <Accordion.Header>{props.details.name}</Accordion.Header>
      <Accordion.Body>
        <div className= "list">
          <h4> Uptown: </h4>
          <ul> {listItems} </ul>
        </div>
        <div className= "list">
          <h4>DownTown: </h4>
          <ul> {listItemsD} </ul>
        </div>
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SubwayLinesInfoItem;
