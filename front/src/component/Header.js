import React from "react";
import Button from "./Button";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <h1 className="header__logo">LOGO</h1>
      <div className="header__search">
        <img
          src="img/search_icon.png"
          style={{ width: "20px" }}
          alt="rechercher"
        />
      </div>
      <Button value="login" bgColor="blue" heigth="50" width="50" />
      <Button value="signup" bgColor="blue" heigth="50" width="50" />
    </header>
  );
};

export default Header;
