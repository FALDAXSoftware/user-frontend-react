/* In-built Packages */
import React from "react";
import "antd/dist/antd.css";
import styled from "styled-components";

/*Import Components*/
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { TierWrapper } from "./tier_one";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

/* Styled-Components */
const KYCWrap = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  margin: auto;
  width: 95%;
  border-radius: 7px;
  padding: 50px 0;
`;

class TierFour extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentWillMount() {
    if (this.props.profileDetails) {
      if (this.props.profileDetails.account_tier == 4) {
        this.props.history.push("/tier4");
      } else {
        this.props.history.push("/");
      }
    }
  }
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navigation />
        <TierWrapper>
          <KYCWrap>Tier4</KYCWrap>
        </TierWrapper>
        <FooterHome />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  // LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});
// export default Conversion;
function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data !== undefined
          ? state.simpleReducer.profileDetails.data[0]
          : ""
        : "",
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TierFour));
