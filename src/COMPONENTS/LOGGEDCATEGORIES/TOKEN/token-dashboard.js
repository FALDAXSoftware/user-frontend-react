import React from "react";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import {
  TokDashboardWrap,
  TokSideBar,
  TokRightContentWrap
} from "../../../STYLED-COMPONENTS/TOKEN/tokenStyle";

class TokenDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
  }

  componentDidMount() {
    this.setState({
      loader: false
    });
  }

  render() {
    return (
      <div>
        <LoggedNavigation />
        <TokDashboardWrap>
          <TokSideBar>
            <ul>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Dashboard</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Purchase</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Redeem</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Send</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Request</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Convert</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-cog"></i>
                  <span className="content">Settings</span>
                </span>
              </li>
            </ul>
          </TokSideBar>
          <TokRightContentWrap>Test Right</TokRightContentWrap>
        </TokDashboardWrap>
        <CommonFooter />
        {this.state.loader ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

export default TokenDashboard;
