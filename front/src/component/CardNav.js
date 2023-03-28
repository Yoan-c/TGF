import React from "react";
import Button from "./Button";

const CardNav = (props) => {
  let cardStyle = "homeMain__card";
  cardStyle +=
    props.cardColor === "orange"
      ? " homeMain__card--orange"
      : " homeMain__card--blue";
  return (
    <div className={cardStyle}>
      {props.value}

      <div className="homeMain__card__button">
        <Button
          value={props.btnText}
          bgColor={props.btnColor}
          heigth="50"
          width="50"
          onClick={props.onClick}
        />
      </div>
    </div>
  );
};

export default CardNav;
