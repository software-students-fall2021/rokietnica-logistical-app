import React from "react";
import Card from "react-bootstrap/Card";
import "./LineCard.css";

// TODO: Find a better way to do this...
import { ReactComponent as Line_1 } from "./line_icons/1.svg";
import { ReactComponent as Line_2 } from "./line_icons/2.svg";
import { ReactComponent as Line_3 } from "./line_icons/3.svg";
import { ReactComponent as Line_4 } from "./line_icons/4.svg";
import { ReactComponent as Line_5 } from "./line_icons/5.svg";
import { ReactComponent as Line_6 } from "./line_icons/6.svg";
import { ReactComponent as Line_7 } from "./line_icons/7.svg";
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
  7: Line_7,
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
  t: Line_t,
  w: Line_w,
  z: Line_z,
};

const LineCard = (props) => {
  const Icon = mapping[props.line.toLowerCase()];
  return (
    <Card className="cardWrapper">
      <Card.Body>
        <div className="lineIconWrapper">
          <Icon height="25" width="25" />
        </div>
        <div className="directionWrapper">
          <Card.Subtitle className="mb-2 text-muted direction">
            Downtown
          </Card.Subtitle>
          <Card.Text className="arrival">2 min</Card.Text>
        </div>
        <div className="directionWrapper">
          <Card.Subtitle className="mb-2 text-muted direction">
            Uptown
          </Card.Subtitle>
          <Card.Text className="arrival">12 min</Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default LineCard;
