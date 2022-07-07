import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

export default function HomePageFooter() {
    return (
        <Container className="homepage-footer-container" >
            <Row className="homepage-footer-container-row-one" >
                <Col className="homepage-footer-container-row-one-col" >
                    <h4>Copyright Custom Game Shack</h4>
                </Col>
            </Row>
        </Container>
    );
}