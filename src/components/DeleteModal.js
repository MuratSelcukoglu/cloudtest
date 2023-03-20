import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { useDispatch } from "react-redux";
import { getDelete } from "../redux/deleteSlice";

const DeleteModal = ({
  deleteOpen,
  setDeleteopen,
  chooseUser,
  setRefresh,
  token,
}) => {
  const dispatch = useDispatch();

  const deleteSubmit = (e) => {
    e.preventDefault();
    const data = { id: chooseUser.id, token: token };
    dispatch(getDelete(data));
    setRefresh(true);
    setDeleteopen(false);
  };
 
  return (
    <Modal
      centered
      className="my-modal"
      size="sm"
      isOpen={deleteOpen}
      toggle={() => setDeleteopen(!deleteOpen)}
    >
      <ModalHeader toggle={() => setDeleteopen(!deleteOpen)}>
        Are You Sure ?
      </ModalHeader>
      <ModalBody>
        <p className="text-center headerText">
          Are you sure you want to delete {chooseUser.name} ?
        </p>
      </ModalBody>
      <ModalFooter className="d-flex justify-content-center">
        <button
          onClick={deleteSubmit}
          type="button"
          className="btn btn-outline-danger m-2"
        >
          Yes
        </button>
        <button
          type="button"
          className="btn btn-outline-primary m-2"
          onClick={() => setDeleteopen(!deleteOpen)}
        >
          No
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default DeleteModal;
