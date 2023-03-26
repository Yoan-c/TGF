import React, { useState } from "react";
import Button from "../Button";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
      console.log("Envoi formulaire login avec axios");
    }
  };

  return (
    <main className="main">
      <form action="/" method="post" className="form">
        <div className="form__error">
          <p className="form__error__text">{error}</p>
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
          <Button
            value="Login"
            bgColor="blue"
            height="45"
            width="100"
            onClick={handleSubmit}
          />
        </div>
      </form>
    </main>
  );
};

export default Login;
