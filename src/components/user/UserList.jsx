import React from "react";
import { Global } from "../../helpers/Glogal";
import avatar from "../../assets/img/user.png";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

export const UserList = ({
  users,
  getUser,
  following,
  setFollowind,
  more,
  loading,
  pages,
  setPages,
}) => {
  const { auth } = useAuth();
  
  const follow = async (userId) => {
    //peticion al back para guardar follow
    const request = await fetch(Global.url + "follow/save", {
      method: "POST",
      body: JSON.stringify({ followed: userId }),
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    //Cuando esta todo correcto
    if (data.status === "success") {
      //Actualizar el estado de following, agregando el nuevo follow
      setFollowind([...following, userId]);
    }
  };

  const unfollow = async (userId) => {
    //peticion al back para borrar follow
    const request = await fetch(Global.url + "follow/unfollow/" + userId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    });
    const data = await request.json();
    //Cuando esta todo correcto
    if (data.status == "success") {
      //Actualizar el estado de following, filtrando  los datos para eliminar antiguo userId que acabo de dejar de seguir
      let filterFollo = following.filter(
        (followingUserId) => userId !== followingUserId
      );
      setFollowind(filterFollo);
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
      <div className="content__posts">
        {users.map((user) => {
          return (
            <article className="posts__post" key={user._id}>
              <div className="post__container">
                <div className="post__image-user">
                  <Link
                    to={"/social/perfil/" + user._id}
                    className="post__image-link"
                  >
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
                  </Link>
                </div>

                <div className="post__body">
                  <div className="post__user-info">
                    <Link
                      to={"/social/perfil/" + user._id}
                      className="user-info__name"
                    >
                      {user.name} {user.surname}
                    </Link>
                    <span className="user-info__divider"> | </span>
                    <Link
                      to={"/social/perfil/" + user._id}
                      className="user-info__create-date"
                    >
                      {user.created_at}
                    </Link>
                  </div>

                  <h4 className="post__content">{user.bio}</h4>
                </div>
              </div>
              {user._id != auth._id && (
                <div className="post__buttons">
                  {!following.includes(user._id) && (
                    <button
                      className="post__button post__button--green"
                      onClick={() => follow(user._id)}
                    >
                      Seguir
                    </button>
                  )}
                </div>
              )}
              {following.includes(user._id) && (
                <div className="post__buttons">
                  <button
                    className="post__button"
                    onClick={() => unfollow(user._id)}
                  >
                    Dejar de seguir
                  </button>
                </div>
              )}
            </article>
          );
        })}
      </div>
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
