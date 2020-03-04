import React from "react";
import { SpinEx, SpinImg, SpinDiv } from "../STYLED-COMPONENTS/HOMEPAGE/style";
import { connect } from "react-redux";

class FaldaxLoader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      theme: this.props.theme !== "" ? this.props.theme : false
    };
  }
  render() {
    return (
      <SpinEx className="Ex_spin">
        <SpinDiv>
          {this.state.theme === true ? (
            <SpinImg src="/images/darkLoader.gif" />
          ) : (
            <SpinImg src="/images/lightLoader.gif" />
          )}
        </SpinDiv>
      </SpinEx>
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

export default connect(mapStateToProps)(FaldaxLoader);
