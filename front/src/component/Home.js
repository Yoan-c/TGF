import React from "react";
import CardNav from "./CardNav";

const Home = () => {
  return (
    <main className="homeMain">
      <div className="homeMain__choice">
        <CardNav
          value="Join the community"
          cardColor="orange"
          btnColor="orange"
          btnText="Login"
        />
        <CardNav
          value="Join the forum"
          cardColor="blue"
          btnColor="blue"
          btnText="Join forum"
        />
      </div>
      <div className="homeMain__intro">
        Tous les <span className="homeMain__intro--orange">developpeurs </span>
        ont un onglet de LOGO d’ouvert
      </div>
    </main>
  );
};

export default Home;
