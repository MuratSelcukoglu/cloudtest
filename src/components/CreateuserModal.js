import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { getCreate } from "../redux/createuserSlice";

const CreateuserModal = ({ token, setRefresh, setCreateopen, createOpen }) => {
  const dispatch = useDispatch();
  const [userInfo, setUserinfo] = useState({
    token: token,
    name: "",
    email: "",
    status: "",
    gender: "",
  });
console.log(token.user)
  const createSubmit = (e) => {
    e.preventDefault();
    dispatch(getCreate(userInfo))
      .then((result) => {
        
        if (result.payload[0].field === "email") {
          alert("Email "+result.payload[0].message);
        }else {
          console.log(result)
        }
      })
      .catch((error) => console.log(error));
    setRefresh(true);
    setCreateopen(false);
  };

  return (
    <Modal
      centered
      className="my-modal"
      size="md"
      isOpen={createOpen}
      toggle={() => setCreateopen(!createOpen)}
    >
      <ModalHeader toggle={() => setCreateopen(!createOpen)}>
        Create New User
      </ModalHeader>
      <ModalBody>
        <form onSubmit={createSubmit}>
          <div className="form-group mb-3">
            <label>User Name</label>
            <input
              required
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter Fullname"
              onChange={(e) =>
                setUserinfo({ ...userInfo, name: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <label>Email addres</label>
            <input
              required
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(e) =>
                setUserinfo({ ...userInfo, email: e.target.value })
              }
            />
          </div>
          <div className="row">
            <div className="col">
              <div className="text-center">
                <h6 className="font-weight-bold">Choose Gender</h6>
              </div>
              <div className="form-group mb-3 text-center">
                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio3"
                    value="male"
                    onChange={(e) =>
                      setUserinfo({ ...userInfo, gender: e.target.value })
                    }
                  />
                  <i className="fa fa-male "></i>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="gender"
                    id="inlineRadio4"
                    value="female"
                    onChange={(e) =>
                      setUserinfo({ ...userInfo, gender: e.target.value })
                    }
                  />
                  <i className="fa fa-female "></i>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="text-center">
                <h6 className="font-weight-bold">Choose Status</h6>
              </div>
              <div className="form-group mb-3 text-center">
                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="inlineRadio1"
                    value="active"
                    onChange={(e) =>
                      setUserinfo({ ...userInfo, status: e.target.value })
                    }
                  />
                  <label className="form-check-label">Active</label>
                </div>
                <div className="form-check form-check-inline">
                  <input
                    required
                    className="form-check-input"
                    type="radio"
                    name="status"
                    id="inlineRadio2"
                    value="inactive"
                    onChange={(e) =>
                      setUserinfo({ ...userInfo, status: e.target.value })
                    }
                  />
                  <label className="form-check-label">İnactive</label>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              <i className="fa fa-plus-circle" aria-hidden="true"></i> Create
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default CreateuserModal;
