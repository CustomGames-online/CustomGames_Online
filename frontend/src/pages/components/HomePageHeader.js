import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';


import headerLogo from './../../assets/header_logo.svg';

import './../../styling/GeneralStyling.css';

export default function HomePageHeader() {

    const login = true;
    const logout = true;

    return(
        <div className="homepage-header-div" >
                <Row className="homepage-header-div-row-one" >
                    <Col className="homepage-header-div-row-one-col" >
                        <Navbar.Brand href="/" className="homepage-header-div-row-one-col-brand" >
                            <Link to="/" >
                                <img src={headerLogo} alt="logo"/>
                                <h1><b>CustomGameShack</b></h1>
                            </Link>
                        </Navbar.Brand>
                    </Col>
                </Row>
                <Row className="homepage-header-div-row-two" >
                    <Col className="homepage-header-div-row-two-col" >
                        <Navbar.Brand href="/login" className="homepage-header-div-row-two-col-brand" >
                            {login ?? ( 
                                    <h5>Logout</h5>
                            )}
                            {logout ?? (
                                    <h5>Signup/Login</h5>
                            )}
                        </Navbar.Brand>
                    </Col>
                </Row>
        </div>        
    );
}