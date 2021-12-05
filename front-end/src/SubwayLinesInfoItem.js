import React from "react";
import Accordion from "react-bootstrap/Accordion";

import "./SubwayLinesInfoItem.css";

const SubwayLinesInfoItem = (props) => {
  var num = 0;
  //console.log(props.details.N)
  const listItems = props.details.N.slice(0,3).map((number) => (
    <li key = {num++}>{number} min </li>
  ));
  num = 0
  const listItemsD = props.details.S.slice(0,3).map((number) => (
    <li key = {num++}>{number} min </li>
  ));
  return (
    <Accordion.Item eventKey={props.details.id}>
      <Accordion.Header>{props.details.name}</Accordion.Header>
      <Accordion.Body>
        {(listItems.length > 0)?(
          <div className= "list">
            <h4> Uptown: </h4>
            <ul> {listItems} </ul>
          </div>
        ):(
          <div>
            <p>Currently no {props.route} trains going uptown</p>
          </div>
        )
        }
        {(listItemsD.length > 0)?(
          <div className= "list">
            <h4>Downtown: </h4>
            <ul> {listItemsD} </ul>
          </div>
        ):(
          <div>
            <p>Currently no {props.route} trains going downtown</p>
          </div>
        )
        }
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SubwayLinesInfoItem;
