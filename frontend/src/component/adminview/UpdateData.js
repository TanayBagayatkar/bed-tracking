import React, { Component } from "react";
import {
  Row,
  Col,
  InputGroup,
  FormControl,
  FormLabel,
  Button,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { CircularProgress } from "@material-ui/core";

import * as actions from "../../store/actions/auth";
import { connect } from "react-redux";

class UpdateData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      total: null,
      occupied: null,
      vacant: null,
      special: null,
      last_updated: "",
      new_occupied: "",
      new_special: "",
      new_total: "",
      speciality_beds: null,
      loading: false,
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  logout = () => {
    this.props.logout(this.props.token);
  };

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;
    this.setState({ [name]: event.target.value });
    // this.setState({new_special: event.target.value});
    // this.setState({new_total: event.target.value});
  }

  handleSubmit(event) {
    // alert('New occupied  was submitted: ' + this.state.new_occupied);
    let id = this.props.id;
    let token = this.props.token;
    if (
      this.state.new_occupied ||
      this.state.new_occupied ||
      this.state.new_total
    ) {
      console.log(this.state.new_occupied);
      console.log(this.state.new_special);
      console.log(this.state.new_total);
      console.log(id,token);
      this.setState({
        new_occupied: "",
        new_special: "",
        new_total: "",
        loading: true,
      });
      axios.put(`http://127.0.0.1:8000/api/hospitals/${id}/update-bed-info/`,{
        id: id,
        total_bed_capacity: this.state.new_total ? this.state.new_total : this.state.total,
        current_bed_capacity: this.state.new_occupied ? this.state.new_occupied : this.state.occupied,
        speciality_beds: this.state.speciality_beds,
        last_updated: this.state.last_updated,
      },{
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then( response => {
        console.log(response)
        console.log('data updation done');
        let data = response.data;
        this.setState({ total: data.total_bed_capacity });
        this.setState({ occupied: data.current_bed_capacity });
        let vacant = this.state.total - this.state.occupied;
        this.setState({ vacant: vacant });
        this.setState({ special: data.speciality_beds.length });
        this.setState({speciality_beds: data.speciality_beds});
        this.setState({last_updated: data.last_updated});
        this.props.changeToUpdate();
      })
      .catch(err => {
        console.log('Error in updating');
      })
      .finally(() => {
        this.setState({loading: false});
      })
    }

    event.preventDefault();
  }

  componentDidMount() {
    let data;
    let token = this.props.token;
    let id = this.props.id;
    axios
      .get(`http://127.0.0.1:8000/api/hospitals/${id}/update-bed-info/`, {
        headers: {
          Authorization: "Token " + token,
        },
      })
      .then((res) => {
        data = res.data;
        this.setState({ total: data.total_bed_capacity });
        this.setState({ occupied: data.current_bed_capacity });
        let vacant = this.state.total - this.state.occupied;
        this.setState({ vacant: vacant });
        this.setState({ special: data.speciality_beds.length });
        this.setState({speciality_beds: data.speciality_beds});
        // this.setState({lastupdated: data.speciality_beds[1].last_updated})
        // console.log(this.state.lastupdated);
      });
  }
  render() {
    return this.state.loading ? <CircularProgress /> : (
      <div className="updatedata">
        <Form onSubmit={this.handleSubmit}>
          <Row style={{ padding: "10px 10px 0 0" }}>
            <Col lg={2} sm={12}>
              <FormLabel>
                <h5>Occupied</h5>
              </FormLabel>
            </Col>
            <Col lg={10} sm={12}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {this.state.occupied}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Change number of occupied beds"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  name="new_occupied"
                  value={this.state.new_occupied}
                  onChange={this.handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row>
          {/* <Row style={{ padding: "10px 10px 0 0" }}>
            <Col lg={2} sm={12}>
              <FormLabel>
                <h5>Special</h5>
              </FormLabel>
            </Col>
            <Col lg={10} sm={12}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {this.state.special}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Change number of special beds"
                  aria-label="special"
                  aria-describedby="basic-addon1"
                  name="new_special"
                  value={this.state.new_special}
                  onChange={this.handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row> */}

          <Row style={{ padding: "10px 10px 0 0" }}>
            <Col lg={2} sm={12}>
              <FormLabel>
                <h5>Total</h5>
              </FormLabel>
            </Col>
            <Col lg={10} sm={12}>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    {this.state.total}
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                  placeholder="Change number of total beds"
                  aria-label="total"
                  aria-describedby="basic-addon1"
                  name="new_total"
                  value={this.state.new_total}
                  onChange={this.handleInputChange}
                />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button variant="primary" type="submit">
                Update
              </Button>{" "}
              <Button variant="primary" type="submit" onClick={this.logout}>
                Logout
              </Button>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    token: state.token,
    un: state.username,
    id: state.customer_id,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: (token) => dispatch(actions.authLogout(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateData);
// export default UpdateData;
