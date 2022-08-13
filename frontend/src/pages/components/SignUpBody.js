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
    const [navigate, setNavigate] = useState(false);
    const [navigatelogin, setNavigateLogin] = useState(false);

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
        if ( result['message'] === 'registered') {
            localStorage.setItem("token", result["token"]);
            localStorage.setItem("local_name", result["name"]);
            localStorage.setItem("local_email", result["email"]);
            localStorage.setItem("local_level", 0);
            localStorage.setItem("local_xp", 0);
            setNavigate(true);
        }

        })

    }

    const hasAccount = (e) => {
        e.preventDefault();

        setNavigateLogin(true);
    }

    return (
        <Container className="signup-body-container">
        {navigate && (
            <Navigate to="/gamelobby" replace={true} />
        )}
        {navigatelogin && (
            <Navigate to="/login" replace={true} />
        )}
        <Row className="signup-page-body-container-row-one">
            <Col sm={8} className="signup-body-container-row-one-col-one">
                <h1>Sign Up Now!</h1>
                <Form className="signup-body-container-row-one-col-two-form" as="form" onSubmit={handleRegisterSubmit}  >
                    <Form.Group className="mb-3 signup-body-container-row-one-col-two-form-group" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name="email" placeholder="Enter email" as='input' onChange = {(e) => setEmail(e.target.value)} value = {email}/>
                    </Form.Group>
                    <Form.Group className="mb-3 signup-body-container-row-one-col-two-form-group" controlId="formBasicUser">
                    <Form.Label>Profile Name</Form.Label>
                    <Form.Control type="name" name="name" placeholder="Enter Profile Name" as='input' onChange = {(e) => {
                        setName(e.target.value);
                        console.log(name);
                        }} value = {name} />
                    </Form.Group>
                    <Form.Group className="mb-3 signup-body-container-row-one-col-two-form-group" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name="password" placeholder="Password" as='input' onChange = {(e) => setPassword(e.target.value)} value = {password} />
                    </Form.Group>
                    <Button variant="primary" type="submit" as='button' className="signup-page-body-container-row-one-col-one-form-button">
                        Sign Up
                    </Button>
                </Form>
            </Col>
            <Col sm={4} className="signup-body-container-row-one-col-two" >
                <Container className="signup-body-container-row-one-col-two-container">
                    <h2>Already Have An Account?</h2>
                    <Button variant="primary" type="submit" as='button' onClick={hasAccount}>
                        Login
                    </Button>
                </Container>
            </Col>
        </Row>
        </Container>
    );
}
