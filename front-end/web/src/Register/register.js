import React, { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import sendRequest from "../services/httpService";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function registerUser() {
    const reqBody = {
      name: name,
      username: username,
      password: password,
    };
    fetch("api/user/register", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(reqBody),
    })
      .then((response) => {
        if (response.status === 200) {
          return Promise.all([response.json(), response.headers]);
        } else {
          return Promise.reject("User Already Exists");
        }
      })
      .then((response) => {
        navigate("/");
      })
      .catch((message) => alert(message));
  }
  const onFormSubmit = (e) => {
    e.preventDefault();
    registerUser();
  };

  return (
    <>
      <Container className="mt-5 d-flex align-items-center justify-content-center">
        <Form onSubmit={onFormSubmit}>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="login-button"
            id="submit"
            type="submit"
            variant="primary"
          >
            Register
          </Button>
          <Button
            className="mt-3 login-button"
            id="back"
            type="button"
            onClick={() => {
              navigate(`/`);
            }}
            variant="secondary"
          >
            Back
          </Button>
        </Form>
      </Container>
    </>
  );
};

export default Register;
