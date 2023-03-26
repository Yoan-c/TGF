import React from "react";
import Button from "./Button";
import Nav from "./Nav";

const Header = () => {
  return (
    <header className="header">
      <Nav />
      <a href="/">
        <h1 className="header__logo">LOGO</h1>
      </a>
      <div className="header__search">
        <img
          src="img/search_icon.png"
          style={{ width: "20px" }}
          alt="rechercher"
        />
      </div>
      <a href="/login">
        <Button value="login" bgColor="blue" heigth="50" width="50" />
      </a>
      <a href="/signup">
        <Button value="signup" bgColor="blue" heigth="50" width="50" />
      </a>
    </header>
  );
};

export default Header;
