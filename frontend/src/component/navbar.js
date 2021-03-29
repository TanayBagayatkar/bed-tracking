import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (
        <div className="topnav col-12 md-5">
            
            <Link to="/">Bed Tracking App</Link>
            <Link to="/pie">Visualize</Link>
            <Link className="admin" to="/admin">Admin</Link>

           
        </div>
        
    );
}

export default Navbar;