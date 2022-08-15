import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';

import Games from '../../App.js';

import './../../styling/GeneralStyling.css'


export default function GameLobbyBody() {

    const [show, setShow] = useState(false);
    const [showFriend, setShowFriend] = useState(false);
    const [friendAddFailed, setfriendAddFailed] = useState(false);
    const [friendAdded, setFriendAdded] = useState(false);
    const [friendName, setFriendName] = useState('');

    
    var friends_ = [];

    const handleFriendAdd = (e) => {
        e.preventDefault();

        fetch('http://customgames.online/api_addfriend', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "email": localStorage.getItem('local_email'),
            "name": localStorage.getItem('local_name'),
            "other_name": friendName
        })
        })
        .then((res) => {
        return res.json();
        })
        .then((result) => {
        if( result['message'] === 'added_friend' ) {
            setFriendAdded(true);
            setfriendAddFailed(false);
        } else {
            setFriendAdded(false);
            setfriendAddFailed(true);
        }
        });

        
    }

    useEffect(() => {
        fetch('http://customgames.online/api_getfriends', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "email": localStorage.getItem('local_email')
            })
            })
            .then((res) => {
            return res.json();
            })
            .then((result) => {
                if( result['message'] === 'grabbed_friends' ) {
                    var tfriends_ = result['friends'];
                    for ( var i=0; i<tfriends_.length; i++) {
                        friends_.push(tfriends_[i]);
                    }
                    
                }   
            });
    })

    const names = [];
    console.log( friends_ );
    friends_.forEach((each) => {
        console.log(each)
        names.push(
            <Button variant="primary" onClick={() => setShowFriend(!(showFriend))}>
                {each}
            </Button> 
        )
    });

    console.log(names);

    return (
        <div className="gamelobby-body-div" >
            <Row className="gamelobby-body-div-row-one" >
                <Col sm={2} className="gamelobby-body-div-row-one-col-one" >
                    <Container className="gamelobby-body-div-row-one-col-one-container">
                        <h3>Friends List</h3>
                        <ListGroup variant="flush" className="gamelobby-body-div-row-one-col-one-container-listgroup">
                            {names}
                        </ListGroup>
                        { showFriend && (
                            <Modal show={showFriend} onHide={() => setShowFriend(!(showFriend))} className="loginpage-body-container-row-one-col-one-modal">
                                <Modal.Header closeButton />
                                <Modal.Body>
                                    John Doe
                                </Modal.Body>
                                <Modal.Footer>
                                <Button variant="secondary" onClick={() => setShowFriend(!(showFriend))}>
                                    Close
                                </Button>
                                </Modal.Footer>
                            </Modal>
                        )}
                        
                        <Button variant="primary" onClick={() => setShow(!(show))}>
                            Add Friend
                        </Button>
                        <Modal show={show} onHide={() => setShow(!(show))} className="loginpage-body-container-row-one-col-one-modal">
                            <Modal.Header closeButton>
                            <Modal.Title>Add Friend</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                            <Form className="loginpage-body-container-row-one-col-two-form" as="form" onSubmit={handleFriendAdd}  >
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Person's Name</Form.Label>
                                <Form.Control type="name" name="name" placeholder="Enter name" as='input' onChange = {(e) => setFriendName(e.target.value)} value = {friendName}/>
                                </Form.Group>
                                <Button variant="primary" type="submit" as='button'>
                                    Add Friend
                                </Button>
                            </Form>
                            {friendAdded && (
                                <p>Successfully Added</p>
                            )}
                            {friendAddFailed && (
                                <p>Couldn't Find Person</p>
                            )}
                            </Modal.Body>
                            <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShow(!(show))}>
                                Close
                            </Button>
                            </Modal.Footer>
                        </Modal>
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