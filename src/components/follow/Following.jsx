import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Global } from "../../helpers/Glogal";
import { UserList } from "../user/UserList";
import { getProfile } from "../../helpers/getProfile";

export const Following = () => {
  const [users, setUser] = useState([]);
  const [pages, setPages] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [following, setFollowind] = useState([]);
  const [profile, setProfile] = useState({});
  const params = useParams();

  useEffect(() => {
    getUser(1);
    getProfile(params.userId, setProfile);
  }, []);
  const token = localStorage.getItem("token");
  const getUser = async (nextPage = 1) => {
    setLoading(true);

    //Sacar user id de la url
    const userId = params.userId;

    //Peticion para sacar usuarios
    const request = await fetch(
      Global.url + "follow/following/" + userId + "/" + nextPage,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );
    const data = await request.json();

    //Recorrer y limpiar follow para quedarme con followed
    let cleanUsers = [];
    data.follows.forEach((follow) => {
      cleanUsers = [...cleanUsers, follow.followed];
    });
    data.users = cleanUsers;

    //Crear un estado para poder listarlos
    if (data.users && data.status == "success") {
      let newUser = data.users;
      if (users.length >= 1) {
        newUser = [...users, ...data.users];
      }
      setUser(newUser);
      setFollowind(data.user_following);
      setLoading(false);
    }

    //Paginacion

    if (users.length >= data.total - data.users.length) {
      setMore(false);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Usuarios que sigues {profile.name}</h1>
      </header>

      <UserList
        users={users}
        getUser={getUser}
        following={following}
        setFollowind={setFollowind}
        more={more}
        loading={loading}
        pages={pages}
        setPages={setPages}
      />
      {loading ? "Cargando..." : ""}
    </>
  );
};
