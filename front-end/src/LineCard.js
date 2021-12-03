import React from "react";
import Card from "react-bootstrap/Card";
import "./LineCard.css";

import fx_icon from "./line_icons/fx.png";

// TODO: Find a better way to do this...
import { ReactComponent as Line_1 } from "./line_icons/1.svg";
import { ReactComponent as Line_2 } from "./line_icons/2.svg";
import { ReactComponent as Line_3 } from "./line_icons/3.svg";
import { ReactComponent as Line_4 } from "./line_icons/4.svg";
import { ReactComponent as Line_5 } from "./line_icons/5.svg";
import { ReactComponent as Line_6 } from "./line_icons/6.svg";
import { ReactComponent as Line_6d } from "./line_icons/6d.svg";
import { ReactComponent as Line_7 } from "./line_icons/7.svg";
import { ReactComponent as Line_7d } from "./line_icons/7d.svg";
import { ReactComponent as Line_a } from "./line_icons/a.svg";
import { ReactComponent as Line_b } from "./line_icons/b.svg";
import { ReactComponent as Line_c } from "./line_icons/c.svg";
import { ReactComponent as Line_d } from "./line_icons/d.svg";
import { ReactComponent as Line_e } from "./line_icons/e.svg";
import { ReactComponent as Line_f } from "./line_icons/f.svg";
import { ReactComponent as Line_g } from "./line_icons/g.svg";
import { ReactComponent as Line_h } from "./line_icons/h.svg";
import { ReactComponent as Line_j } from "./line_icons/j.svg";
import { ReactComponent as Line_l } from "./line_icons/l.svg";
import { ReactComponent as Line_m } from "./line_icons/m.svg";
import { ReactComponent as Line_n } from "./line_icons/n.svg";
import { ReactComponent as Line_q } from "./line_icons/q.svg";
import { ReactComponent as Line_r } from "./line_icons/r.svg";
import { ReactComponent as Line_s } from "./line_icons/s.svg";
import { ReactComponent as Line_sf } from "./line_icons/sf.svg";
import { ReactComponent as Line_sir } from "./line_icons/sir.svg";
import { ReactComponent as Line_sr } from "./line_icons/sr.svg";
import { ReactComponent as Line_t } from "./line_icons/t.svg";
import { ReactComponent as Line_w } from "./line_icons/w.svg";
import { ReactComponent as Line_z } from "./line_icons/z.svg";

const mapping = {
  1: Line_1,
  2: Line_2,
  3: Line_3,
  4: Line_4,
  5: Line_5,
  6: Line_6,
  "6x": Line_6d, // MTAPI lists this line as 6x
  7: Line_7,
  "7x": Line_7d, // MTAPI lists this line as 7x
  a: Line_a,
  b: Line_b,
  c: Line_c,
  d: Line_d,
  e: Line_e,
  f: Line_f,
  g: Line_g,
  h: Line_h,
  j: Line_j,
  l: Line_l,
  m: Line_m,
  n: Line_n,
  q: Line_q,
  r: Line_r,
  s: Line_s,
  fs: Line_sf, // MTAPI lists this line as fs
  sir: Line_sir,
  sr: Line_sr,
  t: Line_t,
  w: Line_w,
  z: Line_z,
};

const displayTrainTimes = (times, direction) => {
  // if no trains, possible next train is over 60 min away (MTAPI is set to fetch trains within 60 min arrival)
  if (times.length === 0) {
    return (
      <div className="firstTrain">
        <Card.Subtitle className="mb-2 text-muted direction">
          {direction}
        </Card.Subtitle>
        <Card.Text>None next hour</Card.Text>
      </div>
    );
  } else {
    let elements = [];
    let limit = times.length < 3 ? times.length : 3; // display up to three trains
    for (let i = 0; i < limit; i++) {
      let element;
      if (i === 0) {
        let text;
        if (times[i] < 0) {
          text = `${times[i] * -1} min ago`; // shouldn't happen, but just in case...
        } else {
          text = times[i] === 0 ? "Arriving now" : `${times[i]} min`;
        }
        element = (
          <div className="firstTrain" key={i}>
            <Card.Subtitle className="mb-2 text-muted direction">
              {direction}
            </Card.Subtitle>
            <Card.Text>{text}</Card.Text>
          </div>
        );
      } else {
        element = (
          <div className="extraTrain">
            <Card.Text>{times[i]} min</Card.Text>
          </div>
        );
      }
      elements.push(element);
    }
    return elements;
  }
};

const LineCard = (props) => {
  const Icon = mapping[props.line.toLowerCase()];
  const traintimes = props.traintimes;

  // since the fx icon is a png
  if (props.line.toLowerCase() === "fx") {
    return (
      <Card className="cardWrapper">
        <Card.Body className="cardBody">
          <div className="lineIconWrapper">
            <div className="icon">
              <img src={fx_icon} alt="F Express" height="35" width="35" />
            </div>
          </div>
          <div className="directionWrapper">
            {displayTrainTimes(traintimes.uptown, "Uptown")}
          </div>
          <div className="directionWrapper">
            {displayTrainTimes(traintimes.downtown, "Downtown")}
          </div>
        </Card.Body>
      </Card>
    );
  }

  return (
    <Card className="cardWrapper">
      <Card.Body className="cardBody">
        <div className="lineIconWrapper">
          <Icon height="30" width="30" />
        </div>
        <div className="directionWrapper">
          {displayTrainTimes(traintimes.uptown, "Uptown")}
        </div>
        <div className="directionWrapper">
          {displayTrainTimes(traintimes.downtown, "Downtown")}
        </div>
      </Card.Body>
    </Card>
  );
};

export default LineCard;
