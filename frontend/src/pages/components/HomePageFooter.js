import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

export default function HomePageFooter(props) {

    const LogOut = () => {
        localStorage.clear();
        window.location.reload();
    }

    return (
        <div className="homepage-footer-container" >
            <Row className="homepage-footer-container-row-one" >
                <Col className="homepage-footer-container-row-one-col" >
                    <h4>Copyright Custom Game Shack</h4>
                    { props.loggedin === true && (
                        <Button className="homepage-body-continer-row-two-col-button" variant="primary" onClick={LogOut} >Log Out</Button>
                    )}
                </Col>
               
            </Row>
        </div>
    );
}