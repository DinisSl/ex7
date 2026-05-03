import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Label, Input, FormGroup, Table, Container } from "reactstrap";

const Edit = () => {
  const location = useLocation();
  const questaoRecebida = location.state.id;

  const URL_OPTIONS = "http://localhost:8000/votacao/api/options/";
  const URL_OPTION = "http://localhost:8000/votacao/api/option/";
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";

  const [optionList, setOptionList] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [optionText, setOptionText] = useState("");

  const navigate = useNavigate();

  const saveChanges = () => {
    axios.put(URL_QUESTIONS + questaoRecebida + '/', {
      questao_texto: questionText,
    }).then(() => {

        const pedidos = optionList.map((opcao) => {
            return axios.put(URL_OPTION + opcao.id + '/', {
                opcao_texto: opcao.opcao_texto,
            });
        });
// usei um LLM para procurar a melhor maneira de esperar que todas as opções fossem atualizadas liga tambem ao partial no serializer
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

  const deleteOption = (id) => {
    // console.log("deleteOption " + URL_OPTION + id + '/')
    axios.delete(URL_OPTION + id + '/').then(() => {
      getOption()}
    )
  };

  const getOption = () => {
    // console.log("getOption " + URL_OPTION + questaoRecebida + '/')
    axios.get(URL_OPTIONS + questaoRecebida + '/').then(request => {
      setOptionList(request.data);
    });
  };

  // path('api/options/<int:question_id>/', views.options),

  const newOption = () => {
    axios.post(URL_OPTIONS + questaoRecebida + '/', {
      opcao_texto: optionText,
      votos: 0,
      questao: questaoRecebida,
    })
    .then(() => {
      setOptionText("");
      getOption();
    })
  }

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
                <Button color="danger" onClick={() => deleteOption(opcao.id)}>Apagar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <br />

      <FormGroup>
        <Label>Acrescentar nova opção:</Label>
        <div className="d-flex gap-2">
          <Input
            type="text"
            value={optionText}
            onChange={(e) => setOptionText(e.target.value)}
          />
          <Button color="success" onClick={newOption}>Adicionar</Button>
        </div>
      </FormGroup>

      <Button color="primary" onClick={saveChanges}>Guardar alterações</Button>
      &nbsp;
      <Button color="secondary" onClick={() => navigate("/")}>Cancelar</Button>
    </Container>
  );
}

export default Edit;