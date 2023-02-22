import React from "react";
import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import { PrivateLayout } from "../components/layout/general/PrivateLayout";
import { PublicLayout } from "../components/layout/public/PublicLayout";
import { Feed } from "../components/publication/Feed";
import { Login } from "../components/user/Login";
import { Register } from "../components/user/Register";

export const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Login />} />
          <Route path="login" element={<Login />} />
          <Route path="registro" element={<Register />} />
        </Route>
        <Route path="/social" element={<PrivateLayout />}>
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
        </Route>
        <Route
          path="*"
          element={
            <p>
              <h1>Error 404</h1>
              <Link to="/">Volver al inicio</Link>
            </p>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};
