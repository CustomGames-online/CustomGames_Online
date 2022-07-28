import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Navigate } from 'react-router-dom';


export default function LoginBody() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginemail, setLoginEmail] = useState('');
  const [loginpass, setLoginPass] = useState('');
  const [navigate, setNavigate] = useState(false);
    

  const handleRegisterSubmit = (e) => {
    e.preventDefault();

    fetch('http://customgames.online/api_register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": name,
        "email": email,
        "password": password
      })
    })

    setNavigate(true);
  }

  const handleLoginSubmit = (e) => {
    e.preventDefault();

    fetch('http://customgames.online/api_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": loginemail,
        "password": loginpass
      })
    }).then((res) => {
      return res.json();
    }).then((result) => {
        if( result === 'matched' ) 
          setNavigate(true);
    })
  }

  return (
    <Container className="loginpage-body-container">
      {navigate && (
              <Navigate to="/gamelobby" replace={true} />
      )}
      <Row className="login-page-body-container-row-one">
        <Col sm={6} className="loginpage-body-container-row-one-col-one">
          <h1>Login</h1>
          <Form className="loginpage-body-container-row-one-col-one-form" as='form' onSubmit={handleLoginSubmit} >
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" name="email" placeholder="Enter email" as='input' onChange = {(e) => setLoginEmail(e.target.value)} value = {loginemail} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" as='input' onChange = {(e) => setLoginPass(e.target.value)} value = {loginpass}  />
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
              <Form.Control type="email" name="email" placeholder="Enter email" as='input' onChange = {(e) => setEmail(e.target.value)} value = {email}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUser">
              <Form.Label>Profile Name</Form.Label>
              <Form.Control type="name" name="name" placeholder="Enter Profile Name" as='input' onChange = {(e) => {
                setName(e.target.value);
                console.log(name);
                }} value = {name} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" name="password" placeholder="Password" as='input' onChange = {(e) => setPassword(e.target.value)} value = {password} />
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
