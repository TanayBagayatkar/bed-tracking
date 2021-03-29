import React from 'react';
import { Link } from 'react-router-dom';

import * as hospi from '../data/data.json';

function Admin(props) {
    
    return (
        <div className="adminpage">
            <div className=" dropdown">
                <button className="dropbtn">Select Hospital</button>
                <div  className="dropdown-content">

                    {hospi.hospitals.map((hos)=>(
                         <Link key={hos.properties._id} to={hos.properties.src} ><h4>{hos.properties.name}</h4></Link>
                        
                    ))}
                   
                    
                </div>
                
            </div>
            <div className="col">
                <h2>Hospital data</h2>
            </div>
        </div>
    );
}

export default Admin;