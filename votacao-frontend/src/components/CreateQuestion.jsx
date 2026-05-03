import { useState } from "react";
import axios from "axios";
import { FormGroup, Label, Input, Button, Alert } from "reactstrap";

const CreateQuestion = () => {
  const URL_QUESTIONS = "http://localhost:8000/votacao/api/questions/";

  const [questionText, setQuestionText] = useState("");
  const [error, setError] = useState("");


  const handleSubmit = () => {
    if (!questionText.trim()) {
      setError("O texto da questão não pode estar vazio.");
      return;
    }

    setError("");


    axios.post(URL_QUESTIONS, {questao_texto: questionText, pub_data: new Date().toISOString(),})
        .then(() => {
        setQuestionText("");
      })
      .catch((err) => {
        console.error(err);
        setError("Erro ao criar a questão. Tenta novamente.");
      })

  };

  return (
    <div>
      <h5>Nova Questão</h5>

      {error && <Alert color="danger">{error}</Alert>}

      <FormGroup>
        <Label for="questionInput">Texto da questão:</Label>
        <Input
          id="questionInput"
          type="text"
          placeholder="Escreve a tua questão..."
          value={questionText}
          onChange={(e) => setQuestionText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
        />
      </FormGroup>

      <Button type="button" color="primary" onClick={handleSubmit} >Criar Questão </Button>
    </div>
  );
}


export default CreateQuestion;
