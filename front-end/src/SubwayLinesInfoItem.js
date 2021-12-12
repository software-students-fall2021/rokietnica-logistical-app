import React from "react";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import axios from "axios";

import "./SubwayLinesInfoItem.css";

const SubwayLinesInfoItem = (props) => {
  var num = 0;
  const favStation = props.fav.includes(props.details.id);
  //console.log(props.fav.includes(props.details.id))
  const listItems = props.details.N.slice(0,3).map((number) => (
    <li key = {num++}>{number} min </li>
  ));
  num = 0
  const listItemsD = props.details.S.slice(0,3).map((number) => (
    <li key = {num++}>{number} min </li>
  ));

  const jwtToken = localStorage.getItem("token");
  //console.log(jwtToken);

  function saveStation(stationId){
    //console.log(stationId); //debugging
    axios
      .get(`${process.env.REACT_APP_BACKEND}/addFavStation/${stationId}`, {
        headers: { Authorization: `JWT ${jwtToken}` }
      })
      .then((response) => {
        props.onChange("true");
      })
      .catch((err) => {
        console.log(`Error`);
        console.error(err);
      })
  }

  function deleteStation(stationId){
    //console.log(stationId); //debugging
    axios
      .get(`${process.env.REACT_APP_BACKEND}/removeFavStation/${stationId}`, {
        headers: { Authorization: `JWT ${jwtToken}` }
      })
      .then((response) => {
        props.onChange("true");
      })
      .catch((err) => {
        console.log(`Error`);
        console.error(err);
      })
  }

  return (
    <Accordion.Item eventKey={props.details.id}>
      <Accordion.Header>
        {localStorage.getItem("token")?(
          (favStation)?
            ("\u2605"):
            ("\u2606"))
          :null
        } {props.details.name}
      </Accordion.Header>
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
        {localStorage.getItem("token")?(
          (favStation)?
            (<Button variant="outline-dark" onClick={() => deleteStation(props.details.id)}> Remove </Button>):
            (<Button variant="outline-dark" onClick={() => saveStation(props.details.id)}> Favorite </Button>))
          :null
        }
      </Accordion.Body>
    </Accordion.Item>
  );
};

export default SubwayLinesInfoItem;
