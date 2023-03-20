import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { getAddtask } from "../redux/addtaskSlice";

const AddTodosModal = ({ token, setRefresh, setTodoopen, todoOpen, name,id }) => {
  const dispatch = useDispatch();
  const [taskInfo, setTaskinfo] = useState({
    token: token,
    user: name,
    id:id,
    title: "",
    status: "",
    date: "",
  });

  const todosSubmit = (e) => {
    e.preventDefault();
    dispatch(getAddtask(taskInfo));
    setRefresh(true);
    setTodoopen(false);
  };

  return (
    <Modal
      centered
      className="my-modal"
      size="md"
      isOpen={todoOpen}
      toggle={() => setTodoopen(!todoOpen)}
    >
      <ModalHeader toggle={() => setTodoopen(!todoOpen)}>
        Create New Task
      </ModalHeader>
      <ModalBody>
        <form onSubmit={todosSubmit}>
          <div className="form-group mb-3">
            <label>Task Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="title"
              placeholder="Enter Task Name"
              onChange={(e) =>
                setTaskinfo({ ...taskInfo, title: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label>When is the task ? </label>
            <input
              required
              type="date"
              className="form-control"
              id="date"
              placeholder="Chose Date"
              onChange={(e) =>
                setTaskinfo({ ...taskInfo, date: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3 text-center">
            <div className="form-check form-check-inline">
              <input
                required
                className="form-check-input"
                type="radio"
                name="status"
                id="inlineRadio1"
                value="pending"
                onChange={(e) =>
                  setTaskinfo({ ...taskInfo, status: e.target.value })
                }
              />
              <label className="form-check-label">Pending</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                required
                className="form-check-input"
                type="radio"
                name="status"
                id="inlineRadio2"
                value="completed"
                onChange={(e) =>
                  setTaskinfo({ ...taskInfo, status: e.target.value })
                }
              />
              <label className="form-check-label">Completed</label>
            </div>
          </div>

          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-plus-circle m-1" aria-hidden="true"></i> Add
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default AddTodosModal;
