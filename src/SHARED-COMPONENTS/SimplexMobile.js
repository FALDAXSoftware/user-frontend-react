import React from "react";
/*Components  */
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import { globalVariables } from "Globals.js";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import SimpleReactValidator from "simple-react-validator";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { browserHistory } from "react-router-dom";

import { Col, Row, notification } from "antd";

/* STYLED-COMPONENTS */
import {
  ConversionWrap,
  ConversionContainer,
  BorderRow,
  RowTitle,
  ConversionInput,
  ConversionDropDown,
  DropDownOption,
  DropIcon,
  ConversionSubmitBtn,
  SimRightCol,
  SimMainRow,
  SimLeftCol,
  SimLastRow
} from "../STYLED-COMPONENTS/CONVERSION/tradeCalcStyle";

import {
  // SimRightCol,
  // SimMainRow,
  // SimLeftCol,
  SimHead,
  SimSubHead,
  // SimLastRow,
  SimTopHead
} from "../STYLED-COMPONENTS/SIMPLEX/simplexStyle";

const API_URL = globalVariables.API_URL;
const TRADE_URL = globalVariables.TRADE_URL;
const _AMAZONBUCKET = globalVariables._AMAZONBUCKET;

class SimplexMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      response: null
    };
  }

  componentDidMount() {
    console.log("tets^^^", this.props.location);
    var str = this.props.location.search;
    var res = str.split("?");
    var params = res[1];
    var singleparam = params.split("&");
    console.log("tets^^^", singleparam);
    let temp = [];
    singleparam.map(function(index, value) {
      var key = index.split("=");
      let paramater_name = key[0];
      let paramater_value = key[1];
      console.log("Test^^^", paramater_value);
      temp[`${paramater_name}`] = paramater_value;
      //   console.log("temp^^^", temp);
      return;
    });
    this.setState(
      {
        response: temp
      },
      () => {
        let myObj = this.state.response;
        Object.size = function(obj) {
          var size = 0,
            key;
          for (key in obj) {
            if (obj.hasOwnProperty(key)) size++;
          }
          return size;
        };
        // Get the size of an object
        var size = Object.size(myObj);
        function checkProperties(obj) {
          for (var key in obj) {
            if (obj[key] == null || obj[key] == "" || obj[key] == undefined) {
              return false;
            }
          }
          return true;
        }
        console.log("checkProperties(obj)^^^^", checkProperties(myObj));
        var checkObj = checkProperties(myObj);
        if (this.state.response && size == 15 && checkObj) {
          document.getElementById("frm_sumbit").click();
        } else {
          alert("Not valid");
          this.props.history.push("/");
        }
      }
    );
  }

  openNotificationWithIcon(type, head, desc) {
    notification[type]({
      message: head,
      description: desc
    });
  }
  render() {
    return (
      <div>
        {this.state.response && (
          <form
            id="payment_form"
            action={this.state.response.action}
            method="POST"
            target="_self"
          >
            {/* {console.log(this.state.version)} */}
            <input
              required
              type="text"
              name="version"
              value={this.state.response.version}
            />
            <input
              required
              type="text"
              name="partner"
              value={this.state.response.partner}
            />
            <input
              required
              type="text"
              name="payment_flow_type"
              value={this.state.response.payment_flow_type}
            />
            <input
              required
              type="text"
              name="return_url_success"
              value={this.state.response.return_url_success}
            />
            <input
              required
              type="text"
              name="return_url_fail"
              value={this.state.response.return_url_fail}
            />
            <input
              required
              type="text"
              name="quote_id"
              value={this.state.response.quote_id}
            />
            <input
              required
              type="text"
              name="payment_id"
              value={this.state.response.payment_id}
            />
            <input
              required
              type="text"
              name="user_id"
              value={this.state.response.user_id}
            />
            <input
              required
              type="text"
              name="destination_wallet[address]"
              value={this.state.response.destination_wallet_address}
            />
            <input
              required
              type="text"
              name="destination_wallet[currency]"
              value={this.state.response.destination_wallet_currency}
            />
            <input
              required
              type="text"
              name="fiat_total_amount[amount]"
              value={this.state.response.fiat_total_amount_amount}
            />
            <input
              required
              type="text"
              name="fiat_total_amount[currency]"
              value={this.state.response.fiat_total_amount_currency}
            />
            <input
              required
              type="text"
              name="digital_total_amount[amount]"
              value={this.state.response.digital_total_amount_amount}
            />
            <input
              required
              type="text"
              name="digital_total_amount[currency]"
              value={this.state.response.digital_total_amount_currency}
            />
            <button id="frm_sumbit" type="submit">
              Submit
            </button>
          </form>
        )}
      </div>
    );
  }
}

// export default Conversion;
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    theme: state.themeReducer.theme !== undefined ? false : "",
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(withRouter(SimplexMobile));
