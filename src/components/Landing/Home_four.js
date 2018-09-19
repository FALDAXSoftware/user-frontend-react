/* In-build packages */
import React, { Component } from "react"
import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
} from "react-simple-maps";
import { connect } from "react-redux";
import {
    Tooltip,
    actions,
} from "redux-tooltip";
import styled from 'styled-components';
import tooltip from 'wsdm-tooltip';

import { Row, Col } from 'antd';

/* Styled Components */
import { Section_3, Container } from './../../styled-components/homepage/style';
const { show, hide } = actions;
const tip = tooltip({
    styles: {
        "color": "#282528",
        "text-transform": 'uppercase',
        "font-family": 'Open Sans',
        'font-weight': 'bold',
        "font-size": "15px",
        "background-color": "white",
        "border-radius": "3px",
    },
});


/* Styled componets */
const ReactSimpleMapWrapper = styled.div`
  width: "100%",
  maxWidth: 980,
  margin: "0 auto",
  fontFamily: "Roboto, sans-serif",
  background-image: "-moz-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-webkit-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-ms-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
`;

const Forth_head = styled.div`
    margin-top: 55px;
    margin-bottom: 50px;
    text-align: center;
`;

const Forth_head_span = styled.span`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;

const Forth_head_p = styled.p`
    font-family: 'Open sans';
    font-size: 13px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
    margin-top: 15px;
`;

/* Component defination start here */
class Home_four extends Component {
    constructor() {
        super();
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }
    handleMove(geography, evt) {
        const x = evt.clientX;
        const y = evt.clientY + window.pageYOffset;
        this.props.dispatch(show({ origin: { x, y }, content: geography.properties.name }));
    }
    handleLeave() {
        this.props.dispatch(hide());
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tooltip && this.props.tooltip.show !== nextProps.tooltip.show) {
            if (this.props.tooltip.show === true) {
                tip.hide(nextProps.tooltip.content);
            } else {
                tip.show(nextProps.tooltip.content);
            }
        }
        if (nextProps.tooltip && nextProps.tooltip.origin && nextProps.tooltip.origin.x && nextProps.tooltip.origin.y) {
            tip.position({ pageX: nextProps.tooltip.origin.x, pageY: nextProps.tooltip.origin.y })
        }
    }
    render() {
        return (

            <Section_3>
                <Container>
                    <Row>
                        <Col>
                            <Forth_head>
                                <Forth_head_span> Exchange <b> World </b></Forth_head_span>
                                <Forth_head_p>Lorem ipsum dolor sir amet, consectertur adipiscing elit.</Forth_head_p>
                            </Forth_head>
                            <ReactSimpleMapWrapper>
                                <ComposableMap
                                    projectionConfig={{
                                        scale: 205,
                                        rotation: [-11, 0, 0],
                                    }}
                                    width={980}
                                    height={551}
                                    style={{
                                        width: "100%",
                                        height: "auto",
                                    }}
                                >
                                    <ZoomableGroup center={[0, 20]} disablePanning>
                                        <Geographies geography="/assets/world-50m.json">
                                            {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                                <Geography
                                                    key={i}
                                                    geography={geography}
                                                    projection={projection}
                                                    onMouseMove={this.handleMove}
                                                    onMouseLeave={this.handleLeave}
                                                    style={{
                                                        default: {
                                                            fill: "#ECEFF1",
                                                            stroke: "#607D8B",
                                                            strokeWidth: 0.75,
                                                            outline: "none",

                                                        },
                                                        hover: {
                                                            fill: "#168fff",
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        pressed: {
                                                            fill: "#168fff",
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },

                                                    }}
                                                />
                                            ))}
                                        </Geographies>
                                    </ZoomableGroup>
                                </ComposableMap>
                            </ReactSimpleMapWrapper>
                        </Col>
                    </Row>
                </Container>
            </Section_3>

        )
    }
}

export default connect(
    (state) => {
        return { tooltip: state.tooltip.default };
    }
)(Home_four);
