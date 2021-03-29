import React from 'react';
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import * as hospi from '../../data/data.json';

function HospitalData(props) {
    return (
        <div>
            <Alert variant="success">
                <Alert.Heading>Welcome {hospi.hospitals[1].properties.name} </Alert.Heading>
                <p>
                    Here admin of hospital can see and edit their beds data
                </p>
                <hr />
                <p className="mb-0">
                    Please update your data regularly!
                    This will avoid notification reminder
                </p>
            </Alert>
            <Card>
                <Card.Header as="h5">
                
                    {hospi.hospitals[1].properties.name}
                    
                </Card.Header>
                <Card.Body>
                    <Card.Title>Last updated: {hospi.hospitals[1].properties.timestamp}</Card.Title>
                    <Card.Text>
                    Update your data if any changes
                    </Card.Text>
                    <Button variant="secondary">Go somewhere</Button>
                </Card.Body>
            </Card>
            <Card
                bg="light"
               
                text="dark"
                style={{ width: '100%' }}
                className="mb-2"
            >
                
                <Card.Header>Current data</Card.Header>
                <Card.Body>
                
                <Card.Text>
                    Below data show number of Beds
                </Card.Text>

                <Row>

                    <Col sm={12} md={6} lg={4}>
                        <ListGroup horizontal>
                        <ListGroup.Item variant="info">Occupied </ListGroup.Item>
                        <ListGroup.Item variant="secondary">{hospi.hospitals[1].properties.occupied_beds}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={12} md={6} lg={4}>
                        <ListGroup horizontal>
                        <ListGroup.Item variant="info">Special </ListGroup.Item>
                        {/* change special beds later */}
                        <ListGroup.Item variant="warning">{hospi.hospitals[1].properties.total_beds}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                    <Col sm={12} md={6} lg={4} >
                        <ListGroup horizontal >
                        <ListGroup.Item variant="info">Vaccant </ListGroup.Item>
                        <ListGroup.Item variant="success">{hospi.hospitals[1].properties.vacant_beds}</ListGroup.Item>
                        </ListGroup>
                    </Col>

                </Row>
                <br></br>
                <Row sm={12} md={12} lg={12} >
                    <Col sm={12} md={6} lg={4}>
                        <ListGroup horizontal='lg'>
                            <ListGroup.Item variant="info">Total</ListGroup.Item>
                            <ListGroup.Item variant="light">{hospi.hospitals[1].properties.total_beds}</ListGroup.Item>
                        </ListGroup>
                    </Col>
                </Row>
                    

                
               
               
                </Card.Body>
               
            </Card>

            
        </div>
    );
}

export default HospitalData;