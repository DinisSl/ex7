import React, { useState } from "react";
import { Button, Form, FormGroup, Table, Label } from "reactstrap";
import axios from "axios";
import moment from "moment";

function VoteForm({ options, question, toggle }) {
  // (1) (2)
  const URL_OPTION = "http://localhost:8000/votacao/api/option/";
  const [selectedOption, setSelectedOption] = useState(-1);

  // (3)
  const voteAndCloseModal = (event) => {
    event.preventDefault();
    if (selectedOption >= 0) {
      const option = { ...options[selectedOption] };
      option.votos++;
      axios.put(URL_OPTION + option.id, option).then(() => {
        // Optional: you could add a state refresh here
      });
    }
    toggle();
  };

  // (4)
  const optionChangeHandler = (event) => {
    const optionIndex = parseInt(event.target.value);
    setSelectedOption(optionIndex);
  };

  return (
    <>
      <Form onSubmit={voteAndCloseModal}>
        {/* (5) */}
        <FormGroup>
          <b>Texto:</b>
          <p>{question.questao_texto}</p>
          <b>Data de publicação:</b>
          <p>{moment(question.pub_data).format("YYYY-MM-DD HH:mm")}</p>
        </FormGroup>

        <FormGroup>
          <Table>
            <thead>
              <tr>
                <th align="left">Opção</th>
              </tr>
            </thead>
            <tbody>
              {options.map((o, index) => (
                // (6)
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
        <Button color="success">Votar</Button> {/* (5) */}
      </Form>
    </>
  );
}

export default VoteForm;