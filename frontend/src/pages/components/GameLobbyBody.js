import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import './../../styling/GeneralStyling.css'

export default function GameLobbyBody() {
    return (
        <div className="gamelobby-body-div" >
            <Row className="gamelobby-body-div-row-one" >
                <Col sm={2} className="gamelobby-body-div-row-one-col-one" >
                    <Container className="gamelobby-body-div-row-one-col-one-container">
                        <h3>Friends List</h3>
                        <ListGroup variant="flush" className="gamelobby-body-div-row-one-col-one-container-listgroup">
                            <ListGroup.Item as="a" href="/profile">John Doe</ListGroup.Item>
                            <ListGroup.Item as="a" href="/profile">Jane Doe</ListGroup.Item>
                            <ListGroup.Item as="a" href="profile">Morbius</ListGroup.Item>
                            <ListGroup.Item as="a" href="/profile">Jake Lane</ListGroup.Item>
                        </ListGroup>
                    </Container>
                </Col>
                <Col sm={10}>
                    <Container>
                        <h1>Lets Play A Game</h1>
                        <Row>
                            <Col>
                                <img
                                    className="d-block w-100"
                                    src="https://www.cbc.ca/kids/images/connect4_play.jpg"
                                    alt="First slide"
                                    height={200}
                                    width={200}
                                />
                            </Col>
                            <Col>
                            <img
                                    className="d-block w-100"
                                    src="https://images.pexels.com/photos/814133/pexels-photo-814133.jpeg?cs=srgb&dl=pexels-sk-814133.jpg&fm=jpg"
                                    alt="First slide"
                                    height={200}
                                    width={200}
                                />
                            </Col>
                            <Col>   
                            <img
                                    className="d-block w-100"
                                    src="https://styles.redditmedia.com/t5_2shcp/styles/communityIcon_paxh2f8erwg61.jpg"
                                    alt="First slide"
                                    height={200}
                                    width={200}
                                />
                            </Col>
                        </Row>
                    </Container>
                </Col>
            </Row>
        </div>
    );
}