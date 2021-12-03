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
  const [isRefresh, setRefresh] = useState(false);
  const [showSuccess, setSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [hasRefreshed, setHasRefreshed] = useState(false);

  useEffect(() => {
    axios
      .get(`${EXPRESS_DOMAIN}/station/${stationID}`)
      .then((res) => {
        setStation(res.data);
        setShowFailure(false);
        if (hasRefreshed) {
          setSuccess(true);
          setTimeout(() => setSuccess(false), 3000);
        }
      })
      .catch((err) => {
        setShowFailure(true);
        console.log(err);
      })
      .finally(() => {
        setRefresh(false);
        setLoading(false);
      });
  }, [isRefresh]);

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

  if (showFailure) {
    return (
      <div className="container">
        <Alert
          variant="danger"
          onClose={() => setShowFailure(false)}
          dismissible
        >
          <p id="successMsg">Error with fetching train data</p>
        </Alert>
        <div className="buttonsWrapper">
          <Link className="App-link" to="/stations">
            <Button variant="danger">Back</Button>
          </Link>
          <Button
            variant="primary"
            onClick={() => {
              setRefresh(true);
              setHasRefreshed(true);
            }}
          >
            Refresh
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      {showSuccess ? (
        <Alert variant="success" onClose={() => setSuccess(false)} dismissible>
          <p id="successMsg">Data successfully fetched</p>
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
            setHasRefreshed(true);
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
  );
};

export default SubwayStation;
