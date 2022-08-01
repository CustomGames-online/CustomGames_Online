import { useState } from 'react';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from 'react-bootstrap/Modal';
import { Navigate } from 'react-router-dom';


export default function LoginBody() {

  const [forgotcode, setForgotCode] = useState();
  const [newpassword, setNewPassword] = useState();
  const [forgotemail, setForgotEmail] = useState();
  const [show, setShow] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginemail, setLoginEmail] = useState('');
  const [loginpass, setLoginPass] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [failedlogin, setFailedLogin] = useState(false);
  const [resetSucceeded, setResetSucceeded] = useState(false);
  const [resetFailed, setResetFailed] = useState(false);

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
    }).then((res) => {
      return res.json();
    }).then((result) => {
      localStorage.setItem("token", result["token"]);
      localStorage.setItem("local_name", name);
      localStorage.setItem("local_email", email);
      localStorage.setItem("local_level", "0");
      localStorage.setItem("local_xp", "0");
      setNavigate(true);
    })

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
      console.log(result['message'])
        if( result['message'] === 'matched' ) {
          setNavigate(true);
          setFailedLogin(false);
          localStorage.setItem("token", result['token']);
        } else {
          setFailedLogin(true);
        }
    })
  }

  const handleForgotSubmit = (e) => {
    e.preventDefault();

    fetch('http://customgames.online/api_send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": forgotemail
      })
    }).then((res) => {
      return res.json();
    })
    .then((result) => {
      console.log(result['message']);
    });
    
  }

  const handleNewPassword = (e) => {
    e.preventDefault();
  
    fetch('http://customgames.online/api_reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": forgotemail,
        "password": newpassword,
        "code": forgotcode
      })
    })
    .then((res) => {
      return res.json();
    })
    .then((result) => {
      if( result['message'] === 'password changed' ) {
        setResetSucceeded(true)
        setResetFailed(false)
      } else {
        setResetFailed(true);
        setResetSucceeded(false);
      }
    });
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
            <Button variant="primary" type="submit" as='button'>
              Login
            </Button>
          </Form>
          {failedlogin && (
            <p>Incorrect Email or Password!</p>
          )}
          <Button variant="primary" onClick={() => setShow(!(show))}>
            Forgot Password?
          </Button>
          <Modal show={show} onHide={() => setShow(!(show))} className="loginpage-body-container-row-one-col-one-modal">
            <Modal.Header closeButton>
              <Modal.Title>Forgot Password?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form className="loginpage-body-container-row-one-col-two-form" as="form" onSubmit={handleForgotSubmit}  >
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" name="email" placeholder="Enter email" as='input' onChange = {(e) => setForgotEmail(e.target.value)} value = {forgotemail}/>
                </Form.Group>
                <Button variant="primary" type="submit" as='button'>
                  Send Email
                </Button>
              </Form>
              <Form className="loginpage-body-container-row-one-col-two-form-two" as="form" onSubmit={handleNewPassword}  >
                <Form.Group className="mb-3" controlId="formBasicEmail" >
                  <Form.Label>
                    Code
                  </Form.Label>
                  <Form.Control type="text" name="forgotcode" placeholder="Enter Code" as='input' onChange = {(e) => setForgotCode(e.target.value)} value = {forgotcode}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword" >
                  <Form.Label>
                    New Password
                  </Form.Label>
                  <Form.Control type="text" name="forgotcode" placeholder="Enter New Password" as='input' onChange = {(e) => setNewPassword(e.target.value)} value = {newpassword}/>
                </Form.Group>
                <Button variant="primary" type="submit" as='button'>
                  Reset Password
                </Button>
              </Form>
              {resetSucceeded && (
                <p>Password Successfully Changed</p>
              )}
              {resetFailed && (
                <p>Code Incorrect!</p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShow(!(show))}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
