import { Link, withRouter } from "react-router-dom";

import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../store/actions/auth";

class Navbar extends Component {
  render() {
    return (
      <div>
        <div className="topnav col-12 md-5">
          <Link to="/">Bed Tracking App</Link>
          <Link to="/pie">Visualize</Link>
          <Link className="admin" to="/admin">
            
            Admin
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(actions.logout()),
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Navbar));
