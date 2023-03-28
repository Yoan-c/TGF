import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./Header";

const AskQuestion = () => {
  const [title, setTitle] = useState(null);
  const [description, setDescription] = useState(null);

  const navigate = useNavigate();
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/me`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        if (res.data.status !== "success") {
          navigate("/login");
        }
      })
      .catch(function (error) {
        console.log(error);
        navigate("/");
      });
  }, [navigate]);
  const handleSubmit = () => {
    if (!title || !description) {
      toast.error("Entrez un titre et une description", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
      return;
    }
    let url = `${process.env.REACT_APP_URL}/questions/create`;
    axios
      .post(
        url,
        {
          title: title,
          description: description,
        },
        { withCredentials: true }
      )
      .then(function (res) {
        console.log(res);
        toast.success(
          "Question posé, vous aller etre rediriger sur le forum dans 5 secondes ",
          {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
            transition: Zoom,
          }
        );
        setTimeout(() => {
          navigate("/forum");
        }, 5000);
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log("envoi");
  };

  return (
    <>
      <Header />
      <div className="postQuestion">
        <ToastContainer />
        <div className="postQuestion__showText">Poser une question</div>
        <div className="postQuestion__contain">
          <div className="postQuestion__info">
            <p>Titre</p>
            <input type="text" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="postQuestion__description">
            <p>Question</p>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              placeholder="Décrivez votre probleme"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button
              className="button button--blue mt-big"
              onClick={() => handleSubmit()}
              style={{ height: "33px", width: "80px", float: "right" }}
            >
              Poster
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AskQuestion;
