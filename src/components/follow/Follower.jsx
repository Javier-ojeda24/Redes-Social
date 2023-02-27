import React, { useEffect, useState } from "react";
import { Global } from "../../helpers/Glogal";
import { UserList } from "../user/UserList";

export const Follower = () => {
  const [users, setUser] = useState([]);
  const [pages, setPages] = useState(1);
  const [more, setMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [following, setFollowind] = useState([]);

  useEffect(() => {
    getUser(1);
  }, []);

  const getUser = async (nextPage = 1) => {
    setLoading(true);
    //Peticion para sacar usuarios
    const request = await fetch(Global.url + "user/list/" + nextPage, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();

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
    // console.log(data);
    if (users.length >= data.total - data.users.length) {
      setMore(false);
    }
  };

  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
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
