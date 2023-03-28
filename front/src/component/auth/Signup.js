import React, { useState } from "react";
import Button from "../Button";
import Header from "../Header";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    let valid = true;
    if (!username || !email || !password || !confPassword) {
      setError("Vérifier les champs du formulaire");
      valid = false;
      return;
    }
    if (
      !(password.length > 0) ||
      !(confPassword.length > 0) ||
      password !== confPassword
    ) {
      setError("Les mots de passes sont différent");
      valid = false;
    }
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      setError("Entrez une adresse mail valide");
      valid = false;
    }
    if (valid) {
      console.log("Envoi formulaire signup avec axios");
    }
    console.log(username);
  };
  return (
    <>
      <Header />
      <main className="main">
        <form action="/" method="post" className="form">
          <div className="form__error">
            <p className="form__error__text">{error}</p>
          </div>
          <div className="form__group">
            <label htmlFor="username">Pseudo :</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="email">Email :</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="password">Password :</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <label htmlFor="confPassword">Confirm password :</label>
            <input
              type="password"
              id="confPassword"
              value={confPassword}
              onChange={(e) => setConfPassword(e.target.value)}
            />
          </div>
          <div className="form__group">
            <Button
              value="Signup"
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

export default Signup;
