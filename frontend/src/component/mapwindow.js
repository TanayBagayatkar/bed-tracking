import React, {  useState } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import * as hospi from '../data/data.json';

import Button from "react-bootstrap/Button";
import Badge from 'react-bootstrap/Badge'
import {  Card, ListGroup } from 'react-bootstrap';
import {Telephone} from "react-bootstrap-icons";
  
function MapWindow(props) {
    const [viewport, setViewport] = useState({
        latitude:19.1172495,
        longitude:72.833968,
        zoom:14,
        width:"100%",
        height:"100vh"
    });
    
    const onMapLoad = (map) => { 
    
        navigator.geolocation.getCurrentPosition(successLocation, errroLocation, {enableHighAccuracy:true});

    };

   

    const successLocation = (position) => {
        console.log(position);
    };

    const errroLocation = (err) => {
        console.log(err.message);
    };
    
    const [selectedHospi, setSelectedHospi] = useState(null);

   

    const apik ="pk.eyJ1IjoidGFuYXliYWdheWF0a2FyIiwiYSI6ImNrbWVyazA1ODJ4eGUyb3AxbGl6eTdiODcifQ.xIeXNH630rWCTM_0u1CFHQ";
    return (
        
        <div className="map-data">
            
            <ReactMapGl {...viewport} mapboxApiAccessToken={apik}
            mapStyle= 'mapbox://styles/mapbox/light-v10'
            
            onViewportChange={viewport=>{
                setViewport(viewport);
            }}
            onLoad={onMapLoad}
            
            >
                
               {hospi.hospitals.map((loci)=>(
                   <Marker 
                   key={loci.properties._id} 
                   latitude={loci.geometry.coordinates[0]}
                   longitude={loci.geometry.coordinates[1]}>
                       <button className="marker-btn" onClick={(e)=>{
                           e.preventDefault();
                           setSelectedHospi(loci);
                       }}>
                           <img src="/logo.png" alt="hospital icon"/>
                       </button>
                   </Marker>
               ))}
               {selectedHospi?(
                   <Popup 
                   latitude={selectedHospi.geometry.coordinates[0]}
                   longitude={selectedHospi.geometry.coordinates[1]}
                   onClose={()=>{
                       setSelectedHospi(null);
                   }}>
                       {/* Old view */}
                       {/* <div className="">
                           <div className="sidebar">
                           <h4>{selectedHospi.properties.name}</h4>
                           </div>
                          
                          <p className="total">Total Beds: {selectedHospi.properties.total_beds}</p>
                          <p className="vacant">Vacant Beds: {selectedHospi.properties.vacant_beds}</p>
                          <p className="contact">Contact: {selectedHospi.properties.contact}</p>
                         
                          <div className="status">
                          Last updated: {selectedHospi.properties.timestamp}
                          </div>

                       </div> */}

                       {/* New View: */}
                       <Card>
                        <Card.Header style={{ overflow: "hidden"}}>
                            <h4>{selectedHospi.properties.name}<Button variant="outline-primary" style={{right:"0", padding:"5px", float:"right"}}><a href={'tel:'+{...selectedHospi.properties.contact}}><Telephone /></a></Button></h4>
                            
                        </Card.Header>
                        
                        <ListGroup.Item variant="danger" style={{ fontWeight:"600", color:"#333333",textAlign:"center",fontSize:"large"}}> Last updated: <Badge variant="danger">{selectedHospi.properties.timestamp}</Badge></ListGroup.Item>
                        <ListGroup  horizontal variant="primary">
                            <ListGroup.Item variant="warning" style={{ fontWeight:"600",textAlign:"center",fontSize:"large"}}>Occupied Beds: <Badge variant="warning">{selectedHospi.properties.occupied_beds}</Badge></ListGroup.Item>
                            <ListGroup.Item variant="secondary" style={{ fontWeight:"600",textAlign:"center",fontSize:"large"}}>Special Beds: <Badge variant="secondary">{selectedHospi.properties.occupied_beds}</Badge></ListGroup.Item>
                            <ListGroup.Item variant="success" style={{ fontWeight:"600",textAlign:"center",fontSize:"large"}}>Vacant Beds: <Badge variant="success">{selectedHospi.properties.vacant_beds}</Badge></ListGroup.Item>
                        </ListGroup>
                        <ListGroup.Item variant="primary" style={{fontWeight:"600",textAlign:"center",fontSize:"large"}}>Total Beds: <Badge variant="primary">{selectedHospi.properties.total_beds}</Badge></ListGroup.Item>
                       
                        </Card>
                   </Popup>
               ):null}
               
            </ReactMapGl>
            
        </div>
        
    
    );
}

export default MapWindow;