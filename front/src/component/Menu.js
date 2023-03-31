import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { findUrl } from "../utils/findUrl";
import { useSelector, useDispatch } from "react-redux";
import { changeLangFr } from "../redux/lang/actionLang";
import { changeLangEn } from "../redux/lang/actionLang";

const Menu = () => {
  const [user, setUser] = useState("");
  const lang = useSelector((state) => state.lang);
  const dispatch = useDispatch();

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
    <>
      {lang && (
        <div className="menu">
          <div>
            <img
              onClick={() => dispatch(changeLangFr())}
              className="menu__frFlag"
              src="/img/lang/FR.jpg"
              alt="drapeau francais"
            />
            <p className="menu__frParagraph">
              <span onClick={() => dispatch(changeLangFr())}>FR</span>{" "}
            </p>
            <img
              onClick={() => dispatch(changeLangEn())}
              className="menu__enFlag"
              src="/img/lang/EN.jpg"
              alt="drapeau anglais"
            />
            <p className="menu__enParagraph">
              <span onClick={() => dispatch(changeLangEn())}>EN</span>
            </p>
          </div>
          <div className="menu__public">
            <p>{lang.main.menu.public.categorie}</p>
            <ul>
              {findUrl(window.location.href) === "forum" ? (
                <li>
                  <Link to="/forum" className="menu__public--orange">
                    {lang.main.menu.public.questions}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/forum">{lang.main.menu.public.questions}</Link>
                </li>
              )}
              {findUrl(window.location.href) === "user" ? (
                <li>
                  <Link to="/user" className="menu__public--orange">
                    {lang.main.menu.public.users}
                  </Link>
                </li>
              ) : (
                <li>
                  <Link to="/user">{lang.main.menu.public.users}</Link>
                </li>
              )}
            </ul>
          </div>
          <div className="menu__private">
            {user && (
              <>
                <p> {lang.main.menu.private.categorie}</p>
                <ul>
                  {findUrl(window.location.href) === "account" ? (
                    <li>
                      <Link to="/account" className="menu__private--orange">
                        {lang.main.menu.private.account}
                      </Link>
                    </li>
                  ) : (
                    <li>
                      <Link to="/account">
                        {lang.main.menu.private.account}
                      </Link>
                    </li>
                  )}
                </ul>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Menu;
