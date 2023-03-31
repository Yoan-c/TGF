import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import searchImg from "../search_icon.png";

const Header = () => {
  const [user, setUser] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const lang = useSelector((state) => state.lang);
  const navigate = useNavigate();
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

  const btn = user ? (
    <>
      <Link to="/forum">
        <Button
          onClick={() => localStorage.removeItem("search")}
          value={lang.header.btnForum}
          bgColor="blue"
          height="30"
          width="60"
        />
      </Link>
      <Link to="/logout">
        <Button
          value={lang.header.btnLogout}
          bgColor="blue"
          height="30"
          width="60"
        />
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <Button
          value={lang.header.btnLogin}
          bgColor="blue"
          height="30"
          width="60"
        />
      </Link>
      <Link to="/signup">
        <Button
          value={lang.header.btnSignup}
          bgColor="blue"
          height="30"
          width="60"
        />
      </Link>
    </>
  );

  const handleSubmit = () => {
    localStorage.setItem("search", searchQ);
    navigate("/forum");
  };

  return (
    <header className="header">
      <Nav />
      <Link to="/">
        <h1 className="header__logo">{lang.header.logo}</h1>
      </Link>
      <div className="header__search">
        <label htmlFor="search">
          <img src={searchImg} style={{ width: "20px" }} alt="rechercher" />
        </label>
        <input
          type="checkbox"
          className="checkbox__search"
          id="search"
          name="search"
        />
        <div className="search__group">
          <div className="search__group__detail">
            <input type="text" onChange={(e) => setSearchQ(e.target.value)} />
            <Button
              onClick={() => handleSubmit()}
              value={lang.header.search}
              bgColor="blue"
              height="28"
              width="96"
            />
          </div>
        </div>
      </div>
      {btn}
    </header>
  );
};

export default Header;
