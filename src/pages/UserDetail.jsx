import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/userdetail.css";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { getTodos } from "../redux/todosSlice";
import Lottie from "react-lottie";
import loading from "../assets/lottie/loading2.json";
import task from "../assets/lottie/task.json";
import AddTodosModal from "../components/AddTodosModal";
import { Link } from "react-router-dom";

const UserDetail = () => {
  const { id, name } = useParams();
  const dispatch = useDispatch();
  const [todoOpen, setTodoopen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { todos, isLoading } = useSelector((state) => state.todos);

  useEffect(() => {
    window.scrollTo(0, 0);
    const data = { id: id, token: user };
    dispatch(getTodos(data));
    if (refresh) {
      setRefresh(false);
    }
  }, [dispatch, user, id, refresh]);

  // lottie anismanyon paketi ayarları
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const secondOptions = {
    loop: true,
    autoplay: true,
    animationData: task,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <>
      <section className="common_section">
        <Container>
          <h2 className="text-white">User Detail</h2>
          <Link type="button" className="link-info m-1" to="/">
            <i className="fa fa-arrow-circle-right" aria-hidden="true"></i> Home
          </Link>
        </Container>
      </section>
      <div className="container py-5">
        {!isLoading ? (
          todos[0] === undefined ? (
            <div className="container w-100 h-100 d-inline-block">
              <Lottie options={secondOptions} height={200} width={250} />
              <div className="text-center">
                <p>No Task to Display</p>
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setTodoopen(true)}
                >
                  {" "}
                  <i className="fa fa-plus-circle m-1" aria-hidden="true"></i>
                  Create New Task List
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="text-center mb-3">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={() => setTodoopen(true)}
                >
                  {" "}
                  <i className="fa fa-plus-circle m-1" aria-hidden="true"></i>
                  Create New Task
                </button>
              </div>
              <table className="table table-dark ">
                <thead>
                  <tr>
                    <th scope="col">No</th>
                    <th scope="col">Title</th>
                    <th scope="col">Date</th>
                    <th scope="col">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {todos.map((item, index) => (
                    <tr key={index}>
                      <th scope="row">{index + 1}</th>
                      <td>{item.title}</td>
                      <TarihSaatGoster tarihSaat={item.due_on} />
                      <td>{item.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        ) : (
          <div className="container w-100 h-100 d-inline-block">
            <Lottie options={defaultOptions} height={250} width={250} />
          </div>
        )}
      </div>
      {todoOpen && (
        <AddTodosModal
          todoOpen={todoOpen}
          setTodoopen={setTodoopen}
          setRefresh={setRefresh}
          token={user}
          name={name}
          id={id}
        />
      )}
    </>
  );
};

function TarihSaatGoster({ tarihSaat }) {
  const tarih = new Date(tarihSaat);
  const tarihStr = tarih.toISOString().substr(0, 10);
  const saatStr = tarih.toLocaleTimeString().substr(0, 5);

  return <td>{`${tarihStr} ${saatStr}`}</td>;
}

export default UserDetail;
