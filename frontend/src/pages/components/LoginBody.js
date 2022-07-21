import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function LoginBody() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
    

  const handleRegisterSubmit = (e) => {

    console.log(name);
    console.log(email);
    console.log(password);

    var json_data = { users:[
      {
        "name": name,
        "email": email,
        "password": password
      }
    ]}
    
    e.preventDefault();

    fetch('http://customgames.online/api_register', {  // Enter your IP address here

    method: 'POST', 
    mode: 'cors', 
    body: JSON.stringify(json_data)
  })
}

  return (
    <Container className="loginpage-body-container">
      <Row className="login-page-body-container-row-one">
        <Col sm={6} className="loginpage-body-container-row-one-col-one">
          <h1>Login</h1>
          <Form className="loginpage-body-container-row-one-col-one-form" as='form'>
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
            <Button variant="primary" type="submit" as='button'>
              Login
            </Button>
          </Form>
        </Col>
        <Col sm={6} className="loginpage-body-container-row-one-col-two">
          <h1>SignUp</h1>
          <Form className="loginpage-body-container-row-one-col-two-form" as="form" onSubmit={handleRegisterSubmit}  >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" as='input' onChange = {(e) => setEmail(e.target.value)} value = {email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control type="name" placeholder="Enter Profile Name" as='input' onChange = {(e) => {
                setName(e.target.value);
                console.log(name);
                }} value = {name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" as='input' onChange = {(e) => setPassword(e.target.value)} value = {password} />
            </Form.Group>
            <Button variant="primary" type="submit" as='button'>
              SignUp
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
