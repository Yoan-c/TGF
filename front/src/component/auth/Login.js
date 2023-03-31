import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Button from "../Button";
import Header from "../Header";
import Menu from "../Menu";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let valid = true;
    if (!email || !password) {
      setError("Vérifier les champs du formulaire");
      valid = false;
      return;
    }
    if (!(password.length > 0)) {
      setError("Les mots de passes sont différent");
      valid = false;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setError("Entrez une adresse mail valide");
      valid = false;
    }
    if (valid) {
      let url = `${process.env.REACT_APP_URL}/user/login`;
      axios
        .post(
          url,
          {
            email,
            password,
          },
          { withCredentials: true }
        )
        .then(function (res) {
          // handle success
          console.log(res);
          localStorage.setItem("TGFU", JSON.stringify(res.data.user));

          navigate(`/forum`);
        })
        .catch(function (error) {
          // handle error
          setError(error.response.data.message);
        });
    }
  };

  return (
    <>
      <Header />
      <div className="menuMain">
        <Menu />
      </div>
      <main className="mainLogin">
        <form action="/" method="post" className="form form--login">
          <div className="form__error">
            <p className="form__error__text">{error}</p>
          </div>
          <div className="form__group">
            <label htmlFor="email">{lang.main.form.email}</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">{lang.main.form.password}</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <Button
              value={lang.main.form.btnLogin}
              bgColor="blue"
              height="45"
              width="100"
              onClick={handleSubmit}
            />
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
