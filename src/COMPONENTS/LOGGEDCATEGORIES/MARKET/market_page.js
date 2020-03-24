import React, {Component} from "react";
import {ContactWrap, GreyWrap} from "../../../STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle";
import Navigation from "COMPONENTS/NAVIGATIONS/loggednavigation";
import {Container} from "../../../STYLED-COMPONENTS/HOMEPAGE/style";
import styled from "styled-components";
import {Col, Input, Row, Tabs, Tooltip, Icon, Button} from "antd";
import {Table} from "react-bootstrap";
import Screener from "../../tv_widgets/screener";
import MarketWidget from "../../tv_widgets/market_widget";
import FooterHome from "COMPONENTS/LANDING/FOOTERS/footer_home";
import TechnicalChart from "./technical_chart";
import {globalVariables} from "../../../Globals";
import { translate, Trans } from "react-i18next";
import {connect} from "react-redux";
import {withRouter} from "react-router-dom";
const API_URL = globalVariables.API_URL;
const WhiteBgWrapper = styled.div`
    background-color: ${props => (props.theme.mode === "dark" ? "#041b2c" : "white")};
    -webkit-box-shadow: -1px 5px 31px -10px rgba(0,0,0,0.53);
    -moz-box-shadow: -1px 5px 31px -10px rgba(0,0,0,0.53);
    box-shadow: -1px 5px 31px -10px rgba(0,0,0,0.53);
    border-radius: 5px;
`
const Search = Input.Search;
const Headwrap = styled.div`
  margin-left: 30px;
  margin-right: 30px;
  padding-top: 40px;
  .fullscreenBtn{
      height: auto;
    font-size: 24px;
    margin-top: 15px;
  }
`;
const RiseText = styled.span`
  font-size: 14px;
  font-family: "Open Sans";
  color: rgb(127, 127, 127);
  font-weight: bold;
  margin-bottom:20px;
  display:block;
  text-transform:uppercase;
`;
const InputSearch = styled(Search)`
  margin-left: auto;
  > input {
    background-color: ${props =>
    props.theme.mode === "dark" ? "#041b2c" : ""};
  }
  & .anticon {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
const { TabPane } = Tabs;

class MarketPage extends React.PureComponent{
    constructor(props) {
        super(props);
        this.state={
            screener_key:1,
            tc1:"ETHBTC",
            tc2:"XRPBTC",
            tc3:"LTCBTC",
            pairs:[]
        }
        this.t = this.props.t;
    }
    componentDidMount() {
        this.getPairs()
    }

    getPairs = ()=>{
        fetch(API_URL + `/users/get-all-pair`, {
            method: "get",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Accept-Language": localStorage["i18nextLng"]
            }
        }).then(response => response.json())
            .then(responseData => {
                if (responseData.status == 200) {
                    this.setState({
                        pairs:responseData.data
                    })

                }
            })
            .catch(error => {

            });
    }
    onScreenerTabChange = (key)=>{
        this.setState({screener_key:key})
    }
    goFullScreen = (id = "body") => {
        let element =  document.getElementById(id);
        console.log(element)
        if (element){
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.mozRequestFullScreen) {
                /* Firefox */
                element.mozRequestFullScreen();
            } else if (element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                /* IE/Edge */
                element.msRequestFullscreen();
            }
        }

    }
    render() {
        return(
                <ContactWrap>
                    <Navigation/>
                    <GreyWrap>
                        <Container>
                            {this.state.pairs.length > 0 &&
                            <Row style={{marginBottom:"30px"}} gutter={16}>
                                <Col md={8}>
                                    <WhiteBgWrapper>
                                        <TechnicalChart pairs={this.state.pairs} defaultPair={this.state.tc1}/>
                                    </WhiteBgWrapper>
                                </Col>
                                <Col md={8}>
                                    <WhiteBgWrapper>
                                        <TechnicalChart pairs={this.state.pairs} defaultPair={this.state.tc2}/>
                                    </WhiteBgWrapper>
                                </Col>
                                <Col md={8}>
                                    <WhiteBgWrapper>
                                        <TechnicalChart pairs={this.state.pairs} defaultPair={this.state.tc3}/>
                                    </WhiteBgWrapper>
                                </Col>
                            </Row>
                            }


                        <Row style={{marginBottom:"30px"}}>
                            <Col>
                                <WhiteBgWrapper>
                                            <div>
                                                <Headwrap>
                                                    <Row >
                                                        <Col span={24}>
                                                            <RiseText style={{marginBottom:"0"}}>{this.t("market:crypto_screener.message")}</RiseText>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24} style={{marginBottom:"20px"}} >
                                                            <Tabs defaultActiveKey="1" onChange={this.onScreenerTabChange} tabBarExtraContent={<Tooltip title="Launch In Fullscreen"><Button className="fullscreenBtn" size={"large"} type="link" onClick={()=>{this.goFullScreen("screener")}}><Icon type="arrows-alt" /></Button></Tooltip>}>
                                                                <TabPane tab={this.t("market:overview.message")} key="1" style={{minHeight:"400px"}} id={"screener"}>
                                                                    {this.state.screener_key== 1 &&
                                                                    <Screener  options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "overview",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme":this.props.theme? "dark" : "light",
                                                                        "locale": localStorage["i18nextLng"]
                                                                    }}/>
                                                                    }

                                                                </TabPane>
                                                                <TabPane tab={this.t("market:performance.message")} key="2">
                                                                    {this.state.screener_key== 2 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "performance",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme":this.props.theme? "dark" : "light",
                                                                        "locale": localStorage["i18nextLng"]
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                                <TabPane tab={this.t("market:oscillators.message")} key="3">
                                                                    {this.state.screener_key == 3 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "oscillators",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme":this.props.theme? "dark" : "light",
                                                                        "locale": localStorage["i18nextLng"]
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                                <TabPane tab={this.t("market:trend_following.message")} key="4">
                                                                    {this.state.screener_key== 4 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "moving_averages",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme":this.props.theme? "dark" : "light",
                                                                        "locale": localStorage["i18nextLng"]
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                            </Tabs>

                                                        </Col>
                                                    </Row>

                                                </Headwrap>
                                            </div>
                                </WhiteBgWrapper>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <WhiteBgWrapper>
                                    <div>
                                        <Headwrap>
                                            <Row style={{}}>
                                                <Col span={24}>
                                                    <RiseText>{this.t("market:rise_fall.message")}</RiseText>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={24} style={{marginBottom:"20px"}}>
                                                    <div style={{ height:"400px", width:"100%"}}>
                                                        <MarketWidget  options={  {
                                                            "width": "100%",
                                                            "height": "100%",
                                                            "defaultColumn": "overview",
                                                            "screener_type": "crypto_mkt",
                                                            "displayCurrency": "USD",
                                                            "colorTheme":this.props.theme? "dark" : "light",
                                                            "locale": localStorage["i18nextLng"]
                                                        }}/>
                                                    </div>

                                                </Col>
                                            </Row>

                                        </Headwrap>
                                    </div>
                                </WhiteBgWrapper>
                            </Col>
                        </Row>
                        </Container>
                    </GreyWrap>
                    <FooterHome />
                </ContactWrap>
        )
    }
}
function mapStateToProps(state) {
    return {
        isLoggedIn: state.simpleReducer.isLoggedIn,
        theme:
            state.themeReducer.theme !== undefined ? state.themeReducer.theme : "",
        cryptoPair:
            state.walletReducer.cryptoPair !== undefined
                ? state.walletReducer.cryptoPair
                : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    };
}

export default translate(["header", "footer", "general_1", "general_4"])(
    connect(mapStateToProps)(MarketPage)
);
