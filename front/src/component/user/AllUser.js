import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../Header";
import { formatLocal } from "../../utils/format";

const AllUser = () => {
  const [users, setUsers] = useState(null);
  useEffect(() => {
    let url = `${process.env.REACT_APP_URL}/user/all`;
    axios
      .get(url, { withCredentials: true })
      .then(function (res) {
        console.log(res);
        setUsers(res.data.users);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);
  return (
    <>
      <Header />
      <div className="allUserGroupe">
        <div className="allUser">
          {users ? (
            users.map((user, index) => {
              return (
                <div key={index} className="cardUser">
                  <div className="cardUser__img">
                    <img src={`img/${user.photo}`} alt="profil" />
                  </div>
                  <div className="cardUser__profil">
                    <p>{user.username}</p>
                    <p>
                      membre depuis le : <br />{" "}
                      {formatLocal(user.compteCreated)}
                    </p>
                  </div>
                </div>
              );
            })
          ) : (
            <div>
              <p>Loadin ...</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AllUser;
