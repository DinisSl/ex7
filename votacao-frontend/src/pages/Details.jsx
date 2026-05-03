import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, Table } from "reactstrap";
import moment from "moment";

const Details = () => {
  const location = useLocation();
  const questaoRecebida = location.state.id;

  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";

  const [optionList, setOptionList] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [pubData, setPubData] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(URL_OPTIONS + questaoRecebida + '/').then(request => {
      setOptionList(request.data);
    });

    axios.get(URL_QUESTIONS + questaoRecebida + '/').then(request => {
      setQuestionText(request.data.questao_texto);
      setPubData(request.data.pub_data);
    });
  }, [questaoRecebida]);

  return (
    <Container className="mt-4">
      <h3>Detalhes</h3>
      <br />

      <b>Texto:</b>
      <p>{questionText}</p>

      <b>Data de publicação:</b>
      <p>{moment(pubData).format("YYYY-MM-DD HH:mm")}</p>

      <Table size="sm">
        <thead>
          <tr>
            <th style={{ textAlign: "left" }}>Opção</th>
            <th style={{ textAlign: "right" }}>Votos</th>
          </tr>
        </thead>
        <tbody>
          {optionList.map((o) => (
            <tr key={o.id}>
              <td style={{ textAlign: "left" }}>{o.opcao_texto}</td>
              <td style={{ textAlign: "right" }}>{o.votos}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Button color="primary" onClick={() => navigate("/")}>Voltar</Button>
    </Container>
  );
}

export default Details;