import React, { useEffect, useState } from "react";
import axios from "axios";
import Menu from "./Menu";

const Nav = () => {
  const [user, setUser] = useState("");
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/me`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        if (res.data.status === "success") {
          setUser(res.data.user);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  }, []);
  return (
    <nav className="nav">
      <label className="nav__menu" htmlFor="showMenu"></label>
      <input
        type="checkbox"
        className="checkbox__menu"
        id="showMenu"
        name="showMenu"
      />
      <Menu />
    </nav>
  );
};

export default Nav;
