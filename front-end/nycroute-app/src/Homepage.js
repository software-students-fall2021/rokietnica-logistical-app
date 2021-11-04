import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
  
const App = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  return (
    <div
      style={{
        marginLeft: "40%",
      }}
    >
      <h2>Welcome to NYCRoute!</h2>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        Start your route here!
      </Button>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        onClose={handleClose}
        open={Boolean(anchorEl)}
      >
        <MenuItem onClick={handleClose}>Map View</MenuItem>
        <MenuItem onClick={handleClose}>List of Stations</MenuItem>
        <MenuItem onClick={handleClose}>List of Subway Lines</MenuItem>
      </Menu>
    </div>
  );
};
  
export default App;
