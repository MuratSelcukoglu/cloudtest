import React, { useState } from "react";
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { useDispatch } from "react-redux";
import { getUpdate } from "../redux/updateSlice";

const UdapetModal = ({
  updateOpen,
  setUpdateopen,
  chooseUser,
  token,
  setRefresh,
}) => {
  const dispatch = useDispatch();
  const [userInfo, setUserinfo] = useState({
    token: token,
    id: chooseUser.id,
    name: "",
    email: "",
    status: "",
    gender: "",
  });

  const updateSubmit = (e) => {
    e.preventDefault();
    dispatch(getUpdate(userInfo));
    setRefresh(true);
    setUpdateopen(false);
  };

  return (
    <Modal
      centered
      className="my-modal"
      size="md"
      isOpen={updateOpen}
      toggle={() => setUpdateopen(!updateOpen)}
    >
      <ModalHeader toggle={() => setUpdateopen(!updateOpen)}>
        Update {chooseUser.name}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={updateSubmit}>
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
              <i className="fa fa-pencil-square" aria-hidden="true"></i> Update
            </button>
          </div>
        </form>
      </ModalBody>
    </Modal>
  );
};

export default UdapetModal;
