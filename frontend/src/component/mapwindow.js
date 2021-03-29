import React, {  useState } from 'react';
import ReactMapGl, { Marker, Popup } from 'react-map-gl';
import * as hospi from '../data/data.json';


  
function MapWindow(props) {
    const [viewport, setViewport] = useState({
        latitude:19.1172495,
        longitude:72.833968,
        zoom:14,
        width:"100%",
        height:"100vh"
    });
    
    const onMapLoad = (map) => { 
    
        
        // map.addControl(new NavigationControl(),'bottom-right');
        // map.addControl(new GeolocateControl());
        
        
        
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
        // <div>
        <div className="map-data">
            
            <ReactMapGl {...viewport} mapboxApiAccessToken={apik}
            mapStyle= 'mapbox://styles/mapbox/light-v10'
            
            onViewportChange={viewport=>{
                setViewport(viewport);
            }}
            // ref={ map => useRef() = map }
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
                       <div className="">
                           <div className="sidebar">
                           <h4>{selectedHospi.properties.name}</h4>
                           </div>
                          
                          <p className="total">Total Beds: {selectedHospi.properties.total_beds}</p>
                          <p className="vacant">Vacant Beds: {selectedHospi.properties.vacant_beds}</p>
                          <p className="contact">Contact: {selectedHospi.properties.contact}</p>
                         
                          <div className="status">
                          Last updated: {selectedHospi.properties.timestamp}
                          </div>

                       </div>
                   </Popup>
               ):null}
               
            </ReactMapGl>
            
        </div>
        
        // </div>
    );
}

export default MapWindow;