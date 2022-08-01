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
                        <img
                        className="d-block w-100"
                        src="https://image.shutterstock.com/image-illustration/illustration-nature-landscape-with-green-600w-371178437.jpg"
                        alt="First slide"
                        height={700}
                        />
                        <Carousel.Caption>
                            <h3>Play An Array Of Games!</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://image.shutterstock.com/shutterstock/photos/610968629/display_1500/stock-vector-chess-pieces-610968629.jpg"
                        alt="Second slide"
                        height={700}
                        />

                        <Carousel.Caption>
                            <h3>Play Chess</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                        <img
                        className="d-block w-100"
                        src="https://image.shutterstock.com/shutterstock/photos/657571975/display_1500/stock-vector-checkers-game-isolated-on-white-background-vector-illustration-657571975.jpg"
                        alt="Third slide"
                        height={700}
                        />
                        <Carousel.Caption>
                            <h3>Play Checkers</h3>
                        </Carousel.Caption>
                    </Carousel.Item>
                    </Carousel>
                </Col>
            </Row>
            <Row className="homepage-body-container-row-two" >
                <Col className="homepage-body-container-row-two-col" >
                    <h1>Custom Games, In One Place</h1>
                    <p>
                        Our selection of Card Games, Board Games, Mahjong Games, and Casino Games is the best of the best.<br /> 
                        Instantly play games at Custom Game Shack! 
                        All of our classic games are 100% free, all day, every day!
                    </p>
                    { props.loggedin === true && (
                        <Button className="homepage-body-continer-row-two-col-button" variant="primary" as="a" href="/gamelobby">Jump Into It</Button>
                    )}
                    { props.loggedin === false && (
                        <Button className="homepage-body-continer-row-two-col-button" variant="primary" as="a" href="/login">Sign Up!</Button>
                    )}  
                    
                </Col>
            </Row>
        </Container>
    );
}