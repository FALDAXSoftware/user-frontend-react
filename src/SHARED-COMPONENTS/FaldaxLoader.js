import React, { Component } from 'react';
import { Spin_Ex, SpinImg, SpinDiv } from "../STYLED-COMPONENTS/HOMEPAGE/style"
import styled from 'styled-components';
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
            <Spin_Ex className="Ex_spin">
                <SpinDiv >
                    {
                        this.state.theme == true ?
                            <SpinImg src="/images/darkLoader.gif" /> :
                            <SpinImg src="/images/lightLoader.gif" />
                    }
                </SpinDiv>
            </Spin_Ex>
        );
    }
}

function mapStateToProps(state) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    })
}

export default connect(mapStateToProps)(FaldaxLoader);