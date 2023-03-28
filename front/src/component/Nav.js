import React from "react";

const Nav = () => {
  return (
    <nav className="nav">
      <label className="nav__menu" htmlFor="showMenu"></label>
      <input
        type="checkbox"
        className="checkbox__menu"
        id="showMenu"
        name="showMenu"
      />
      <div className="menu">
        <div className="menu__public">
          <p>Public</p>
          <ul>
            <li>Question</li>
            <li>Utilisateur</li>
          </ul>
        </div>
        <div className="menu__private">
          <p> Privée</p>
          <ul>
            <li>Question</li>
            <li>Utilisateur</li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
