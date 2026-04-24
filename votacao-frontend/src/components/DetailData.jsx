import React from "react";
import { Button, Form, FormGroup, Table } from "reactstrap";
import moment from "moment";

function DetailData({ options, question, comments, toggle }) {
  // (1)
  const closeModal = (e) => {
    // (2)
    e.preventDefault();
    toggle();
  };

  return (
    <Form onSubmit={closeModal}> {/* (3) */}
      <FormGroup>
        <b>Texto:</b>
        <p>{question.questao_texto}</p>
        <b>Data de publicação:</b>
        <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p> {/* (4) */}
      </FormGroup>

      <FormGroup>
        <Table>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>Opção</th>
              <th style={{ textAlign: "right" }}>Votos</th>
            </tr>
          </thead>
          <tbody>
            {options.map((o) => (
              // (5)
              <tr key={o.id}>
                <td style={{ textAlign: "left" }}>{o.opcao_texto}</td>
                <td style={{ textAlign: "right" }}>{o.votos}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </FormGroup>

      <FormGroup>
        <b>Comentários:</b>
          <Table striped size="sm">
            <thead>
              <tr>
                <th>Autor</th>
                <th>Comentário</th>
              </tr>
            </thead>
            <tbody>
              {comments && comments.length > 0 ? (
                comments.map((c) => (
                  <tr key={c.id}>
                    {/* Campos: nome_autor e comentario_texto do seu Serializer */}
                    <td>{c.nome_autor}</td>
                    <td>{c.comentario_texto}</td>
                  </tr>
                ))
              ) : (
              <tr><td colSpan="2">Sem comentários.</td></tr>
              )}
            </tbody>
          </Table>
      </FormGroup>
        <Button color="primary">Fechar</Button> {/* (3) */}
    </Form>
  );
}

export default DetailData;