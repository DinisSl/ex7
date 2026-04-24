import React, { useState } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";
import axios from "axios";
import DetailData from "./DetailData";

function DetailModal({ question }) {
  // (1) (2)
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_COMMENTS = "http://localhost:8000/votacao/api/comentarios/";
  const [showModal, setShowModal] = useState(false);
  const [optionList, setOptionList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  // (3) (4) (5)
  const getOptions = () => {
    axios.get(URL_OPTIONS + question.id)
      .then(request => {
        setOptionList(request.data);
      });
    axios.get(URL_COMMENTS + question.id).then(request => {
      setCommentList(request.data);
    });
  };

  // (6)
  const toggleModal = () => {
    if (!showModal) getOptions();
    setShowModal(showModal => !showModal);
  };

  return (
    <>
      <Button onClick={toggleModal} color="warning">
        Detalhe
      </Button>
      <Modal isOpen={showModal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          Detalhe da questão {question.id}
        </ModalHeader>
        <ModalBody>
          <DetailData
            options={optionList}
            comments={commentList}
            question={question}
            toggle={toggleModal}
          />
        </ModalBody>
      </Modal>
    </>
  );
}

export default DetailModal;


