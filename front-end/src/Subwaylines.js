import React, { useState, useEffect } from "react";
import axios from "axios";

import SubwayIcon from "./SubwayIcon";
import NavBar from "./NavBar";

import "./Subwaylines.css";

function Lines() {
    const [data, setData] = useState([]);
    function getColor(line){
      const ret = []
      if (["1", "2", "3"].includes(line)){
        ret[0] = "red";
      }
      else if(["4", "5", "6"].includes(line)){
        ret[0] = "darkgreen";
      }
      else if(line === "7"){
        ret[0] = "purple";
      }
      else if(["N", "Q", "R"].includes(line)){
        ret[0] = "yellow";
      }
      else if(["B", "D", "F", "M"].includes(line)){
        ret[0] = "orange";
      }
      else if(["J", "Z"].includes(line)){
        ret[0] = "brown";
      }
      else if(["A", "C", "E", "H"].includes(line)){
        ret[0] = "blue";
      }
      else if (line === "G"){
        ret[0] = "green";
      }
      else if (line === "L"){
        ret[0] = "grey";
      }
      else if (["S", "FS"].includes(line)){
        ret[0] = "shuttle";
        if (line === "FS"){
          ret[1] = "SF"
          return ret
        }
      }
      else{
        ret[0] = ""
      }
      ret[1] = line
      return ret
    }
    var id = 0;
    useEffect(() => {
        axios(`${process.env.REACT_APP_BACKEND}/allLines`)
          .then((response) => {
            console.log(response.data)
            setData(response.data);
          })
          .catch((err) => {
            console.log(`No more requests`);
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
              <SubwayIcon key = {id++} details = {getColor(item)} line = {item}/>
          ))}
        </div>
      </div>
        );
}

export default Lines;
