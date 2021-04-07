import React, { useState } from "react";

import { Marker, Popup } from "react-map-gl";
import * as hospi from "../data/data.json";

import Button from "react-bootstrap/Button";
import Badge from "react-bootstrap/Badge";
import { Card, ListGroup } from "react-bootstrap";
import { Telephone } from "react-bootstrap-icons";
import axios from "axios";

function MapMarker(props) {
  const [selectedHospi, setSelectedHospi] = useState(null);
  const [name, setName] = useState(null);
  const [lastupdated, setLastupdated] = useState(null);
  const [occupied, setOccupied] = useState(null);
  const [vacant, setVacant] = useState(null);
  const [special, setSpecial] = useState(null);

  const [total_beds, settotal_beds] = useState(null);
  let data;
  const handleChange = (id) => {
    // console.log(id);
    axios
      .get(`http://127.0.0.1:8000/api/hospitals/${id}/`)
      .then((res) => {
        data = res.data;
        console.log(data);
        // console.log(data.total_bed_capacity);
        setName(data.name);
        setLastupdated(data.last_updated);
        setOccupied(data.current_bed_capacity);
        let vaca =
          Number(data.total_bed_capacity) - Number(data.current_bed_capacity);
        setVacant(vaca);
        settotal_beds(data.total_bed_capacity);
        setSpecial(data.speciality_beds.length);
      })
      .catch((err) => {});
  };
  // console.log(total_beds);

  return (
    <div>
      {hospi.hospitals.map((loci) => (
        <Marker
          key={loci.properties._id}
          latitude={loci.geometry.coordinates[0]}
          longitude={loci.geometry.coordinates[1]}
          // onClick={handleChange(loci.properties._id)}
        >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedHospi(loci);
              handleChange(loci.properties._id);
            }}
          >
            <img src="/logo.png" alt="hospital icon" />
          </button>
        </Marker>
      ))}
      {/* <Marker
      key={hospi.hospitals[1].properties._id}
      latitude={hospi.hospitals[1].geometry.coordinates[0]}
      longitude={hospi.hospitals[1].geometry.coordinates[1]}
      >
          <button
            className="marker-btn"
            onClick={(e) => {
              e.preventDefault();
              setSelectedHospi(hospi.hospitals[1]);
            }}
          >
            <img src="/logo.png" alt="hospital icon" />
          </button>
          

      </Marker> */}
      {selectedHospi ? (
        <Popup
          latitude={selectedHospi.geometry.coordinates[0]}
          longitude={selectedHospi.geometry.coordinates[1]}
          onClose={() => {
            setSelectedHospi(null);
          }}
        >
          <br />

          <Card>
            <Card.Header style={{ overflow: "hidden" }}>
              <h4>
                {name}
                <Button
                  variant="outline-primary"
                  style={{ right: "0", padding: "5px", float: "right" }}
                >
                  <a href={"tel:" + { ...selectedHospi.properties.contact }}>
                    <Telephone />
                  </a>
                </Button>
              </h4>
            </Card.Header>

            <ListGroup.Item
              variant="danger"
              style={{
                fontWeight: "600",
                color: "#333333",
                textAlign: "center",
                fontSize: "large",
              }}
            >
              {" "}
              Last updated: <Badge variant="danger">{lastupdated}</Badge>
            </ListGroup.Item>
            <ListGroup horizontal variant="primary">
              <ListGroup.Item
                variant="warning"
                style={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "large",
                }}
              >
                Occupied Beds: <Badge variant="warning">{occupied}</Badge>
              </ListGroup.Item>
              <ListGroup.Item
                variant="secondary"
                style={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "large",
                }}
              >
                Speciality Beds: <Badge variant="secondary">{special}</Badge>
              </ListGroup.Item>
              <ListGroup.Item
                variant="success"
                style={{
                  fontWeight: "600",
                  textAlign: "center",
                  fontSize: "large",
                }}
              >
                Vacant Beds: <Badge variant="success">{vacant}</Badge>
              </ListGroup.Item>
            </ListGroup>
            <ListGroup.Item
              variant="primary"
              style={{
                fontWeight: "600",
                textAlign: "center",
                fontSize: "large",
              }}
            >
              Total Beds: <Badge variant="primary">{total_beds}</Badge>
            </ListGroup.Item>
          </Card>
        </Popup>
      ) : null}
    </div>
  );
}

export default MapMarker;
