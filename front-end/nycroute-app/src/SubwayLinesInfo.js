import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";

import React, { useState, useEffect } from "react";
import axios from "axios";
import SubwayLinesInfoItem from "./SubwayLinesInfoItem.js";
import "./SubwayLinesInfo.css";

const SubwayLinesInfo = (props) => {
  // start a state varaible with a blank array
  const [data, setData] = useState([]);
  const [reverse, setReverse] = useState([false, "regularOrder"]);

  // the following side-effect will be called once upon initial render
  useEffect(() => {
    // fetch some mock data about animals for sale
    axios("https://my.api.mockaroo.com/line0.json?key=57b58bf0")
      .then((response) => {
        // extract the data from the server response
        setData(response.data[0].stations);
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`);
        console.error(err); // the server returned an error... probably too many requests... until we pay!

        // make some backup fake data
        const backupData = [
          {
            line: "1",
            stations: [
              {
                id: 1,
                name: "first",
                uptown: "[4, 5, 6]",
                downtown: "[2, 4, 7, 10]",
              },
              {
                id: 2,
                name: "second",
                uptown: "[5]",
                downtown: "[2, 5]",
              },
              {
                id: 3,
                name: "third",
                uptown: "[4,5,6,7]",
                downtown: "[4,5,6,7]",
              },
              {
                id: 4,
                name: "fourth",
                uptown: "[2, 5]",
                downtown: "[5]",
              },
            ],
          },
        ];

        setData(backupData);
      });
  }, []); // only run it once!

  function reverseOrdering(e) {
    e.preventDefault();
    if (reverse[0]) {
      setReverse([false, "regularOrder"]);
    } else {
      setReverse([true, "reverseOrder"]);
    }
  }

  return (
    <div className="SubwayLinesInfo">
      <h1> 7 Subway Line Info </h1>
      <Button onClick={reverseOrdering} id = "listOrder"> Reverse </Button>
      <Accordion id={reverse[1]}>
        {data.map((item) => (
          <SubwayLinesInfoItem className="item" key={item.id} details={item} />
        ))}
      </Accordion>
    </div>
  );
};

export default SubwayLinesInfo;
