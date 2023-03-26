import React from "react";

const Button = (props) => {
  let styleBtn = "button";
  styleBtn += props.bgColor === "orange" ? " button--orange" : " button--blue";
  const height = props.height ? props.height : 0;
  const width = props.width ? props.width : 0;
  let styleSize;
  if (height > 0 && width > 0)
    styleSize = { height: `${height}px`, width: `${width}px` };
  return (
    <button className={styleBtn} style={styleSize} onClick={props.onClick}>
      {props.value}
    </button>
  );
};

export default Button;
