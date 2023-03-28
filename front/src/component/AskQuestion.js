import React from "react";

const AskQuestion = () => {
  const handleSubmit = () => {
    console.log("envoi");
  };

  return (
    <div className="postQuestion">
      <div className="postQuestion__showText">Poser une question</div>
      <div className="postQuestion__contain">
        <div className="postQuestion__info">
          <p>Titre</p>
          <input type="text" name="" id="" />
        </div>
        <div className="postQuestion__description">
          <p>Question</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Décrivez votre probleme"
          ></textarea>
          <button
            className="button button--blue mt-big mb-big"
            onClick={() => handleSubmit()}
            style={{ height: "33px", width: "80", float: "right" }}
          >
            Poster
          </button>
        </div>
      </div>
    </div>
  );
};

export default AskQuestion;
