import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = { email, password };

    try {
      const response = await fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Login successful", data);
        navigate("/dashboard"); // Redirect to the dashboard or any other route
      } else {
        const errorData = await response.json();
        console.log("Login failed", errorData);
        // Handle login failure, show an error message, etc.
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <Container>
      <h1 className='text-center'>
        Login <hr />
      </h1>
      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
        <InputGroup>
          <InputGroup.Text>Email address</InputGroup.Text>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password</InputGroup.Text>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </InputGroup>
        <Button
          variant='outline-secondary'
          onClick={() => navigate("/register")}
        >
          Don't have an account?
        </Button>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Login;
