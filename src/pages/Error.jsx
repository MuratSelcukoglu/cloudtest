import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">404</h1>
        <p className="fs-3">
          {" "}
          <span className="text-danger">Heyy! </span> Sayfa Bulunamadı.
        </p>
        <p className="lead">Aradığınız Sayfa Mevcut Değil.</p>
        <Link to="/home" className="btn btn-primary">
          Ana Sayfa
        </Link>
      </div>
    </div>
  );
};

export default Error;
