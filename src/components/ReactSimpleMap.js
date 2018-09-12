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

/* Component defination start here */
class ReactSimpleMap extends Component {
    constructor() {
        super();
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
    }
    handleMove(geography, evt) {
        const x = evt.clientX;
        const y = evt.clientY + window.pageYOffset;
        this.props.dispatch(show({ origin: { x, y }, content: geography.properties.name}));
    }
    handleLeave() {
        this.props.dispatch(hide());
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.tooltip && this.props.tooltip.show!==nextProps.tooltip.show) {
            if(this.props.tooltip.show===true) {
                tip.hide(nextProps.tooltip.content);
            } else {
                tip.show(nextProps.tooltip.content);
            }
        }
        tip.position({ pageX: nextProps.tooltip.origin.x, pageY: nextProps.tooltip.origin.y })
    }
    render() {
        return (
        <ReactSimpleMapWrapper>
            <ComposableMap
                projectionConfig={{
                    scale: 205,
                    rotation: [-11,0,0],
                }}
                width={980}
                height={551}
                style={{
                    width: "100%",
                    height: "auto",
                }}
            >
                <ZoomableGroup center={[0,20]} disablePanning>
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
        )
    }
}

export default connect(
    (state) => {
        return { tooltip: state.tooltip.default };
    }
)(ReactSimpleMap);
