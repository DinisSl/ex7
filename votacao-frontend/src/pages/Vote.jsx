import  { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import moment from "moment";
import { Form, FormGroup, Table, Input, Label, Button } from "reactstrap";

function Vote() {
  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_COMMENT = "http://localhost:8000/votacao/api/comentarios/";

  const [optionList, setOptionList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(-1);
  const [nomeAutor, setNomeAutor] = useState("");
  const [textoComentario, setTextoComentario] = useState("");


  const navigate = useNavigate();
  const location = useLocation();
  const question = location.state.id;

  useEffect(() => {
    if (question.id) {
      axios.get(URL_OPTIONS + question.id + "/")
        .then(response => {
          setOptionList(response.data);
        })
        .catch(err => console.error(err));
    }
  }, [question.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    //Votação
    if (selectedOption >= 0) {
      const option = { ...optionList[selectedOption] };
      option.votos++;

      axios.put(URL_OPTIONS + option.id + "/", option)
        .catch(err => console.error("Erro ao votar:", err));
    }

    //Comentário
    if (nomeAutor && textoComentario) {
      axios.post(URL_COMMENT, {
        nome_autor: nomeAutor,
        comentario_texto: textoComentario,
        questao: question.id
      })
      .catch(err => console.error("Erro ao comentar:", err));
    }

  };

  const handleOptionChange = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <div className="container mt-4">
      <h3>Votação</h3>

      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <b>Texto da Questão:</b>
          <p>{question.questao_texto}</p>

          <b>Data de publicação:</b>
          <p>
            {question.pub_data
              ? moment(question.pub_data).format("YYYY-MM-DD HH:mm")
              : ""}
          </p>
        </FormGroup>

        <FormGroup>
          <Table>
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
                      <Label>
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
        </FormGroup>

        <hr />
        <h5>Comentário (opcional)</h5>

        <FormGroup>
          <Label>Nome:</Label>
          <Input
            type="text"
            value={nomeAutor}
            onChange={(e) => setNomeAutor(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label>Comentário:</Label>
          <Input
            type="textarea"
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
          />
        </FormGroup>

        <Button onClick={() => navigate("/")}>Submeter</Button>
      </Form>
    </div>
  );
}

export default Vote

