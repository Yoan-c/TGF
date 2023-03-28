import React from "react";
import { useNavigate } from "react-router-dom";
import CardNav from "./CardNav";
import Header from "./Header";

const Home = () => {
  const navigate = useNavigate();
  return (
    <>
      <Header />
      <main className="homeMain">
        <div className="homeMain__choice">
          <CardNav
            value="Join the community"
            cardColor="orange"
            btnColor="orange"
            btnText="Login"
            onClick={() => navigate("/login")}
          />
          <CardNav
            value="Join the forum"
            cardColor="blue"
            btnColor="blue"
            btnText="Join forum"
            onClick={() => navigate("/forum")}
          />
        </div>
        <div className="homeMain__intro">
          Tous les{" "}
          <span className="homeMain__intro--orange">developpeurs </span>
          ont un onglet de LOGO d’ouvert
        </div>
      </main>
    </>
  );
};

export default Home;
