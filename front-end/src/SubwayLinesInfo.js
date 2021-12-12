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
  const [favStation, setFavStation] = useState([]);
  const [favList, setFavList] = useState([]);
  const [reverse, setReverse] = useState([false, "regularOrder"]);
  const [refresh, setRefresh] = useState(true);
  const [initLoad, setInitLoad] = useState(true);
  const [favLoad, setFavLoad] = useState(true);

  const [err, setErr] = useState(false);

  const subwayLine = props.match.params.name;

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    if (refresh){
      axios(`${process.env.REACT_APP_BACKEND}/lines/${subwayLine}`)
        .then((response) => {
          console.log("refresh alert");
          setData(response.data);
        })
        .catch((err) => {
          console.log(`Error with server`);
          console.error(err);
          setErr(true)
        })
        .finally(() => {
          setRefresh(false);
          setInitLoad(false)
        });
      
      const jwtToken = localStorage.getItem("token");
      axios
      .get(`${process.env.REACT_APP_BACKEND}/getFavStations/${subwayLine}`, {
        headers: { Authorization: `JWT ${jwtToken}` }
      })
      .then((response) => {
        console.log(response.data.data);
        setFavStation(response.data.data);
        setFavList(response.data.stationIds)
      })
      .catch((err) => {
        //console.log(`Error with server`);
        //console.error(err);
        setFavStation([]);
        setFavList([]);
        setErr(true)
        //console.log(initLoad)
      })
      .finally(() => {
        setRefresh(false);
        setFavLoad(false)
      });  
    }
  }, [refresh, subwayLine]);

  useEffect(()=>{
    const interval = setInterval(() => {
      setRefresh(true)
    }, 30000);
  return () => {
    clearInterval(interval);
  }
  }, [subwayLine]);

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

  if (initLoad || favLoad){
    return (
      <div>
        <NavBar />
        <div className = "mainContent">
            <h1> Loading </h1>
        </div>
      </div>
    );
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
          <Accordion>
            {favStation.map((item) => (
              (item.routes).includes(subwayLine)
              ? (<SubwayLinesInfoItem className="item" key={item.id} details={item} route={subwayLine} onChange={setRefresh} fav= {favList}/>)
              : null
            ))}
          </Accordion>
          <Accordion id={reverse[1]}>
            {data.map((item) => (
              !favList.includes(item.id)
                ? ( <SubwayLinesInfoItem className="item" key={item.id} details={item} route={subwayLine} onChange={setRefresh} fav= {favList}/> )
                : null
            ))}
          </Accordion>
      </div>
    </div>
  );
};

export default SubwayLinesInfo;
