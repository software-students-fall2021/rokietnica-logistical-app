import React from "react";
import ListGroup from "react-bootstrap/ListGroup";
import { Link } from "react-router-dom";

import "./SubwayStationItem.css";

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

const SubwayStationItem = (props) => {
  return (
    <Link className="App-link" to={`/stations/${props.station.id}`}>
      <div className="contentWrapper">
        <ListGroup.Item key={props.station.id} action>
          {props.station.name}
          <div className="iconsWrapper">
            {props.station.routes.map((line) => {
              // shouldn't happen but just in case...
              if (!Object.keys(mapping).includes(line.toLowerCase())) {
                return <div>{line}</div>;
              }
              const Icon = mapping[line.toLowerCase()];
              return (
                <div className="icon">
                  <Icon height="20" width="20" />
                </div>
              );
            })}
          </div>
        </ListGroup.Item>
      </div>
    </Link>
  );
};

export default SubwayStationItem;
