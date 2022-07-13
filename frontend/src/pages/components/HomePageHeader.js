import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';

import headerLogo from './../../assets/header_logo.svg';

import './../../styling/GeneralStyling.css';

export default function HomePageHeader() {
    return(
        <div className="homepage-header-div" >
                <Row className="homepage-header-div-row-one" >
                    <Col className="homepage-header-div-row-one-col" >
                        <Navbar.Brand href="/" className="homepage-header-div-row-one-col-brand" >
                            <img src={headerLogo} />
                            <h1><b>CustomGameShack</b></h1>
                        </Navbar.Brand>
                    </Col>
                </Row>
                <Row className="homepage-header-div-row-two" >
                    <Col className="homepage-header-div-row-two-col" >
                        <Navbar.Brand href="/login" className="homepage-header-div-row-two-col-brand" >
                            {/* <img src={headerLogo} /> */}
                            <h5>Sign Up/Sign In</h5>
                        </Navbar.Brand>
                    </Col>
                </Row>
        </div>        
    );
}