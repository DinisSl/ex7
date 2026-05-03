import { useEffect, useState } from "react";
import {Button, Table} from "reactstrap";
import axios from "axios";

import {useNavigate} from "react-router-dom";

function QuestionTable() {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";
  const [questionList, setQuestionList] = useState([]);

  const getQuestions = () => {
    axios.get(URL_QUESTIONS)
      .then((request) => {
        setQuestionList(request.data);
      });
  };

  const deleteQuestion = (id) => {
    axios.delete(URL_QUESTIONS + id + '/').then(() => {
      getQuestions();}
    )
  };

  useEffect(() => {
    getQuestions();
  }, []);

  const centered = { textAlign: "center" };

  const navigate = useNavigate();

  return (
    <Table light="true">

      <thead>
        <tr>
          <th>Texto</th>
          <th style={centered}>Controls</th>
        </tr>
      </thead>

      <tbody>

        {questionList.map((question) => (
          <tr key={question.id}>
            <td>{question.questao_texto}</td>
            <td>
              <div className="d-flex justify-content-center flex-nowrap gap-2">
                <Button color="danger" onClick={() => deleteQuestion(question.id)}>Apagar</Button>
                <Button color="info" onClick={() => navigate("/Details", {state:{id:question.id}})}>Detalhes</Button>
                <Button color="success" onClick={() => navigate("/Vote", {state:{id:question.id}})}>Votar</Button>
                <Button color="warning" onClick={() => navigate("/Edit", {state:{id:question.id}})}>Editar</Button>
              </div>
            </td>
          </tr>
        ))}

      </tbody>

    </Table>
  );
}

export default QuestionTable;