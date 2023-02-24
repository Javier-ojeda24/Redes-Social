import React, { createContext, useEffect, useState } from "react";
import { Global } from "../helpers/Glogal";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [counters, setCounters] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    authUser();
  }, []);

  const authUser = async () => {
    //Sacar datos del usuario identificado del local storage
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    //Comprobar si tengo el token y el user
    if (!token || !user) {
      setLoading(false);
      return false;
    }

    //Transformar los datos a un objeto de js
    const userObj = JSON.parse(user);
    const userId = userObj.id;

    //Peticion ajax que compruebe el token
    const request = await fetch(Global.url + "user/profile/" + userId, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    });

    //Que me devuelva todos los datos del usuario
    const data = await request.json();

    //Peticion para los contadores
    const requestCounters = await fetch(
      Global.url + "user/counters/" + userId,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    );

    //Que me devuelva todos los datos del usuario
    const dataCounters = await requestCounters.json();

    //Setear el estado de auth
    setAuth(data.user);
    setCounters(dataCounters);
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        counters,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
