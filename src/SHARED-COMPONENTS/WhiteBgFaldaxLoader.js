import React from "react";
import { SpinEx, SpinImg, SpinDiv } from "../STYLED-COMPONENTS/HOMEPAGE/style";
import { connect } from "react-redux";
import styled from "styled-components";
const WhiteBgSpinEx = styled(SpinEx)`
  background-color: #f5f5f5;
  z-index: 999;
`
class WhiteBgFaldaxLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme !== "" ? this.props.theme : false
    };
  }
  render() {
    return (
      <WhiteBgSpinEx className="Ex_spin">
        <SpinDiv>
          {this.state.theme === true ? (
            <SpinImg src="/images/darkLoader.gif" />
          ) : (
              <SpinImg src="/images/lightLoader.gif" />
            )}
        </SpinDiv>
      </WhiteBgSpinEx>
    );
  }
}

function mapStateToProps(state) {
  return {
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default connect(mapStateToProps)(WhiteBgFaldaxLoader);
