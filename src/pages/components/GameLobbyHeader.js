import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import headerLogo from './../../assets/header_logo.svg';

import './../../styling/GeneralStyling.css';

export default function GameLobbyHeader() {

    return (
        <div className="homepage-header-div" >
                <Row className="homepage-header-div-row-one" >
                    <Col className="homepage-header-div-row-one-col" >
                        <Navbar.Brand href="/" className="homepage-header-div-row-one-col-brand" >
                            <img src={headerLogo} alt="logo"/>
                            <h1><b>CustomGameShack</b></h1>
                        </Navbar.Brand>
                    </Col>
                </Row>
        </div> 
    );
}