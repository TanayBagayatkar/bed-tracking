import axios from "axios";
import React, { Component } from "react";
import { Button, Card, Col, ListGroup, Row } from "react-bootstrap";
import Alert from "react-bootstrap/Alert";

import { connect } from "react-redux";

class HospitalData extends Component {
  state = {
    total: null,
    occupied: null,
    vacant: null,
    special: null,
    last_updated: null,
  };

  componentDidMount() {
    let data;
    let id=this.props.id;

    let token = this.props.token;
    
    axios
      .get(`http://127.0.0.1:8000/api/hospitals/${id}/update-bed-info/`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        data = res.data;
        this.setState({ total: data.total_bed_capacity });
        let vacant = this.state.total - this.state.occupied;
        this.setState({ occupied: data.current_bed_capacity });
        this.setState({ vacant: vacant });
        this.setState({ special: data.speciality_beds.length });
        this.setState({last_updated: data.last_updated});
        // console.log("cust_id:",this.props.id);
      });
  }

  componentDidUpdate() {
    console.log(this.props.to_update);
    if (this.props.to_update){
      let data;
      let id=this.props.id;
  
      let token = this.props.token;
      
      axios
        .get(`http://127.0.0.1:8000/api/hospitals/${id}/update-bed-info/`, {
          headers: {
            Authorization: "Token " + token,
          },
        })
        .then((res) => {
          data = res.data;
          this.setState({ total: data.total_bed_capacity });
          this.setState({ occupied: data.current_bed_capacity });
          let vacant = this.state.total - this.state.occupied;
          this.setState({ vacant: vacant });
          this.setState({ special: data.speciality_beds.length });
          this.setState({
            last_updated: new Date(
                data.last_updated.split("T").join(" ")
              ).toLocaleString(),
          });
          // console.log("cust_id:",this.props.id);
        })
        .catch(err => {
          console.log('Error in updating');
        });
      this.props.changeToUpdate();
    }

  }

  render() {
    return (
      <div>
        <Alert variant="success">
          <Alert.Heading>
            Welcome {this.props.un}!{" "}
          </Alert.Heading>
          <p>Here admin of hospital can see and edit their beds data</p>
          <hr />
          <p classtotal="mb-0">
            Please update your data regularly! This will avoid notification
            reminder
          </p>
        </Alert>
        <Card>
          <Card.Header as="h5">
            {/* {hospi.hospitals[1].properties.total} */}
            {this.props.un}
          </Card.Header>
          <Card.Body>
            <Card.Title>Last updated: {this.state.last_updated}</Card.Title>
            <Card.Text>If updates are not visible contact developers</Card.Text>
            <Button variant="light">
              <a style={{ textDecoration: "none" }} href="tel:1234567890">
                Contact Developers
              </a>
            </Button>
          </Card.Body>
        </Card>
        <Card
          bg="light"
          text="dark"
          style={{ width: "100%" }}
          classtotal="mb-2"
        >
          <Card.Header>Current data</Card.Header>
          <Card.Body>
            <Card.Text>Below data show number of Beds</Card.Text>

            <Row>
              <Col sm={12} md={6} lg={4}>
                <ListGroup horizontal>
                  <ListGroup.Item variant="info">Occupied </ListGroup.Item>
                  <ListGroup.Item variant="secondary">
                    {this.state.occupied}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ListGroup horizontal>
                  <ListGroup.Item variant="info">Special </ListGroup.Item>
                  {/* change special beds later */}
                  {/* Done */}
                  <ListGroup.Item variant="warning">
                    {this.state.special}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
              <Col sm={12} md={6} lg={4}>
                <ListGroup horizontal>
                  <ListGroup.Item variant="info">Vaccant </ListGroup.Item>
                  <ListGroup.Item variant="success">
                    {this.state.vacant}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <br></br>
            <Row sm={12} md={12} lg={12}>
              <Col sm={12} md={6} lg={4}>
                <ListGroup horizontal="lg">
                  <ListGroup.Item variant="info">Total</ListGroup.Item>
                  <ListGroup.Item variant="light">
                    {this.state.total}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    un:state.username,
    id:state.customer_id,
  };
};

export default connect(mapStateToProps)(HospitalData);
// export default HospitalData;
