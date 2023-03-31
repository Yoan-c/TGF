import React from "react";
import { useNavigate } from "react-router-dom";
import CardNav from "./CardNav";
import Header from "./Header";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();
  const lang = useSelector((state) => state.lang);
  return (
    <>
      <Header />
      <main className="homeMain">
        <div className="homeMain__choice">
          <CardNav
            value={lang.main.home.joinCommunity}
            cardColor="orange"
            btnColor="orange"
            btnText="Login"
            onClick={() => navigate("/login")}
          />
          <CardNav
            value={lang.main.home.joinForum}
            cardColor="blue"
            btnColor="blue"
            btnText="Join forum"
            onClick={() => navigate("/forum")}
          />
        </div>

        <div className="homeMain__intro">
          {lang.main.home.sentenceStart}
          <span className="homeMain__wordGroup homeMain__intro--orange">
            <div className="animeSpan">
              {lang.main.home.sentenceOption.map((word, index) => {
                return (
                  <p key={index} className={`nextWord nextWord--${index}`}>
                    {word}
                  </p>
                );
              })}
            </div>
          </span>
          {lang.main.home.sentenceEnd}
        </div>
      </main>
    </>
  );
};

export default Home;
