import React from "react";
import './dot.css';
const Dot = props => {
  const style = {
    left: `${props.dot[0]}%`,
    top: `${props.dot[1]}%`
  };
  return <div className="dot" style={style} />;
};

export default Dot;
