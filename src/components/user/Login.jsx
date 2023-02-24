import React, { useState } from "react";
import { useForms } from "../../hooks/useForms";
import { Global } from "../../helpers/Glogal";
import useAuth from "../../hooks/useAuth";

export const Login = () => {
  const { forms, changed } = useForms({});
  const [saved, setSaved] = useState("not-sended");
  const { setAuth } = useAuth();

  const loginUser = async (e) => {
    e.preventDefault();

    //Los datos del formulario
    let userToLogin = forms;

    //La peticion al back
    const request = await fetch(Global.url + "user/login", {
      method: "POST",
      body: JSON.stringify(userToLogin),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await request.json();

    if (data.status === "success") {
      //Persister los datos en el navegador
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setSaved("login");
      //Setear datos en el auth
      setAuth(data.user);
      //Redireccion
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } else {
      setSaved("error");
    }
  };

  return (
    <>
      <header className="content__header content__header-public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
        {saved === "login" ? (
          <strong className="alert alert-success">
            Usuario identificado correctamente !!{" "}
          </strong>
        ) : (
          ""
        )}

        {saved === "error" ? (
          <strong className="alert alert-danger">
            Usuario no se ha identificado !!
          </strong>
        ) : (
          ""
        )}

        <form className="for-login" onSubmit={loginUser}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" onChange={changed} />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input type="password" name="password" onChange={changed} />
          </div>

          <input
            type="submit"
            value="Identificate"
            className="btn btn-success"
          />
        </form>
      </div>
    </>
  );
};
