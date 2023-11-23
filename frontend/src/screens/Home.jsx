import React from "react";
import { Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const navigate = useNavigate();
  return (
    <Container>
      <h2 className='text-center'>Welcome to Student Mangament System</h2>
      <h4 className='text-center'>
        Create quiz, take challenges, evalute and many more exciting features!
      </h4>
      <div className='text-center'>
        <Button variant='primary' onClick={() => navigate("/login")}>
          Login
        </Button>
      </div>
    </Container>
  );
};

export default Home;
