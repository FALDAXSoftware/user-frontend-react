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
const WhiteBgContainer = styled(Container)`
    background-color: white;
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
            screener_key:1
        }
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
                        <Row style={{marginBottom:"30px"}}>
                            <Col>
                                <WhiteBgContainer>
                                            <div>
                                                <Headwrap>
                                                    <Row style={{}}>
                                                        <Col span={24}>
                                                            <RiseText style={{marginBottom:"0"}}>Crypto Screener</RiseText>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col span={24} style={{marginBottom:"20px"}} >
                                                            <Tabs defaultActiveKey="1" onChange={this.onScreenerTabChange} tabBarExtraContent={<Tooltip title="Launch In Fullscreen"><Button className="fullscreenBtn" size={"large"} type="link" onClick={()=>{this.goFullScreen("screener")}}><Icon type="arrows-alt" /></Button></Tooltip>}>
                                                                <TabPane tab="Overview" key="1" style={{minHeight:"400px"}} id={"screener"}>
                                                                    {this.state.screener_key== 1 &&
                                                                    <Screener  options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "overview",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme": "light",
                                                                        "locale": "en"
                                                                    }}/>
                                                                    }

                                                                </TabPane>
                                                                <TabPane tab="Performance" key="2">
                                                                    {this.state.screener_key== 2 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "performance",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme": "light",
                                                                        "locale": "en"
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                                <TabPane tab="Oscillators" key="3">
                                                                    {this.state.screener_key == 3 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "oscillators",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme": "light",
                                                                        "locale": "en"
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                                <TabPane tab="Trend-Following" key="4">
                                                                    {this.state.screener_key== 4 &&
                                                                    <Screener options={{
                                                                        "width": "100%",
                                                                        "height": "100%",
                                                                        "defaultColumn": "moving_averages",
                                                                        "defaultScreen": "general",
                                                                        "market": "crypto",
                                                                        "showToolbar": true,
                                                                        "colorTheme": "light",
                                                                        "locale": "en"
                                                                    }}/>
                                                                    }
                                                                </TabPane>
                                                            </Tabs>

                                                        </Col>
                                                    </Row>

                                                </Headwrap>
                                            </div>
                                </WhiteBgContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <WhiteBgContainer>
                                    <div>
                                        <Headwrap>
                                            <Row style={{}}>
                                                <Col span={24}>
                                                    <RiseText>RISING/FALLING</RiseText>
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
                                                            "colorTheme": "light",
                                                            "locale": "en"
                                                        }}/>
                                                    </div>

                                                </Col>
                                            </Row>

                                        </Headwrap>
                                    </div>
                                </WhiteBgContainer>
                            </Col>
                        </Row>
                    </GreyWrap>
                    <FooterHome />
                </ContactWrap>
        )
    }
}

export default  MarketPage
