import Loader from "react-loader-spinner";
import React from "react";
import styled from "styled-components";

const LoaderDiv = styled.div`
  background-color: ${(props) =>
    props.theme.mode === "dark" ? "#041b2c" : "white"};
  height: 100%;
  top: 0;
  position: absolute;
  width: 100%;
  z-index: 4;
  > div {
    display: flex;
    height: 100%;
    justify-content: center;
    align-items: center;
  }
`;
export default class App extends React.Component {
  //other logic
  render() {
    return (
      <LoaderDiv>
        <Loader
          type="Triangle"
          color={this.props.color}
          height={this.props.height}
          width={this.props.width}
        />
      </LoaderDiv>
    );
  }
}
