import { useState } from 'react';
import axios from 'axios';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LoginBody() {
  const [email, setEmail] = useState('');
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    
    const user_ = {
      name: user,
      email: email,
      password: password
    }

    axios.post('http://127.0.0.1:3018/signup', {user_})
    .then( res => {
      console.log(res.data);
    })

  }

  return (
    <Container className="loginpage-body-container">
      <Row className="login-page-body-container-row-one">
        <Col sm={6} className="loginpage-body-container-row-one-col-one">
          <h1>Login</h1>
          <Form className="loginpage-body-container-row-one-col-one-form" >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Remember Me" />
            </Form.Group>
            <Button variant="primary" type="submit" href="/gamelobby">
              Login
            </Button>
          </Form>
        </Col>
        <Col sm={6} className="loginpage-body-container-row-one-col-two">
          <h1>SignUp</h1>
          <Form className="loginpage-body-container-row-one-col-two-form" onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" onChange={setEmail}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Profile Name" onChange={setUser} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={setPassword}/>
            </Form.Group>
            <Button variant="primary" type="submit" href="/gamelobby" onSubmit={handleSubmit}>
              SignUp
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
