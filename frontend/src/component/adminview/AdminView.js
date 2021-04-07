import React, { Component } from "react";
import { Col, Row } from "react-bootstrap";
import HospitalData from "./HospitalData";
import UpdateData from "./UpdateData";

class AdminView extends Component {
  state = {
    to_update: false,
  }

  resetToUpdateState = () => {
    this.setState({to_update: false});
  }

  setToUpdateState = () => {
    this.setState({to_update: true});
  }

  render() {
    return (
    <Row className="adminview">
      <Col sm={12} md={6}>
        <HospitalData to_update={this.state.to_update} changeToUpdate={this.resetToUpdateState} />
      </Col>

      <Col sm={12} md={6}>
        <UpdateData to_update={this.state.to_update} changeToUpdate={this.setToUpdateState} />
      </Col>
    </Row>
    )
  };
}

export default AdminView;
