import React from "react";
import { Accordion, Badge, Button, Container } from "react-bootstrap";

const Dashboard = () => {
  return (
    <>
      <Container>
        <h2>Upcoming Quiz list</h2>
        <hr />
        <div>
          <Accordion>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                Quiz Title <Badge bg='warning'>New</Badge>
              </Accordion.Header>
              <Accordion.Body>
                <p>Quiz Description</p>
                <h6>Author</h6>
                <hr />
                <div className='d-flex justify-content-between'>
                  <Button variant='info'>Start Quiz</Button>
                  <span> Number of people attempted: 20</span>
                </div>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        </div>
      </Container>
    </>
  );
};

export default Dashboard;
