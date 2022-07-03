import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


import './../../styling/GeneralStyling.css';
import './../../styling/HomePageStyling.css';

export default function HomePageHeader() {
    return(
        <Container className="home-page-header-container">
            <Row>
                <Col>   
                    <h1>Header Row 1</h1>
                </Col>
            </Row>
            <Row>
                <Col>
                    <h1>Header Row 2</h1>
                </Col>
            </Row>
        </Container>
        
    );
}