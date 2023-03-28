import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import { formatLocal } from "../../utils/format";
import Button from "../Button";

const Account = () => {
  const [user, setUser] = useState(null);
  const [updateImg, setUpdateImg] = useState(null);

  const fileSelectedHandler = (event) => {
    setUpdateImg(event.target.files[0]);
  };

  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/me`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        if (res.data.status === "success") {
          setUser(res.data.user);
        }
      })
      .catch(function (error) {
        // console.log(error.message);
      });
  }, []);
  const update = () => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("photo", updateImg);
    let url = `${process.env.REACT_APP_URL}/user/${user._id}`;
    axios
      .patch(url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(updateImg);
  };
  return (
    <>
      {console.log(user)}
      <Header />
      <div className="user__info">
        {user && (
          <div>
            <div className="compte">
              <p className="compte__label">Compte</p>
              <p className="compte__data">{formatLocal(user.compteCreated)}</p>
            </div>
            <div className="email">
              <p className="email__label">Compte</p>
              <p className="email__data">{user.email}</p>
            </div>
            <div className="pseudo">
              <p className="pseudo__label">Pseudo</p>
              <p className="pseudo__data" name="username">
                {user.username}
              </p>
            </div>
            <div className="image">
              <p className="image__label">Image</p>
              <p className="image__data">
                <img className="userImg" src={`img/${user.photo}`} alt="" />
              </p>
            </div>
            <div className="imageUpdate">
              <p className="imageUpdate__label">Changer d'image</p>
              <p className="imageUpdate__data">
                <input type="file" onChange={fileSelectedHandler} />
              </p>
            </div>
            <div className="updateBtn">
              <Button
                onClick={() => update()}
                value="Modifier"
                height="30"
                width="130"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Account;
