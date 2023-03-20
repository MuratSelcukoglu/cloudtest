import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import "../styles/navbar.css";

const NavComp = ({ search, setCreateopen, logoutSubmit }) => {
  return (
    <Navbar
      className="navbar"
      expand="lg"
      style={{
        position: "sticky",
        height: "fit-content",
        top: 0,
        zIndex: 3,
        background: "#0D0D0F",
      }}
    >
      <Container>
        <Navbar.Brand style={{ color: "white", fontWeight: "bold" }} href="#">
          MS
        </Navbar.Brand>

        <Navbar.Toggle
          style={{ background: "white" }}
          aria-controls="navbarScroll"
        />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 d-flex gap-3 justify-content-between w-100"
            style={{ maxHeight: "120px" }}
            navbarScroll
          >
            <button
              type="button"
              className="btn text-white"
              onClick={() => setCreateopen(true)}
            >
              <i className="fa fa-plus-circle m-1" aria-hidden="true"></i>
              Create New User
            </button>
            <div className="d-flex align-items-center justify-content-center m-1">
              <div className="searchBox ml-auto ">
                <input
                  className="searchInput"
                  type="text"
                  name="search"
                  placeholder="Search"
                  onChange={search}
                />
                <button className="searchButton" href="#">
                  <i className="fa fa-search" aria-hidden="true"></i>
                </button>
              </div>
              <button
                onClick={logoutSubmit}
                type="button"
                className="btn btn-outline-info m-1"
              >
                <i className="fa fa-sign-out" aria-hidden="true"></i>
              </button>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavComp;
