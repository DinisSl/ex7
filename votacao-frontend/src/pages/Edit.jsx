import { useNavigate, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Label, Input, FormGroup, Table, Container } from "reactstrap";

const Edit = () => {
  const location = useLocation();
  const questaoRecebida = location.state.id;

  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";

  const [optionList, setOptionList] = useState([]);
  const [questionText, setQuestionText] = useState("");

  const navigate = useNavigate();

  const saveChanges = () => {
    axios.put(URL_QUESTIONS + questaoRecebida + '/', {
      questao_texto: questionText,
    }).then(() => {

        const pedidos = optionList.map((opcao) => {
            return axios.put("http://localhost:8000/votacao/api/option/" + opcao.id + '/', {
                opcao_texto: opcao.opcao_texto,
            });
        });
// usei o chat para procurar a melhor maneira de esperar que todas as opções fossem atualizadas liga tambem ao partial no serializer
        Promise.all(pedidos).then(() => {
            navigate("/");
            });
        });
  };

  const handleOptionChange = (id, newText) => {
    const updatedOptions = optionList.map((opt) =>
        opt.id === id ? { ...opt, opcao_texto: newText } : opt
    );
  setOptionList(updatedOptions);
};


  useEffect(() => {
    axios.get(URL_OPTIONS + questaoRecebida + '/').then(request => {
      setOptionList(request.data);
    });

    axios.get(URL_QUESTIONS + questaoRecebida + '/').then(request => {
      setQuestionText(request.data.questao_texto);
    });
  }, [questaoRecebida]);

  return (
    <Container className="mt-4">
      <h3>Editar Questão</h3>

      <FormGroup>
        <Label>Texto da questão:</Label>
        <Input
          type="text"
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
        />
      </FormGroup>

      <br />
      <h5>Lista de Opções</h5>
      <Table borderless size="sm">
        <tbody>
          {optionList.map((opcao) => (
            <tr key={opcao.id}>
              <td>
                <Input
                    type="text"
                    value={opcao.opcao_texto}
                    onChange={(e) => handleOptionChange(opcao.id, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />

      <Button color="primary" onClick={saveChanges}>Guardar alterações</Button>
      &nbsp;
      <Button color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
    </Container>
  );
}

export default Edit;