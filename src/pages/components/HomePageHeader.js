import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

import NavbarLogo from "./../../assets/rubik.svg";

import './../../styling/GeneralStyling.css';
import './../../styling/HomePageStyling.css';

export default function HomePageHeader() {
    return(
        <Navbar expand="lg" variant="light" bg="light" className="navbar-element">
            <Container className="navbar-container-element">
                <Navbar.Brand href="#" className="navbar-brand-element">
                    <img 
                        alt='logo'
                        src={NavbarLogo}
                        width="30"
                        height="30"
                        className='d-inline-block align-top navbar-logo'
                    />
                    Custom Game Shack
                </Navbar.Brand>
            </Container>
        </Navbar>
    );
}