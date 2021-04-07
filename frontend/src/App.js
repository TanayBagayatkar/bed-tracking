import MapWindow from "./component/mapwindow";
import Navbar from "./component/navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import BarChart from "./component/BarChart";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Admin from "./component/adminview/Admin";
import { Component } from "react";



import { connect } from "react-redux";
import Signin from "./component/SigninComponent";

class App extends Component {
  componentDidMount() {}
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/pie" component={BarChart}></Route>
          <Route path="/admin" component={Admin}></Route>
          <Route path="/login" component={Signin}></Route>
          <Route path="/" component={MapWindow} exact></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.token !== null,
  };
};

export default connect(mapStateToProps)(App);
