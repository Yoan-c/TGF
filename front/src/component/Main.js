import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { format } from "../utils/format";
import Button from "./Button";
import Header from "./Header";
import Menu from "./Menu";
import { useSelector } from "react-redux";

const Main = () => {
  const [questions, setQuestions] = useState([]);
  const [sizeQuestions, setSizeQuestions] = useState(0);
  const [sort, setSort] = useState(true);
  const [orderBy, setOrderBy] = useState("creationQuestion");
  const [asc, setAsc] = useState(false);
  const lang = useSelector((state) => state.lang);
  const navigate = useNavigate();

  const formatUrl = (value) => {
    switch (value) {
      case "noAnswer":
        setSort(false);
        break;
      case "answer":
        setSort(true);
        break;
      case "older":
        setOrderBy("creationQuestion");
        setAsc(true);
        break;
      case "newer":
        setOrderBy("creationQuestion");
        setAsc(false);
        break;
      case "nbAnswer":
        setOrderBy("answer");
        setAsc(false);
        break;

      default:
        setSort(true);
        setOrderBy("answer");
        setAsc(false);
        break;
    }
  };
  let search = localStorage.getItem("search");
  useEffect(() => {
    let params = "answer=";
    if (sort) params += "true";
    else params += "false";
    params += "&orderby=";
    if (orderBy === "answer") params += "answer";
    else params += "creationQuestion";
    params += "&asc=";
    if (asc) params += "true";
    else params += "false";
    if (search) params += `&search=${search}`;

    let url = `${process.env.REACT_APP_URL}/questions?${params}`;
    axios
      .get(url)
      .then(function (res) {
        setQuestions(res.data.questions);
        setSizeQuestions(res.data.size);
      })
      .catch(function (error) {});
  }, [sort, orderBy, asc, search]);

  const handleQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  return (
    <>
      <Header />
      <div className="menuMain">
        <Menu />
      </div>
      <main className="main">
        <div className="allInfo">
          <div className="allInfoQuestion">
            <p className="allInfoQuestion__text">{lang.main.forum.questions}</p>
            <p className="allInfoQuestion__nb">
              {sizeQuestions}{" "}
              {sizeQuestions > 1
                ? `${lang.main.forum.nbQuestions}s`
                : lang.main.forum.nbQuestions}
            </p>
          </div>
          <div className="allInfo__filterBtn">
            <div>
              <label
                htmlFor="showFilter"
                className="button button--blueLight"
                style={{
                  minWidth: "90px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {lang.main.forum.btnFilter}
              </label>
            </div>
            <div>
              <Button
                onClick={() => navigate("/askQuestion")}
                value={lang.main.forum.btnAskQuestion}
                height="50"
                width="150"
              />
            </div>
          </div>
          <input
            type="checkbox"
            className="checkbox"
            id="showFilter"
            name="showFilter"
          />
          <div className="filterInfo">
            <div className="filterInfo__filter">
              <p>{lang.main.forum.filterBy}</p>
              <ul className="filterInfo__list">
                <li>
                  <input
                    type="radio"
                    id="response"
                    name="answer"
                    value="answer"
                    defaultChecked
                    onChange={(e) => formatUrl(e.target.value)}
                  />
                  <label htmlFor="response">
                    {lang.main.forum.filterByAnswer}
                  </label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="noResponse"
                    name="answer"
                    value="noAnswer"
                    onChange={(e) => formatUrl(e.target.value)}
                  />
                  <label htmlFor="noResponse">
                    {lang.main.forum.filterByNoAnswer}
                  </label>
                </li>
              </ul>
            </div>
            <div className="filterInfo__order">
              <p>{lang.main.forum.orderBy}</p>
              <ul>
                <li>
                  {" "}
                  <input
                    type="radio"
                    id="recent"
                    name="order"
                    value="newer"
                    defaultChecked
                    onChange={(e) => formatUrl(e.target.value)}
                  />
                  <label htmlFor="recent">{lang.main.forum.orderByNewer}</label>
                </li>
                <li>
                  <input
                    type="radio"
                    id="older"
                    name="order"
                    value="older"
                    onChange={(e) => formatUrl(e.target.value)}
                  />
                  <label htmlFor="older">{lang.main.forum.orderByOlder}</label>
                </li>
                <li>
                  {" "}
                  <input
                    type="radio"
                    id="nbAnswer"
                    name="order"
                    value="nbAnswer"
                    onChange={(e) => formatUrl(e.target.value)}
                  />
                  <label htmlFor="nbAnswer">
                    {lang.main.forum.orderByNbAnswer}
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="allQuestions">
          {questions
            ? questions.map((data, index) => {
                return (
                  <div
                    key={index}
                    className="questionGroup"
                    onClick={() => handleQuestion(data._id)}
                  >
                    <div className="questionGroup__info">
                      <p>0 votes</p>
                      <p>
                        {data.comments.length}
                        {data.comments.length > 1
                          ? ` ${lang.main.forum.nbAnswer}s`
                          : ` ${lang.main.forum.nbAnswer}`}
                      </p>
                    </div>
                    <div className="questionGroup__question">
                      <p> {data.question} </p>
                    </div>
                    <div className="questionGroup__user">
                      <p> {data.user.username} </p>
                      <p>
                        {`${lang.main.forum.datePostFirst} `}
                        {format(data.creationQuestion, lang.category)}{" "}
                        {` ${lang.main.forum.datePostEnd}`}
                      </p>
                    </div>
                    <div className="questionGroup__updateQuestion">
                      <p> {lang.main.forum.dateUpdate}</p>
                      <p>
                        {" "}
                        &nbsp; {format(data.updateQuestion, lang.category)}{" "}
                      </p>
                    </div>
                  </div>
                );
              })
            : "Loading..."}
        </div>
      </main>
    </>
  );
};

export default Main;
