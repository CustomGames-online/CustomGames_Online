import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './../../styling/GeneralStyling.css';

export default function HomePageHeader() {
    return(
        <div className="homepage-header-div" >
                <Row className="homepage-header-div-row-one" >
                    <Col className="homepage-header-div-row-one-col" >
                        <img src='/custom_games_logo.svg' alt="logo"/>
                    </Col>
                </Row>

        </div>        
    );
}