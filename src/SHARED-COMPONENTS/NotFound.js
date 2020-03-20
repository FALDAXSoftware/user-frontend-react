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
    this.setState({ loader: false });
    window.location.href =
      API_URL + (localStorage["i18nextLng"] &&
      localStorage["i18nextLng"] !== "en"
        ? "/" + localStorage["i18nextLng"]
        : "" )+ "/page-not-found/";
  }
  render() {
    return <div> {this.state.loader == true ? <FaldaxLoader /> : ""}</div>;
  }
}

export default NotFound;
