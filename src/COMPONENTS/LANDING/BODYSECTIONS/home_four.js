/* In-build packages */
import React, { Component } from "react"
import { ComposableMap, ZoomableGroup, Geographies, Geography } from "react-simple-maps";
import { geoAlbersUsa } from 'd3-geo';
import { connect } from "react-redux";
import { actions, } from "redux-tooltip";
import { withRouter } from 'react-router-dom'
import styled from 'styled-components';
import tooltip from 'wsdm-tooltip';
import { globalVariables } from 'Globals.js';
import { Row, Col, Modal, Button, Input, Icon, notification } from 'antd';
import { _FOOTERLOGO } from 'CONSTANTS/images';

/* Components */
import { Section3, Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
const { show, hide } = actions;

const EmailInput = styled.input`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
    margin-top: 5px;
    @media(max-width:576px)
    {

    }
`
const Tip = tooltip({
    styles: {
        "color": "#282528",
        "text-transform": 'uppercase',
        "font-family": 'Open Sans',
        "font-size": "15px",
        "background-color": "white",
        "border-radius": "3px",
    },
});

/* Styled componets */
const ReactSimpleMapWrapper = styled.div`
  width: 100%;
  maxWidth: 980px;
  margin: "0 auto";
  fontFamily: "Roboto, sans-serif";
  text-align: center;
  cursor: pointer;
  background-image: "-moz-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-webkit-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
  background-image: "-ms-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%)";
`;

const BackLink = styled.a`
    vertical-align: middle;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    position: 'absolute';
    left: 50%;
`;

const LinkWrap = styled.div`
    margin-top:50px;
`;
const Icon1 = styled.i`
    vertical-align: middle;
    color: rgb( 15, 71, 123 );
`;

const UsaMap = styled.div`
`;
const Heading = styled.h2`
  font-size:42px;
  color:black;
  font-family:"Open sans";
  margin-bottom:0px;
`
const SubHeading = styled.h3`
  font-size:14px;
  color:#282528;
  font-family:"Open sans";
  margin-bottom:40px;
`
const Section = styled(Section3)`
  padding-top:50px;
  padding-bottom:50px;
`
const CircleColor = styled.span`
    height:20px;
    width:20px;
    border-radius:50%;
    display:inline-block;
`
const LegendDiv = styled.div`
    margin-top:-130px;
    width:200px;
    @media(max-width:767px)
    {
        display:none;
    }
`
//Myanmar, Somaliland new added

/* Component definition start here */
class HomeFour extends Component {
    constructor() {
        super();
        this.handleMove = this.handleMove.bind(this);
        this.handleLeave = this.handleLeave.bind(this);
        this.showModal = this.showModal.bind(this);
        this.countryColor = this.countryColor.bind(this);
        this.state = { visible: false, modal: '', usaMap: false, email_msg: "", countries: [] };
    }

    handleMove(geography, evt) {
        const x = evt.clientX;
        const y = evt.clientY + window.pageYOffset;
        this.props.dispatch(show({ origin: { x, y }, content: geography.properties.name }));
    }

    handleLeave() {
        this.props.dispatch(hide());
    }

    handleOk() {
        this.setState({ visible: false });
    }

    handleCancel(e) {
        this.setState({ visible: false });
    }
    showModal(modal) {
        if (modal.properties.name === 'United States') {
            this.setState({ usaMap: true, email_address: '' });
        } else if (modal.properties.name === "Vietnam") {
            //skip for now
        } else {
            for (var i = 0; i < this.state.countries.length; i++) {
                if (this.state.countries[i].region === "United States") {
                    if (modal.properties.name === "Colorado") {
                        this.setState({ visible: true, modal: 1, email_address: '' });
                        return;
                    } else if (this.state.countries[i].name === modal.properties.name) {
                        this.setState({ visible: true, modal: this.state.countries[i].legality, email_address: '' });
                        return;
                    }
                } else if (this.state.countries[i].name === modal.properties.name) {
                    this.setState({ visible: true, modal: this.state.countries[i].legality, email_address: '' });
                    return;
                }
            }
        }
    }

    hideModal() {
        this.setState({ visible: false, usaMap: false, email_address: '' });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.tooltip && this.props.tooltip.show !== nextProps.tooltip.show) {
            if (this.props.tooltip.show === true) {
                Tip.hide(nextProps.tooltip.content);
            } else {
                Tip.show(nextProps.tooltip.content);
            }
        }
        if (nextProps.tooltip && nextProps.tooltip.origin && nextProps.tooltip.origin.x && nextProps.tooltip.origin.y) {
            Tip.position({ pageX: nextProps.tooltip.origin.x, pageY: nextProps.tooltip.origin.y })
        }
    }

    send_email() {
        const values = { email: this.state.email_address };
        this.setState({ email_address: '' });
        var re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/

        if (re.test(this.state.email_address)) {
            this.setState({ email_msg: "" })
            fetch(globalVariables.API_URL + "/users/email-subscription", {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values)
            }).then(response => response.json())
                .then((responseData) => {
                    if (responseData.status === 500) {
                        this.openNotification1();
                    } else {
                        this.openNotification();
                        this.setState({ visible: false, email_msg: "" })
                    }
                })
                .catch(error => { })
        } else {
            this.setState({ email_msg: "*email address not valid" })
        }
    }

    openNotification() {
        notification.open({
            message: 'Thank You',
            description: 'You will receive an Email shortly',
            duration: 6,
            icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
        });
    };
    openNotification1() {
        notification.open({
            message: 'Error',
            description: 'Sorry, There is some error',
            duration: 6,
            icon: <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" />,
        });
    };
    countryColor(text) {
        let self = this;
        let countries = self.state.countries
        for (var i = 0; i < countries.length; i++) {
            if (countries[i].name === text) {
                return countries[i].color;
            }
        }
        return '#ECEFF1';
    };
    componentDidMount() {
        let self = this;
        fetch(globalVariables.API_URL + "/users/getMapCountries", {
            method: "GET",
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.state === 200) {
                    self.setState({
                        countries: responseData.countries
                    }, () => {
                        if (self.props.location !== undefined) {
                            if (self.props.location.hash !== "" && self.props.location.hash !== undefined && self.props.location.hash === "#block-world-map") {
                                var elmnt = document.getElementById("map-scroll");
                                if (elmnt !== null)
                                    elmnt.scrollIntoView(true);
                            }
                        }
                    });
                }
            })
            .catch(error => { })
    }
    render() {
        let self = this;
        const { modal, countries } = this.state;
        return (
            <div id="block-world-map">
                <div className="simple-maps">
                    <Modal
                        title={<img alt="Footer Logo" src={_FOOTERLOGO} />}
                        visible={this.state.visible}
                        onOk={(e) => this.handleOk()}
                        onCancel={(e) => this.handleCancel(e)}
                        footer={null}
                        width={605}
                        height={460}
                        className="world-map"
                    >
                        {
                            modal === 1 ?
                                <div>
                                    <p>All services are available. Start trading now!</p>
                                    <div style={{ minHeight: '20px' }}>
                                        <Button style={{ float: 'right', color: 'white', borderColor: '#00a7ff', backgroundColor: "#0f477b", height: "45px" }} onClick={() => this.send_email()} disabled>TRADE NOW </Button>
                                    </div>
                                </div> : ""
                        }
                        {
                            modal === 2 ?
                                <div>
                                    <p>All services are unavailable due to legal concerns out of our control. We are monitoring the situation and hope that legislators enact forward-thinking and sensible solutions. Please enter your email address below to receive updates. Please enter your email address below to receive updates.</p>
                                    <label style={{ color: 'black', fontWeight: "600" }}> Email Address: </label>
                                    <EmailInput placeholder="Please enter your email address" value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                                    <div style={{ marginTop: '20px', minHeight: '20px' }}>
                                        <Button style={{ float: 'right', color: 'white', borderColor: '#00a7ff', backgroundColor: "#0f477b", height: "45px" }} onClick={() => this.send_email()}> CONFIRM </Button>
                                    </div>
                                </div> : ""
                        }
                        {
                            modal === 3 ?
                                <div>
                                    <p>All services are available! This country has not made an official determination regarding cryptocurrency so their stance is considered 'Neutral'. We are continuously monitoring legislation changes and will update our operational status if anything changes.</p>
                                </div> : ""
                        }
                        {
                            modal === 4 ?
                                <div>
                                    <p>The United States has Federal regulations as well as regulations that vary by state. FALDAX has complied with Federal requirements and is working to comply with the unique demands of each state. Our team has compiled the necessary documentation, and we anticipate approval soon. Tell your elected representatives that you want favorable and sensible crypto legislation by clicking <a target="_blank" href="https://www.usa.gov/elected-officials">this link. </a> Please enter your email address below to receive updates.</p>
                                    <label style={{ color: '#00a7ff' }}> Email Address: </label>
                                    <Input placeholder="Please enter your email address" style={{ color: '#00a7ff', borderColor: '#00a7ff' }} value={this.state.email_address} onChange={(e) => { this.setState({ email_address: e.target.value }); }} />
                                    <div style={{ marginTop: '20px', minHeight: '20px' }}>
                                        <Button style={{ float: 'right', color: 'white', borderColor: '#00a7ff', backgroundColor: "#0f477b", height: "45px" }} onClick={() => this.send_email()}> CONFIRM </Button>
                                    </div>
                                </div> : ""
                        }
                    </Modal>
                </div>
                <Section>
                    {
                        countries.length > 0 &&
                        <Container className="wow fadeIn" data-wow-duration="2s" data-wow-delay="700ms">
                            <Row>
                                <Col style={{ textAlign: "center" }}>
                                    <Heading>
                                        Service Availability
                                    </Heading>
                                    <SubHeading>
                                        Click on a country for additional details
                  </SubHeading>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <ReactSimpleMapWrapper>
                                        {!this.state.usaMap ?
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
                                                    <Geographies geography={globalVariables._AMAZONBUCKET + "assets/world-50m.json"}>
                                                        {(geographies, projection) => geographies.map((geography, i) => geography.id !== "ATA" && (
                                                            <Geography
                                                                key={i}
                                                                geography={geography}
                                                                projection={projection}
                                                                onMouseMove={this.handleMove}
                                                                onClick={(modal) => this.showModal(modal)}
                                                                onMouseLeave={this.handleLeave}
                                                                style={{
                                                                    default: {
                                                                        fill: self.countryColor(geography.properties.name),
                                                                        stroke: "#607D8B",
                                                                        strokeWidth: 0.75,
                                                                        outline: "none",

                                                                    },
                                                                    hover: {
                                                                        fill: self.countryColor(geography.properties.name),
                                                                        stroke: "#168fff",
                                                                        strokeWidth: 0.75,
                                                                        outline: "none",
                                                                    },
                                                                    pressed: {
                                                                        fill: self.countryColor(geography.properties.name),
                                                                        stroke: "#168fff",
                                                                        strokeWidth: 0.75,
                                                                        outline: "none",
                                                                    }
                                                                }}
                                                            />
                                                        ))}
                                                    </Geographies>
                                                </ZoomableGroup>
                                            </ComposableMap>
                                            :
                                            <UsaMap>
                                                <LinkWrap>
                                                    <BackLink onClick={() => this.hideModal()}>
                                                        <Icon1 className="material-icons"> keyboard_backspace </Icon1>
                                                        Back To World Map
                                        </BackLink>
                                                </LinkWrap>
                                                <ComposableMap
                                                    width={900}
                                                    height={600}
                                                    projection={geoAlbersUsa}
                                                    projectionConfig={{ scale: 900 }}
                                                    style={{
                                                        width: "100%",
                                                        height: "auto",
                                                    }}
                                                >
                                                    <ZoomableGroup disablePanning>
                                                        <Geographies
                                                            disableOptimization
                                                            geography={globalVariables._AMAZONBUCKET + "assets/Country/us-albers-7.json"}
                                                        >
                                                            {(geos, proj) =>
                                                                geos.map((geo, i) => (
                                                                    <Geography
                                                                        key={geo.properties.ID_1}
                                                                        geography={geo}
                                                                        projection={proj}
                                                                        onClick={(modal) => this.showModal(modal)}
                                                                        onMouseMove={this.handleMove}
                                                                        onMouseLeave={this.handleLeave}
                                                                        style={{
                                                                            default: {
                                                                                fill: self.countryColor(geo.properties.name),
                                                                                stroke: "#607D8B",
                                                                                strokeWidth: 0.75,
                                                                                outline: "none",
                                                                            },
                                                                            hover: {
                                                                                fill: self.countryColor(geo.properties.name),
                                                                                stroke: "#168fff",
                                                                                strokeWidth: 0.75,
                                                                                outline: "none",
                                                                            },
                                                                            pressed: {
                                                                                fill: "#168fff",
                                                                                stroke: "#168fff",
                                                                                strokeWidth: 0.75,
                                                                                outline: "none",
                                                                            }
                                                                        }}
                                                                    />
                                                                ))
                                                            }
                                                        </Geographies>
                                                    </ZoomableGroup>
                                                </ComposableMap>
                                                {/* <ComposableMap
                                        projection={geoAlbersUsa}
                                        projectionConfig={{ scale: 205 }}
                                        width={980}
                                        height={551}
                                        style={{
                                            width: "100%",
                                            height: "auto",
                                        }}
                                    >
                                        <ZoomableGroup>
                                            <Geographies
                                            disableOptimization
                                            geography="/assets/us-albers-1.json"
                                            >
                                            {(geos, proj) =>
                                                geos.map((geo, i) => (
                                                <Geography
                                                    key={i}
                                                    geography={geo}
                                                    projection={proj}
                                                    style={{ default: { fill: "#CFD8DC" } }}
                                                    onClick={(modal)=>this.showModal(modal)}
                                                    onMouseMove={this.handleMove}
                                                    onMouseLeave={this.handleLeave}
                                                    style={{
                                                        default: {
                                                            fill: countryColor(geo.properties.name),
                                                            stroke: "#607D8B",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        hover: {
                                                            fill: countryColor(geo.properties.name),
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        },
                                                        pressed: {
                                                            fill: "#168fff",
                                                            stroke: "#168fff",
                                                            strokeWidth: 0.75,
                                                            outline: "none",
                                                        }
                                                    }}
                                                />
                                                ))
                                            }
                                            </Geographies>
                                        </ZoomableGroup>
                                    </ComposableMap> */}
                                            </UsaMap>
                                        }
                                    </ReactSimpleMapWrapper>
                                </Col>
                            </Row>
                            <LegendDiv>
                                <Row style={{ padding: "5px 0px" }}>
                                    <Col span={4}> <CircleColor style={{ backgroundColor: "#61d0c4" }}></CircleColor> </Col>
                                    <Col span={20}> <span>All Services Availabile</span> </Col>
                                </Row>
                                <Row style={{ padding: "5px 0px" }}>
                                    <Col span={4}> <CircleColor style={{ backgroundColor: "#fbd26d" }}></CircleColor> </Col>
                                    <Col span={20}> <span>Partial Services Availabile</span> </Col>
                                </Row>
                                <Row style={{ padding: "5px 0px" }}>
                                    <Col span={4}> <CircleColor style={{ backgroundColor: "#b4caf9" }}></CircleColor> </Col>
                                    <Col span={20}> <span>All Services Availabile</span> </Col>
                                </Row>
                                <Row style={{ padding: "5px 0px" }}>
                                    <Col span={4}> <CircleColor style={{ backgroundColor: "#fa776d" }}></CircleColor> </Col>
                                    <Col span={20}> <span>No Services Availabile</span> </Col>
                                </Row>
                            </LegendDiv>
                        </Container>
                    }
                </Section>
            </div>
        )
    }
}

export default connect(
    (state) => {
        return { tooltip: state.tooltip.default };
    }
)(withRouter(HomeFour));
