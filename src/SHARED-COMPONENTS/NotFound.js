import React, { Component } from "react";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Link } from "react-router-dom";
import { globalVariables } from "Globals.js";

let API_URL = globalVariables.API_URL;

class NotFound extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    document.getElementById("front").click();
  }
  render() {
    return (
      <div>
        <a
          id="front"
          href={`${globalVariables.WordpressSiteURL}/token-coming-soon`}
        >
          test
        </a>
      </div>
    );
  }
}

export default NotFound;
