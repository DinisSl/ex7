import React, { useState } from "react";
import { Button, Form, FormGroup, Table, Label, Input } from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({ options, question, toggle }) {
  const URL_OPTION = "http://localhost:8000/votacao/api/option/";
  const URL_COMMENT = "http://localhost:8000/votacao/api/comentarios/";
  const [selectedOption, setSelectedOption] = useState(-1);
  const [nomeAutor, setNomeAutor] = useState("");
  const [textoComentario, setTextoComentario] = useState("");



    // 1. Lógica de Votação (PUT)
    if (selectedOption >= 0) {
      const option = { ...options[selectedOption] };
      option.votos++;
      axios.put(URL_OPTION + option.id, option);
    }

    // 2. Lógica de Comentário (POST)
    if (nomeAutor && textoComentario) {
      axios.post(URL_COMMENT + question.id, {
        nome_autor: nomeAutor,
        comentario_texto: textoComentario,
        questao: question.id
      }).then(() => {
        console.log("Comentário submetido com sucesso");
      }).catch(err => {
        console.error("Erro ao submeter comentário", err);
      });
    }

    toggle();
  };

  const optionChangeHandler = (event) => {
    setSelectedOption(parseInt(event.target.value));
  };

  return (
    <>
      <Form onSubmit={voteAndCloseModal}>
        <FormGroup>
          <b>Texto da Questão:</b>
          <p>{question.questao_texto}</p>
          <b>Data de publicação:</b>
          <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
        </FormGroup>

        <FormGroup>
          <Table>
            <thead>
              <tr>
                <th align="left">Opções de Voto</th>
              </tr>
            </thead>
            <tbody>
              {options.map((o, index) => (
                <tr key={o.id}>
                  <td align="left">
                    <FormGroup check>
                      <Label>
                        <input
                          type="radio"
                          name="react-radio"
                          checked={selectedOption === index}
                          value={index}
                          className="form-check-input"
                          onChange={optionChangeHandler}
                        />
                        {o.opcao_texto}
                      </Label>
                    </FormGroup>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </FormGroup>

        <hr />
        <h5>Deixe um comentário (opcional)</h5>

        <FormGroup>
          <Label for="nomeAutor">Seu Nome:</Label>
          <Input
            type="text"
            id="nomeAutor"
            placeholder="Digite seu nome"
            value={nomeAutor}
            onChange={(e) => setNomeAutor(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <Label for="textoComentario">Comentário:</Label>
          <Input
            type="textarea"
            id="textoComentario"
            placeholder="Escreva sua opinião..."
            value={textoComentario}
            onChange={(e) => setTextoComentario(e.target.value)}
          />
        </FormGroup>

        <Button color="success" block>Votar e Comentar</Button>
      </Form>
    </>
  );
}

export default VoteForm;