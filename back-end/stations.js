const fs = require("fs");
const parseCSV = require("./parseCSV");

// parse Stations.csv
const stations_csv_str = fs.readFileSync("Stations.csv").toString();
const stationData = parseCSV(stations_csv_str);

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
const columns = stationData[0];
stationData.shift();

const stations = stationData.map((row) => {
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

module.exports = {
  columns,
  stations,
  boroughCode,
};
