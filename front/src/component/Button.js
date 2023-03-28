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
  const font = props.fontSize ? props.fontSize : 1.2;
  let styleSize;
  if (height > 0 && width > 0)
    styleSize = {
      minHeight: `${height}px`,
      minWidth: `${width}px`,
      fontSize: `${font}rem`,
    };
  else
    styleSize = {
      fontSize: `${font}rem`,
    };

  return (
    <button className={styleBtn} style={styleSize} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
