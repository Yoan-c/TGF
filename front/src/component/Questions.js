import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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
  console.log(id);
  return <div>Questions</div>;
};

export default Questions;
