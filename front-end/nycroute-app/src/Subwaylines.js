import React, { useState, useEffect } from "react";
import axios from "axios";

import SubwayIcon from "./SubwayIcon";

import "./Subwaylines.css";

function Lines() {
    const [data, setData] = useState([]);
    useEffect(() => {
        // fetch some mock data about animals for sale
        axios("https://my.api.mockaroo.com/line0.json?key=57b58bf0")
          .then((response) => {
            // extract the data from the server response
            setData(response.data);
          })
          .catch((err) => {
            // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
            console.log(`Sorry, buster.  No more requests allowed today!`);
            console.error(err); // the server returned an error... probably too many requests... until we pay!
    
            // make some backup fake data
            const backupData = [
              {
                id : 1,
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
      }, []); 
    return (
      <div className="grid-container">
          {data.map((item) => (
              <SubwayIcon key = {item.id} details = {item}/>
          ))}
      </div>
        );
}

export default Lines;
