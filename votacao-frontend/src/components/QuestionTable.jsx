import React, { useEffect, useState } from "react";
import { Table } from "reactstrap";
import axios from "axios";

import {useNavigate} from "react-router-dom";

function QuestionTable() {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/"; // (1)
  const [questionList, setQuestionList] = useState([]); // (2)

  const getQuestions = () => { // (3)
    axios.get(URL_QUESTIONS)
      .then((request) => {
        setQuestionList(request.data);
      });
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
            <td style={centered}>
              <button onClick={() => navigate("/Details", {state:{id:question.id}})}>Detalhes</button>
              &nbsp;
              <button onClick={() => navigate("/Vote")}>Votar</button>
            </td>
          </tr>
        ))}

      </tbody>

    </Table>
  );
}

export default QuestionTable;