import React from "react";
import { Link } from "react-router-dom";


const SubwayIcon = (props) => {
  var colorClass = "";
  var contentClass = "";
  if (props.details[2] === "circle"){
    colorClass = "grid-item-" + props.details[0];
    contentClass = props.details[2] + "Content";
  }
  else {
    colorClass = "grid-item-diamond-" + props.details[0];
    contentClass = props.details[2] + "Content";
  }
  return (
    <Link className="App-link" to={`/lines/${props.line}`}>
      <div className={colorClass}> 
        <div className = {contentClass}>
          {props.details[1]}
        </div>
      </div>
    </Link>
  ); 
};

export default SubwayIcon;
