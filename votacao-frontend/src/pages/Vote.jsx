import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Form, FormGroup, Table, Input, Label, Button, Container } from "reactstrap";

function Vote() {
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";
  const URL_OPTION_DETAIL = "http://localhost:8000/votacao/api/option/";

  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [questionText, setQuestionText] = useState("");
  const [pubData, setPubData] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const questaoRecebidaId = location.state.id;

  useEffect(() => {
    if (questaoRecebidaId) {
      axios.get(URL_OPTIONS + questaoRecebidaId + "/")
        .then(response => {
          setOptionList(response.data);
        })
        .catch(err => console.error(err));

      axios.get(URL_QUESTIONS + questaoRecebidaId + '/').then(request => {
        setQuestionText(request.data.questao_texto);
        setPubData(request.data.pub_data);
      });
    }
  }, [questaoRecebidaId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedOption >= 0) {
      const option = { ...optionList[selectedOption] };
      option.votos++;

      axios.put(URL_OPTION_DETAIL + option.id + "/", option)
        .then(() => {
          navigate("/");
        })
        .catch(err => console.error(err));
    } else {
      navigate("/");
    }
  };

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <Container className="mt-4">
      <h3>Votação</h3>

      <Form onSubmit={handleSubmit}>
        <b>Texto da Questão:</b>
        <p>{questionText}</p>

        <b>Data de publicação:</b>
        <p>{pubData ? moment(pubData).format("YYYY-MM-DD HH:mm") : ""}</p>

        <Table borderless>
          <thead>
            <tr>
              <th>Opções de Voto</th>
            </tr>
          </thead>
          <tbody>
            {optionList.map((o, index) => (
              <tr key={o.id}>
                <td>
                  <FormGroup check>
                    <Label check>
                      <Input
                        type="radio"
                        name="opcao"
                        value={index}
                        checked={selectedOption === index}
                        onChange={handleOptionChange}
                      />
                      {" "}{o.opcao_texto}
                    </Label>
                  </FormGroup>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Button color="primary" type="submit">Submeter</Button>
        &nbsp;
        <Button color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
      </Form>
    </Container>
  );
}

export default Vote;