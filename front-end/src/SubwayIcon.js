import React from "react";
import { Link } from "react-router-dom";


const SubwayIcon = (props) => {
  return (
    <Link className="App-link" to={`/lines/${props.details}`}>
        {props.details}
    </Link>
  );
};

export default SubwayIcon;
