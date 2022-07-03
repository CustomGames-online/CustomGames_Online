import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';

import './../../styling/HomePageStyling.css';

import CheckersImage from './../../assets/checkers_img.jpg';

export default function HomePageBody() {
    return(
        <Container className='homepage-body-container'>
            <Carousel>
                <Carousel.Item>
                    <img
                    className="d-block w-100"
                    src={CheckersImage}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h1 className='carousel-title'>Play Checkers!</h1>
                    </Carousel.Caption>
                </Carousel.Item>
            </Carousel> 
        </Container>
    );
}