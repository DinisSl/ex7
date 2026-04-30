import {useNavigate, useLocation} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import {Button, Form, FormGroup, Table} from "reactstrap";
import moment from "moment";


const Details = () => {

  const location = useLocation();
  const questaoRecebida = location.state.id;

  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_COMMENTS = "http://localhost:8000/votacao/api/comentarios/";

  const [optionList, setOptionList] = useState([]);
  const [commentList, setCommentList] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(URL_OPTIONS + questaoRecebida).then(request => {
      setOptionList(request.data);
    });
    axios.get(URL_COMMENTS + questaoRecebida).then(request => {
      setCommentList(request.data);
    });
  }, [questaoRecebida]);

  return (
    <>
      <Form> {/* (3) */}
        <FormGroup>
          <b>Texto:</b>
          <p>{questaoRecebida.questao_texto}</p>
          <b>Data de publicação:</b>
          <p>{moment(questaoRecebida.pub_data).format("YYYY-MM-DD HH:mm")}</p> {/* (4) */}
        </FormGroup>

        <FormGroup>
          <Table>
            <thead>
              <tr>
                <th style={{ textAlign: "left" }}>Opção</th>
                <th style={{ textAlign: "right" }}>Votos</th>
              </tr>
            </thead>
            <tbody>
              {optionList.map((o) => (
                // (5)
                <tr key={o.id}>
                  <td style={{ textAlign: "left" }}>{o.opcao_texto}</td>
                  <td style={{ textAlign: "right" }}>{o.votos}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormGroup>
    </Form>

    <Button onClick={() => navigate("/")}>Voltar</Button>
    </>
  );
}


export default Details