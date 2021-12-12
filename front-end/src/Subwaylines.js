import React, { useState, useEffect } from "react";
import axios from "axios";

import SubwayIcon from "./SubwayIcon";

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
      else if(["N", "Q", "R", "W"].includes(line)){
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
      else if (line === "T"){
        ret[0] = "teal";
      }
      else if (line === "SIR"){
        ret[0] = "sir";
      }
      else if (["S", "FS", "SR"].includes(line)){
        ret[0] = "shuttle";
        if (line === "FS"){
          ret[1] = "SF"
          ret[2] = "circle"
          return ret
        }
      }
      else if (["5X", "6X", "7X"].includes(line)){
        ret[2] = "diamond";
        if (line === "7X"){
          ret[0] = "purple";
          ret[1] = "7";
          return ret;
        }
        else if (line === "5X"){
          ret[1] = "5";
        }
        else{
          ret[1] = "6";
        }
        ret[0] = "dark-green";
        return ret;
      }
      else{
        ret[0] = ""
      }
      ret[1] = line
      ret[2] = "circle"
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
            const backupData = ["1", "2", "3", "4", "5", "5X", "6", "6X", "7", "7X", "A", "C", "E", "SIR", "SR"];
            setData(backupData);
          });
      }, []);

    return (
      <div id = "main">
        <div className="grid-container">
          {data.map((item) => (
              <SubwayIcon key = {id++} details = {getColor(item)} line = {item}/>
          ))}
        </div>
      </div>
        );
}

export default Lines;
