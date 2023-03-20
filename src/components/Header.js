import React from "react";
import "../styles/header.css";
import image from '../assets/images/header.jpg';

const Header = () => {
  return (
    <>
        <div className="header">
          <img src={image} alt="header" className="img" />
        </div>

    </>
  );
};

export default Header;
