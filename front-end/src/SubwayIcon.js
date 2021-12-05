import React from "react";
import { Link } from "react-router-dom";


const SubwayIcon = (props) => {
  const colorClass = "grid-item-" + props.details[0];
  return (
    <Link className="App-link" to={`/lines/${props.line}`}>
      <div className={colorClass}> 
        {props.details[1]}
      </div>
    </Link>
  );
};

export default SubwayIcon;
