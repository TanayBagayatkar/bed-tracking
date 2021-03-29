
import React from 'react';
import { Row, Col, InputGroup, FormControl, FormLabel, Button} from 'react-bootstrap';
import * as hospi from '../../data/data.json';

function UpdateData(props) {
    return (
        <div className="updatedata">
        <Row  style={{ padding: '10px 10px 0 0' }}>
            <Col lg={2} sm={12} >
                <FormLabel><h5>Occupied</h5></FormLabel>
            </Col>
            <Col lg={10} sm={12}>
                <InputGroup >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{hospi.hospitals[1].properties.occupied_beds}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Change number of occupied beds"
                aria-label="Username"
                aria-describedby="basic-addon1"
                />
                </InputGroup>
            </Col>

        </Row>
        <Row  style={{ padding: '10px 10px 0 0' }}>
            <Col lg={2} sm={12} >
                <FormLabel><h5>Special</h5></FormLabel>
            </Col>
            <Col lg={10} sm={12}>
                <InputGroup >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{hospi.hospitals[1].properties.occupied_beds}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Change number of special beds"
                aria-label="special"
                aria-describedby="basic-addon1"
                />
                </InputGroup>
            </Col>

        </Row>
        <Row  style={{ padding: '10px 10px 0 0' }}>
            <Col lg={2} sm={12} >
                <FormLabel><h5>Vacant</h5></FormLabel>
            </Col>
            <Col lg={10} sm={12}>
                <InputGroup >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{hospi.hospitals[1].properties.vacant_beds}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Change number of vacant beds"
                aria-label="vacant"
                aria-describedby="basic-addon1"
                />
                </InputGroup>
            </Col>

        </Row>
        <Row  style={{ padding: '10px 10px 0 0' }}>
            <Col lg={2} sm={12} >
                <FormLabel><h5>Total</h5></FormLabel>
            </Col>
            <Col lg={10} sm={12}>
                <InputGroup >
                <InputGroup.Prepend>
                <InputGroup.Text id="basic-addon1">{hospi.hospitals[1].properties.total_beds}</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                placeholder="Change number of total beds"
                aria-label="total"
                aria-describedby="basic-addon1"
                />
                </InputGroup>
            </Col>

        </Row>
        <Row>
            <Col>
                <Button variant="primary" type="submit">
                    Update
                </Button>
            </Col>
        </Row>
        </div>
            
       
     
        

     
    );
}

export default UpdateData ;