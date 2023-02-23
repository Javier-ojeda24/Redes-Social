import React from "react";
import { useForms } from "../../hooks/useForms";

export const Login = () => {
  const { forms, changed } = useForms({});

  const loginUser = async (e) => {
    e.preventDefault();

    //Los datos del formulario
    let userToLogin = forms;

    //La peticion al back 


    //Persister los datos en el navegador
    
  };

  return (
    <>
      <header className="content__header content__header-public">
        <h1 className="content__title">Login</h1>
      </header>
      <div className="content__posts">
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
