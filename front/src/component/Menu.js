import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { findUrl } from "../utils/findUrl";

const Menu = () => {
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
    <div className="menu">
      <div className="menu__public">
        <p>Public</p>
        <ul>
          {findUrl(window.location.href) === "forum" ? (
            <li>
              <Link to="/forum" style={{ color: "#ff9839" }}>
                Question
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/forum">Question</Link>
            </li>
          )}
          {findUrl(window.location.href) === "user" ? (
            <li>
              <Link to="/user" style={{ color: "#ff9839" }}>
                Utilisateur
              </Link>
            </li>
          ) : (
            <li>
              <Link to="/user">Utilisateur</Link>
            </li>
          )}
        </ul>
      </div>
      <div className="menu__private">
        {user && (
          <>
            <p> Privée</p>
            <ul>
              {findUrl(window.location.href) === "account" ? (
                <li>
                  <Link to="/account" style={{ color: "#ff9839" }}>
                    Compte
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/account">Compte</Link>
                </li>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default Menu;
