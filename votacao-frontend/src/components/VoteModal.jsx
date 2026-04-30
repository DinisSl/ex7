import React, {useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

function VoteModal() {
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_COMMENT = "http://localhost:8000/votacao/api/comentarios/";


  const [optionList, setOptionList] = useState([]);

  const location = useLocation();
  const questaoRecebida = location.state.id;
  const navigate = useNavigate();



  useEffect(() => {
    axios.get(URL_OPTIONS + questaoRecebida.id)
      .then(request => {
        setOptionList(request.data);
      })
  }, [questaoRecebida]);

  return (
    <>



    </>
  );
}

export default VoteModal;