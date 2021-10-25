import React from 'react';
import Accordion from 'react-bootstrap/Accordion';

const SubwayStationInfoItem = (props) =>{
  const listItems = props.details.uptown.map((number) => <li>{number} Minutes Away</li>);
  const listItemsD = props.details.downtown.map((number) => <li>{number} Minutes Away</li>);
  return (
      <Accordion.Item eventKey={props.details.id}>
        <Accordion.Header>{props.details.name}</Accordion.Header>
        <Accordion.Body>
         Uptown:
         <ul> {listItems} </ul>
         DownTown:
         <ul> {listItemsD} </ul>
        </Accordion.Body>
      </Accordion.Item>
  );
}

export default SubwayStationInfoItem;
