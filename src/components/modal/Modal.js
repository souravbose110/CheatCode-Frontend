import React, { useEffect, useState } from "react";
import "./Modal.css";
import image from "../../assets/images/loading2.gif";

export default function Modal({ modalLoading }) {
  const [modal, setModal] = useState(false);

  const toggleModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    setModal(modalLoading);
  }, [modalLoading]);

  if (modal) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <>
      <span onClick={toggleModal} className="btn-modal"></span>

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img className="loading-image" src={image} alt="" />
          </div>
        </div>
      )}
    </>
  );
}
