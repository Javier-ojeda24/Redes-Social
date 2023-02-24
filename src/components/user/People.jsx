import React, { useEffect, useState } from "react";
import avatar from "../../assets/img/user.png";
import { Global } from "../../helpers/Glogal";

export const People = () => {
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
    if (users.length >= data.total) {
      setMore(false);
    }
  };

  const nextPage = () => {
    let next = pages + 1;
    setPages(next);
    getUser(next);
    // console.log(following);
  };
  return (
    <>
      <header className="content__header">
        <h1 className="content__title">Gente</h1>
      </header>

      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <a href="#" className="post__image-link">
                    {user.image != "default.png" && (
                      <img
                        src={Global.url + "user/avatar/" + user.image}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}

                    {user.image == "default.png" && (
                      <img
                        src={avatar}
                        className="post__user-image"
                        alt="Foto de perfil"
                      />
                    )}
                  </a>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <a href="#" className="user-info__name">
                      {user.name} {user.surname}
                    </a>
                    <span className="user-info__divider"> | </span>
                    <a href="#" className="user-info__create-date">
                      {user.created_at}
                    </a>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>

              { !following.includes(user._id) && (
                <div className="post__buttons">
                  <a href="#" className="post__button post__button--green">
                    Seguir
                  </a>
                </div>
              )}

              {following.includes(user._id) && (
                <div className="post__buttons">
                  <a href="#" className="post__button">
                    Dejar de seguir
                  </a>
                </div>
              )}
            </article>
          );
        })}
      </div>
      {loading ? "Cargando..." : ""}

      {more && (
        <div className="content__container-btn">
          <button className="content__btn-more-post" onClick={nextPage}>
            Ver mas personas
          </button>
        </div>
      )}
    </>
  );
};
