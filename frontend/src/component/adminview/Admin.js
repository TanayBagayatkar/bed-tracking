import React from "react";
import AdminView from "./AdminView";

import { connect } from "react-redux";


import  { Component } from 'react';
import { Redirect } from "react-router-dom";

class Admin extends Component {

  render() {
    return (
      this.props.isAuthenticated ? 
      <div>
        <AdminView/>
      </div>
      :
      <Redirect to='/login'/>
    );
  }
}

// export default Admin;

const mapStateToProps = state => {
	return {
		isAuthenticated: state.token !== null,
	};
};

export default connect(mapStateToProps)(Admin);
