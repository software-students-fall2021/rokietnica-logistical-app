import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

import "./SubwayStation.css";
import LineCard from "./LineCard";

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
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    const fetchStation = () => {
      axios
        .get(`${process.env.REACT_APP_BACKEND}/station/${stationID}`)
        .then((res) => {
          setStation(res.data);
          setSuccess(true);
          setTimeout(() => setSuccess(false), 5000);
          setShowFailure(false);
        })
        .catch((err) => {
          setShowFailure(true);
          console.error(err);
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

  const favBtnHandler = (favStatus, id) => {
    if (favStatus) {
      setIsFav(false);
    } else {
      setIsFav(true);
    }
    const jwt = localStorage.getItem("token");
    let calltype =
      favStatus === "\u2606" ? "addFavStation" : "removeFavStation";
    axios
      .get(`${process.env.REACT_APP_BACKEND}/${calltype}/${id}`, {
        headers: { Authorization: `JWT ${jwt}` },
      })
      .then(() => {
        favFetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const favFetch = () => {
    const jwt = localStorage.getItem("token");
    axios
      .get(process.env.REACT_APP_BACKEND + "/getAllFavStations", {
        headers: { Authorization: `JWT ${jwt}` },
      })
      .then((response) => {
        if (response.data !== "no favorite stations") {
          const stationIDs = response.data.map((e) => {
            return e.id;
          });
          if (stationIDs.includes(stationID)) {
            setIsFav(true);
          } else {
            setIsFav(false);
          }
        } else {
          setIsFav(false);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(favFetch);

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
            <Button
              variant="outline-dark"
              onClick={() => {
                favBtnHandler(isFav, stationID);
              }}
            >
              {isFav ? "\u2605" : "\u2606"}
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
            <Button
              variant="outline-dark"
              onClick={() => {
                favBtnHandler(isFav, stationID);
              }}
            >
              {isFav ? "\u2605" : "\u2606"}
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
          <Button
            variant="outline-dark"
            onClick={() => {
              favBtnHandler(isFav, stationID);
            }}
          >
            {isFav ? "\u2605" : "\u2606"}
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
