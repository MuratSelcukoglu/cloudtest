import React from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Login from "../pages/Login";
import Protected from "../components/Protected";
import Home from "../pages/Home";
import UserDetail from '../pages/UserDetail';
import Error from "../pages/Error";
import { history } from "../components/History";

const Routers = () => {
  history.navigate = useNavigate();
  history.location = useLocation();

  return (
    <Routes>
      <Route path="/login" exact element={<Login />} />
      <Route
        path="/"
        element={
          <Protected>
            <Home />
          </Protected>
        }
      />
       <Route
        path="/UserDetail/:id/:name"
        element={
          <Protected>
            <UserDetail />
          </Protected>
        }
      />
      <Route exact path="*" element={<Error />} />
    </Routes>
  );
};

export default Routers;
