import React, { useEffect, useState } from "react";
import ListGroup from "react-bootstrap/ListGroup";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import SubwayStationItem from "./SubwayStationItem";
import "./SubwayStations.css";

const EXPRESS_DOMAIN = "http://localhost:4000";

const SubwayStations = () => {
  const [stations, setStations] = useState([{ id: "", name: "", routes: [] }]);
  const [loading, setLoading] = useState(true);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    axios
      .get(EXPRESS_DOMAIN + "/allStations")
      .then((res) => {
        setStations(res.data.sort((a, b) => (a.name >= b.name ? 1 : -1)));
        setShowFailure(false);
      })
      .catch((err) => {
        setShowFailure(true);
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Stations</h1>
        <div className="spinnerWrapper">
          <Spinner className="spinner" animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      </div>
    );
  }

  if (showFailure) {
    return (
      <div>
        <h1>Stations</h1>
        <Alert
          variant="danger"
          onClose={() => setShowFailure(false)}
          dismissible
        >
          <p className="alertmsg">Error with fetching train data</p>
        </Alert>
      </div>
    );
  }

  return (
    <div>
      <h1>Stations</h1>
      <ListGroup className="stationsWrapper">
        {stations.map((st) => {
          return <SubwayStationItem station={st} />;
        })}
      </ListGroup>
    </div>
  );
};

export default SubwayStations;
