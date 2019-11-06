import React, { Component } from "react";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { globalVariables } from "Globals.js";

let API_URL = globalVariables.WordpressSiteURL;

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { ...props };
    this.state = {
      loader: true
    };
  }
  componentWillMount() {
    window.location = API_URL + "/page-not-found/";
    this.setState({ loader: false });
  }
  render() {
    return <div> {this.state.loader == true ? <FaldaxLoader /> : ""}</div>;
  }
}

export default NotFound;
