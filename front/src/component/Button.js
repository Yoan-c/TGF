import React from "react";

const Button = (props) => {
  let styleBtn = "button";
  styleBtn += props.bgColor === "orange" ? " button--orange" : " button--blue";
  console.log(props);
  return <button className={styleBtn}>{props.value}</button>;
};

export default Button;
