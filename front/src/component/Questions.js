import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "./Button";
import { format } from "../utils/format";

const Questions = (props) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/questions/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        console.log(res);
        setQuestions(res.data.question);
      })
      .catch(function (error) {
        console.log(error.message);
        setError(error.message);
      });
  }, [id]);
  return (
    <div className="showOneQuestion">
      <div className="oneQuestion">
        <div className="oneQuestion__post">
          <p>{questions.question}</p>
          <p>
            posté il y a {format(questions.creationQuestion)}, modifier il y a{" "}
            {format(questions.updateQuestion)}
          </p>
        </div>
        <div className="oneQuestion__ask">
          <Button value="Poser une question" height="30" width="130" />
        </div>
      </div>
      <div className="mainQuestion">
        <div className="leftPartQuestion">
          <div className="leftPartQuestion__vote">
            <p className="arrowUp"></p>
            <p>255</p>
            <p className="arrowDown"></p>
          </div>
        </div>
        <div className="rightPartQuestion">
          <div className="rightPartQuestion__description">
            {questions.description}
          </div>
          <div className="rightPartQuestion__response">
            {questions && questions.comments
              ? questions.comments.map((comment, index) => {
                  return (
                    <Fragment key={index}>
                      <p>test</p>
                      <p>
                        {comment.user.username} posté il y a{" "}
                        {format(comment.creationComments)}{" "}
                      </p>
                    </Fragment>
                  );
                })
              : "Loading..."}
          </div>

          <div className="rightPartQuestion__answer">
            <p>Votre réponse : </p>
            <textarea
              name="answer"
              id="answer"
              cols="34"
              rows="8"
              style={{ resize: "none" }}
              placeholder="Entrez votre réponse"
            ></textarea>
            <button
              className="button button--blue mt-big mb-big"
              type="submit"
              style={{ height: "50px", width: "100px" }}
            >
              Répondre
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Questions;
