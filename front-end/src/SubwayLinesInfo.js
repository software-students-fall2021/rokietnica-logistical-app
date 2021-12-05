import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import SubwayLinesInfoItem from "./SubwayLinesInfoItem.js";
import NavBar from "./NavBar";

import "./SubwayLinesInfo.css";

const SubwayLinesInfo = (props) => {
  // start a state varaible with a blank array
  const [data, setData] = useState([]);
  const [reverse, setReverse] = useState([false, "regularOrder"]);
  const [refresh, setRefresh] = useState([false]);

  const subwayLine = props.match.params.id;

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    const getData = () => {
      axios(`${process.env.REACT_APP_BACKEND}/lines/${subwayLine}`)
        .then((response) => {
          console.log(response.data)
          setData(response.data);
          //setData(response.data);
        })
        .catch((err) => {
          console.log(`Error with server`);
          console.error(err);
        })
        .finally(() => {
          setRefresh(false);
        });
    }
    getData();
  }, [refresh, subwayLine]); // only run it once!

  function reverseOrdering(e) {
    e.preventDefault();
    if (reverse[0]) {
      setReverse([false, "regularOrder"]);
    } else {
      setReverse([true, "reverseOrder"]);
    }
  }

  function refreshPage(e) {
    e.preventDefault();
    setRefresh(true);
  }

  return (
    <div>
      <NavBar />
      <div className = "mainContent">
          <h1> {subwayLine} Line Info </h1>
          <Link className="App-link" to="/lines">
            <Button>Back</Button>
          </Link>
          <Button onClick={reverseOrdering} id = "listOrder"> {
            (reverse[0]) ? ("\u25BC") : ("\u25B2")
          } </Button>
          <Button onClick={refreshPage} id = "refresh"> Refresh </Button>
          <Accordion id={reverse[1]}>
            {data.map((item) => (
              <SubwayLinesInfoItem className="item" key={item.id} details={item} route={subwayLine}/>
            ))}
          </Accordion>
      </div>
    </div>
  );
};

export default SubwayLinesInfo;
