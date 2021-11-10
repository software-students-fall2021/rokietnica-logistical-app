import React from "react";
import { Link } from "react-router-dom";


const SubwayIcon = (props) => {
  const colorClass = "grid-item-" + props.details.color;
  return (
    <Link className="App-link" to={`/subwayLinesInfo/${props.details.id}`}> 
        <div className={colorClass}> 
            {props.details.line}
        </div>
    </Link>
  );
};

export default SubwayIcon;