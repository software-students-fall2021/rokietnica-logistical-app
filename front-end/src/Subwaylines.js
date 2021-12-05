import React, { useState, useEffect } from "react";
import axios from "axios";

import SubwayIcon from "./SubwayIcon";
import NavBar from "./NavBar";

import "./Subwaylines.css";

function Lines() {
    const [data, setData] = useState([]);
    var id = 0;
    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND}/allLines`)
          .then((response) => {
            console.log(response.data)
            setData(response.data);
          })
          .catch((err) => {
            console.log(`Sorry, buster.  No more requests allowed today!`);
            console.error(err);

            // make some backup fake data
            const backupData = [];
            setData(backupData);
          });
      }, []);
    return (
      <div>
        <NavBar />
        <div className="grid-container">
          {data.map((item) => (
              <SubwayIcon key = {id++} details = {item}/>
          ))}
        </div>
      </div>
        );
}

export default Lines;
