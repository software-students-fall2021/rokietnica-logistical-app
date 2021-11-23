const fs = require("fs");
const parseCSV = require("./parseCSV");

// parse Stations.csv
var stations_csv_str = fs.readFileSync("Stations.csv").toString();
var stationData = parseCSV(stations_csv_str);

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
var columns = stationData[0];
stationData.shift();

var stations = stationData.map((row) => {
  const station = {};
  for (let i = 0; i < columns.length; i++) {
    station[columns[i]] = row[i];
  }
  station["Daytime Routes"] = station["Daytime Routes"].split(" ");
  return station;
});

const boroughCode = {
  Q: "Queens",
  M: "Manhattan",
  Bk: "Brooklyn",
  Bx: "Bronx",
  SI: "Staten Island",
};

const parse = (data)=>
{
  console.log(data);
  //stations_csv_str = data;
  //stationData = parseCSV(stations_csv_str);
 

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

}

module.exports = {
  columns,
  stations,
  boroughCode,
  parse
};
