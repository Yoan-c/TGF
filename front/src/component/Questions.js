import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "./Button";
import { format } from "../utils/format";
import Header from "./Header";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const Questions = (props) => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [comments, setComments] = useState([]);
  const [oneComment, setOneComment] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const lang = useSelector((state) => state.lang);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/questions/${id}`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        console.log(res);
        setQuestions(res.data.question);
        setComments(res.data.question.comments);
        setUser(res.data.user);
      })
      .catch(function (err) {
        console.log(error);
        setError(err);
      });
  }, [id, error]);

  const handleSubmit = () => {
    let url = `${process.env.REACT_APP_URL}/questions/${id}/comments`;
    axios
      .post(
        url,
        {
          comments: oneComment,
        },
        { withCredentials: true }
      )
      .then(function (res) {
        console.log(res.data.comment);
        setComments([...comments, res.data.comment]);
      })
      .catch(function (error) {
        console.log(error.message);
        setError(error.message);
      });
  };
  const postComment = user ? (
    <>
      <p>{lang.main.question.answerLabel}</p>
      <textarea
        name="answer"
        id="answer"
        cols="34"
        rows="8"
        style={{ resize: "none" }}
        placeholder={lang.main.question.asnwerPlaceholder}
        onChange={(e) => {
          setOneComment(e.target.value);
        }}
      ></textarea>
      <button
        className="button button--blue mt-big mb-big"
        onClick={() => handleSubmit()}
        style={{ height: "50px", width: "100px" }}
      >
        {lang.main.question.btnAsnwer}
      </button>
    </>
  ) : (
    <p style={{ textAlign: "center" }}>{lang.main.forum.connectMsg}</p>
  );

  const askQuestion = () => {
    navigate("/askQuestion");
  };
  return (
    <>
      <Header />
      <div className="menuMain">
        <Menu />
      </div>

      <div className="showOneQuestion">
        <div className="oneQuestion">
          <div className="oneQuestion__post">
            <p>{questions.question}</p>
            <p>
              {lang.main.forum.datePostFirst}{" "}
              {format(questions.creationQuestion, lang.category)}{" "}
              {lang.main.forum.datePostEnd}, {lang.main.forum.dateModify}{" "}
              {format(questions.updateQuestion, lang.category)}{" "}
              {lang.main.forum.datePostEnd}
            </p>
          </div>
          <div className="oneQuestion__ask">
            <Button
              onClick={askQuestion}
              value={lang.main.forum.btnAskQuestion}
              height="30"
              width="130"
            />
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
              {comments
                ? comments.map((data, index) => {
                    return (
                      <div
                        className="rightPartQuestion__response__group"
                        key={index}
                      >
                        <p>{data.comments}</p>
                        <p className="rightPartQuestion__response__info">
                          {data.user.username} {lang.main.forum.datePostFirst}{" "}
                          {format(data.creationComments, lang.category)}{" "}
                          {lang.main.forum.datePostEnd}
                        </p>
                      </div>
                    );
                  })
                : "Loading..."}
            </div>

            <div className="rightPartQuestion__answer">{postComment}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Questions;
