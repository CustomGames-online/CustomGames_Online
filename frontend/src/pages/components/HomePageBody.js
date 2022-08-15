import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Carousel from 'react-bootstrap/Carousel';
import Button from 'react-bootstrap/Button';


import './../../styling/GeneralStyling.css';

export default function HomePageBody(props) {

    return(
        <Container className="homepage-body-container" >
            <Row className="homepage-body-container-row-one"  >
                <Col className="homepage-body-container-row-one-col" >
                <Carousel className="homepage-body-container-row-one-col-carousel" >
                    <Carousel.Item>
                        <a href="/login">
                            <img
                            className="d-block w-100"
                            src="/chessboard_image.svg"
                            alt="First slide"
                            height={700}
                            />
                            <Carousel.Caption className="homepage-body-container-row-one-col-carousel-caption">
                                <h1>Play Chess!</h1>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/login">
                            <img
                            className="d-block w-100"
                            src="/checkers_image.svg"
                            alt="First slide"
                            height={700}
                            />
                            <Carousel.Caption className="homepage-body-container-row-one-col-carousel-caption">
                                <h1>Play Checkers!</h1>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                    <Carousel.Item>
                        <a href="/login">
                            <img
                            className="d-block w-100"
                            src="/connect4_image.svg"
                            alt="First slide"
                            height={700}
                            />
                            <Carousel.Caption className="homepage-body-container-row-one-col-carousel-caption">
                                <h1>Play connect4!</h1>
                            </Carousel.Caption>
                        </a>
                    </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className="homepage-body-container-row-two" >
                <Col className="homepage-body-container-row-two-col" >
                    <h1>Custom Games, In One Place</h1>
                    <p>
                        Our selection of Card Games, Board Games, Mahjong Games, and Casino Games is the best of the best.<br /> 
                        Instantly play games at Custom Games! 
                        All of our classic games are 100% free, all day, every day!
                    </p>
                    { props.loggedin === true && (
                        <Button className="homepage-body-continer-row-two-col-button" variant="primary" as="a" href="/gamelobby"><p>Jump Into It</p></Button>
                    )}
                    { props.loggedin === false && (
                        <Button className="homepage-body-continer-row-two-col-button" variant="primary" as="a" href="/signup">Sign Up!</Button>
                    )}  
                    
                </Col>
            </Row>
        </Container>
    );
}