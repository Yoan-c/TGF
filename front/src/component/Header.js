import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "./Button";
import Nav from "./Nav";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [user, setUser] = useState(null);
  const [searchQ, setSearchQ] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/me`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        if (res.data.status === "success") {
          setUser(res.data.user);
          //  window.location.reload(true);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  }, []);

  const btn = user ? (
    <>
      <Link to="/forum">
        <Button value="forum" bgColor="blue" height="30" width="60" />
      </Link>
      <Link to="/logout">
        <Button value="logout" bgColor="blue" height="30" width="60" />
      </Link>
    </>
  ) : (
    <>
      <Link to="/login">
        <Button value="login" bgColor="blue" height="30" width="60" />
      </Link>
      <Link to="/signup">
        <Button value="signup" bgColor="blue" height="30" width="60" />
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
        <h1 className="header__logo">LOGO</h1>
      </Link>
      <div className="header__search">
        <label htmlFor="search">
          <img
            src="img/search_icon.png"
            style={{ width: "20px" }}
            alt="rechercher"
          />
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
              value="Rechercher"
              bgColor="blue"
              height="28"
              width="60"
              fontSize="1"
            />
          </div>
        </div>
      </div>
      {btn}
    </header>
  );
};

export default Header;
