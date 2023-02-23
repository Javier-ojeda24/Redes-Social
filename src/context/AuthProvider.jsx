import React, { createContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [compartido, setCompartido] = useState(
    "Compartida en todo los componentes"
  );

  return (
    <AuthContext.Provider
      value={{
        compartido,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
