import React, { useEffect, useState } from "react";
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
    )};

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
            <td style={centered}>
              <Button className="btn btn-danger"
                onClick={() => deleteQuestion(question.id)}
              >Apagar</Button>
              &nbsp;
              <Button className="btn btn-info" onClick={() => navigate("/Details", {state:{id:question.id}})}>Detalhes</Button>
              &nbsp;
              <Button color="success" onClick={() => navigate("/Vote", {state:{id:question.id}})}>Votar</Button>
              &nbsp;
              <Button className="btn btn-warning" onClick={() => navigate("/Edit", {state:{id:question.id}})}>Editar</Button>
            </td>
          </tr>
        ))}

      </tbody>

    </Table>
  );
}

export default QuestionTable;