import React, { useState } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      console.log("Password do not match!");
    } else {
      const formData = { name, email, password };
      try {
        const response = await fetch("/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Registration successful");
          navigate("/dashboard");
        } else {
          console.log("Registration failed");
        }
      } catch (error) {
        console.error("Error during registration:", error);
      }
    }
  };
  return (
    <Container>
      <h1 className='text-center'>
        Register <hr />
      </h1>
      <Form onSubmit={handleSubmit} className='d-flex flex-column gap-4'>
        <InputGroup>
          <InputGroup.Text>Name</InputGroup.Text>
          <Form.Control
            type='text'
            placeholder='Enter your name'
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Email address</InputGroup.Text>
          <Form.Control
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Password</InputGroup.Text>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </InputGroup>
        <InputGroup>
          <InputGroup.Text>Confirm Password</InputGroup.Text>
          <Form.Control
            type='password'
            placeholder='Re-enter your password'
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
          />
        </InputGroup>
        <Button variant='outline-secondary' onClick={(e) => navigate("/login")}>
          Already have an accout?
        </Button>
        <Button variant='primary' type='submit'>
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default Register;
