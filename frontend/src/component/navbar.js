import React from 'react';
import { Link } from 'react-router-dom';

// import * as hospi from '../data/data.json';
function Navbar(props) {
    return (
        <div className="topnav">
            {/* <a className="active" href="/">Bed Tracking App</a>
            <a className="" href="/pie">Visualize</a>
            <a className="admin" href="/admin">Admin</a> */}
            <Link to="/">Bed Tracking App</Link>
            <Link to="/pie">Visualize</Link>
            <Link className="admin" to="/admin">Admin</Link>

           
        </div>
        
    );
}

export default Navbar;