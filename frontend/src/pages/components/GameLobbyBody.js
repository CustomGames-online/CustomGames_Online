import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

import Games from '../../App.js';

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
                        <Games />
                    </Container>
                </Col>
            </Row>
        </div>
    );
}