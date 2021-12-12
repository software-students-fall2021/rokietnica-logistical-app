import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import "./SubwayStation.css";
import LineCard from "./LineCard";

const EXPRESS_DOMAIN = "http://localhost:4000";

const SubwayStation = (props) => {
  const stationID = props.match.params.id;
  const [station, setStation] = useState({
    name: "",
    routes: [],
    traintimes: {},
  });
  const [loading, setLoading] = useState(true);
  const [showRefresh, setRefresh] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);

  useEffect(() => {
    const fetchStation = () => {
      axios
        .get(`${EXPRESS_DOMAIN}/station/${stationID}`)
        .then((res) => {
          setStation(res.data);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);
          setShowFailure(false);
        })
        .catch((err) => {
          setShowFailure(true);
          console.log(err);
        })
        .finally(() => {
          setRefresh(false);
          setLoading(false);
        });
    };
    fetchStation();
    // background refresh every 30 seconds
    const interval = setInterval(fetchStation, 30000);
    return () => clearInterval(interval);
  }, [showRefresh, stationID]);

  if (loading) {
    return (
      <div className="spinnerWrapper">
        <Spinner className="spinner" animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (station === "no station with specified id") {
    return (
      <div className="no-station">
        No station with the specified ID was found.
      </div>
    );
  }

  if (station.name && station.routes.length === 0) {
    return (
      <div className="mainContent">
        <div className="container">
          <h1 className="stationName">{station.name}</h1>
          <div className="buttonsWrapper">
            <Link className="App-link" to="/stations">
              <Button variant="danger">Back</Button>
            </Link>
            <Button
              variant="primary"
              onClick={() => {
                setRefresh(true);
              }}
            >
              Refresh
            </Button>
          </div>
          <div className="no-routes">
            No trains are arriving within the next hour.
          </div>
        </div>
      </div>
    );
  }

  if (showFailure) {
    return (
      <div className="mainContent">
        <div className="container">
          <Alert
            variant="danger"
            onClose={() => setShowFailure(false)}
            dismissible
          >
            <p className="alertmsg">Error with fetching train data</p>
          </Alert>
          <div className="buttonsWrapper">
            <Link className="App-link" to="/stations">
              <Button variant="danger">Back</Button>
            </Link>
            <Button
              variant="primary"
              onClick={() => {
                setRefresh(true);
              }}
            >
              Refresh
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mainContent">
      <div className="container">
        {showSuccess ? (
          <Alert variant="info" onClose={() => setSuccess(false)} dismissible>
            <p className="alertmsg">Updated just now</p>
          </Alert>
        ) : (
          ""
        )}
        <h1 className="stationName">{station.name}</h1>
        <div className="buttonsWrapper">
          <Link className="App-link" to="/stations">
            <Button variant="danger">Back</Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              setRefresh(true);
            }}
          >
            Refresh
          </Button>
        </div>
        <div className="cardsWrapper">
          {station.routes.map((line) => {
            return (
              <LineCard
                key={line}
                line={line}
                traintimes={station.traintimes[line]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SubwayStation;
