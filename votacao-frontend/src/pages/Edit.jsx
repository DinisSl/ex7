import {useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, FormGroup, Table} from "reactstrap";
import moment from "moment";


const Edit = () => {

  const location = useLocation();
  const questaoRecebida = location.state.id;

  const navigate = useNavigate();

  return (
    <>


    <Button onClick={() => navigate("/")}>Voltar</Button>
    </>
  );
}


export default Edit