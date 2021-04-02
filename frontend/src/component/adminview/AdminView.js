import React from "react";
import { Col, Row } from "react-bootstrap";
import HospitalData from "./HospitalData";
import UpdateData from "./UpdateData";

function AdminView(props) {
  return (
    <Row className="adminview">
      <Col sm={12} md={6}>
        <HospitalData />
      </Col>

      <Col sm={12} md={6}>
        <UpdateData />
      </Col>
    </Row>
  );
}

export default AdminView;
