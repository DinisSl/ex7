import 'bootstrap/dist/css/bootstrap.min.css';
import QuestionTable from "./QuestionTable";
import { Container, Row, Col } from "reactstrap";
import CreateQuestion from "./CreateQuestion.jsx";

function Content() {
  return (
    <Container style={{ marginTop: "20px", maxWidth: "800px" }}>
      <Row>
        <Col>
          <QuestionTable/>
        </Col>
        <hr/>
        <CreateQuestion/>
      </Row>
    </Container>
  );
}

export default Content;