const fs = require("fs");
const parseCSV = require("./parseCSV");


/**
 * Relevant columns:
 *   - Station ID
 *   - Stop Name
 *   - Borough
 *   - Daytime Routes (Lines)
 *   - North Direction Label (Uptown)
 *   - South Direction Label (Downtown)
 *   If a direction label are empty, then it is a terminal station for that direction
 */


var columns = "";
var stations= {"message": "Hello"};


const boroughCode = {
  Q: "Queens",
  M: "Manhattan",
  Bk: "Brooklyn",
  Bx: "Bronx",
  SI: "Staten Island",
};



module.exports = {
  columns,
  stations,
  boroughCode,
};
