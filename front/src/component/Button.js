import React from "react";

const Button = (props) => {
  let styleBtn = "button";
  switch (props.bgColor) {
    case "orange":
      styleBtn += " button--orange";
      break;
    case "blueLight":
      styleBtn += " button--blueLight";
      break;
    default:
      styleBtn += " button--blue";
  }
  const height = props.height ? props.height : 0;
  const width = props.width ? props.width : 0;
  let styleSize;
  if (height > 0 && width > 0)
    styleSize = {
      minHeight: `${height}px`,
      minWidth: `${width}px`,
    };

  return (
    <button className={styleBtn} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
