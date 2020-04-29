import React from "react";
import { withRouter } from "react-router-dom";
import styled from "styled-components";

export const FormValueDisplay = styled.form`
  display: none;
`;
const NoteDiv = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
`;
class SimplexMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      response: null
    };
  }

  componentDidMount() {
    var str = this.props.location.search;
    var res = str.split("?");
    var params = res[1];
    var singleparam = params.split("&");
    let temp = [];
    singleparam.map(function(index, value) {
      var key = index.split("=");
      let paramater_name = key[0];
      let paramater_value = key[1];
      temp[`${paramater_name}`] = paramater_value;
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
        var size = Object.size(myObj);
        function checkProperties(obj) {
          for (var key in obj) {
            if (obj[key] == null || obj[key] == "" || obj[key] == undefined) {
              return false;
            }
          }
          return true;
        }
        var checkObj = checkProperties(myObj);
        if (this.state.response && size == 15 && checkObj) {
          document.getElementById("frm_sumbit").click();
        } else {
          this.props.history.push("/");
        }
      }
    );
  }

  render() {
    return (
      <div>
        {this.state.response && (
          <div>
            <NoteDiv>Redirecting to Simplex...</NoteDiv>
            <FormValueDisplay
              id="payment_form"
              action={this.state.response.action}
              method="POST"
              target="_self"
            >
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
            </FormValueDisplay>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(SimplexMobile);
