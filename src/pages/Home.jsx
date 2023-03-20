import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/home.css";
import NavComp from "../components/Navbar";
import cardImage from "../assets/images/card.jpg";
import { getUsers } from "../redux/usersSlice";
import Lottie from "react-lottie";
import loading from "../assets/lottie/loading1.json";
import DeleteModal from "../components/DeleteModal";
import UdapetModal from "../components/UdapetModal";
import CreateuserModal from "../components/CreateuserModal";
import { Link } from "react-router-dom";
import { history } from "../components/History";
import { userLogout } from "../redux/loginSlice";
import Paginate from "../components/Paginate";

const Home = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [list, setList] = useState(null);
  const [deleteOpen, setDeleteopen] = useState(false);
  const [updateOpen, setUpdateopen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [choseUser, setChoseuser] = useState();
  const [createOpen, setCreateopen] = useState(false);
  const { userList, isLoading } = useSelector((state) => state.userList);
  const [currentPage, setCurrentPage] = useState(1);


  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(getUsers(user));
    if (refresh) {
      setRefresh(false);
    }
    if (!user) {
      history.navigate("/login");
    }
  }, [dispatch, user, refresh]);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleSearch = (event) => {
    const filteredList = userList.filter((x) => {
      const searcedText = event.target.value.toUpperCase();
      const username = x.name.toUpperCase();
      // return productTitle.indexOf(searcedText) > -1;
      return username.includes(searcedText);
    });
    if (event.target.value !== "") {
      setList(filteredList);
    } else {
      setList(null);
    }
  };

  const logoutSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogout());
    setRefresh(true);
  };

  //pagination
  const postPerPage = 6;
  const totalPosts = userList.length;

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const filterPosts = userList.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <>
      <NavComp
        search={handleSearch}
        setCreateopen={setCreateopen}
        logoutSubmit={logoutSubmit}
      />
      <div className="container py-5">
        <div className="row">
          {!isLoading ? (
            list === null ? (
              <>
                {filterPosts.map((item, index) => (
                  <div className="col-md-4 " key={index}>
                    <div className="card profile-card ">
                      <div className="background-block">
                        <img
                          src={cardImage}
                          alt="card_image"
                          className="background"
                        />
                      </div>

                      <div className="card-content">
                        <h2>
                          {item.name}
                          <small>{item.email}</small>
                        </h2>
                        <div className="icon-block">
                          {item.gender === "male" ? (
                            <i className="fa fa-male"></i>
                          ) : (
                            <i className="fa fa-female"></i>
                          )}

                          {item.status === "inactive" ? (
                            <i className="fa fa-arrow-circle-down"></i>
                          ) : (
                            <i className="fa fa-arrow-circle-up"></i>
                          )}
                        </div>
                        <div className="icon-block">
                          <Link
                            type="button"
                            className="btn btn-outline-info m-2"
                            to={`/UserDetail/${item.id}/${item.name}`}
                          >
                            Details
                          </Link>
                          <button
                            type="button"
                            className="btn btn-outline-success m-2"
                            onClick={() =>
                              setUpdateopen(true) || setChoseuser(item)
                            }
                          >
                            Update
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline-danger m-2"
                            onClick={() =>
                              setDeleteopen(true) || setChoseuser(item)
                            }
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {totalPosts > postPerPage && (
                  <div className="mt-5 d-flex justify-content-center">
                    <Paginate
                      currentPage={currentPage}
                      setCurrentPage={setCurrentPage}
                      totalPosts={totalPosts}
                      postPerPage={postPerPage}
                    />
                  </div>
                )}
              </>
            ) : (
              list.map((item, index) => (
                <div className="col-md-4 " key={index}>
                  <div className="card profile-card ">
                    <div className="background-block">
                      <img
                        src={cardImage}
                        alt="card_image"
                        className="background"
                      />
                    </div>

                    <div className="card-content">
                      <h2>
                        {item.name}
                        <small>{item.email}</small>
                      </h2>
                      <div className="icon-block">
                        {item.gender === "male" ? (
                          <i className="fa fa-male"></i>
                        ) : (
                          <i className="fa fa-female"></i>
                        )}

                        {item.status === "inactive" ? (
                          <i className="fa fa-arrow-circle-down"></i>
                        ) : (
                          <i className="fa fa-arrow-circle-up"></i>
                        )}
                      </div>
                      <div className="icon-block">
                        <Link
                          type="button"
                          className="btn btn-outline-info m-2"
                          to={`/UserDetail/${item.id}/${item.name}`}
                        >
                          Details
                        </Link>
                        <button
                          type="button"
                          className="btn btn-outline-success m-2"
                          onClick={() =>
                            setUpdateopen(true) || setChoseuser(item)
                          }
                        >
                          Update
                        </button>
                        <button
                          type="button"
                          className="btn btn-outline-danger m-2"
                          onClick={() =>
                            setDeleteopen(true) || setChoseuser(item)
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )
          ) : (
            <div className="container w-100 h-100 d-inline-block">
              <Lottie options={defaultOptions} height={80} width={80} />
            </div>
          )}
        </div>
        {deleteOpen && (
          <DeleteModal
            deleteOpen={deleteOpen}
            setDeleteopen={setDeleteopen}
            chooseUser={choseUser}
            setRefresh={setRefresh}
            token={user}
          />
        )}
        {updateOpen && (
          <UdapetModal
            updateOpen={updateOpen}
            setUpdateopen={setUpdateopen}
            chooseUser={choseUser}
            token={user}
            setRefresh={setRefresh}
          />
        )}
        {createOpen && (
          <CreateuserModal
            createOpen={createOpen}
            setCreateopen={setCreateopen}
            setRefresh={setRefresh}
            token={user}
          />
        )}
      </div>
    </>
  );
};

export default Home;
