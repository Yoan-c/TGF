import React, { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/logout`;
    axios
      .get(url, { withCredentials: true })
      .then(function () {
        navigate("/forum");
      })
      .catch(function (error) {
        console.log(error);
        navigate("/");
      });
  });
  return <></>;
};

export default Logout;
