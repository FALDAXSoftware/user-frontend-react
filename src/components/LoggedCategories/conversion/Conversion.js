import React from "react";
import { ConversionWarp, ConversionContainer, MainRow, ConversionTab, LeftCol, ConversionTitle, CustomRadioContainer, ConversionTabPane, ConversionRadioRow, BorderRow, RowTitle, ConversionInput, ConversionDropDown, DropDownOption, DropIcon, ConversionSubmitBtn, RightCol, RightColContainer, RightColTitle, RightColAmount, RightColPrice, DashedSeprator, LeftSpan, RightSpan, RightTotal, LeftTotal, PayWith, BankAcountDropdown } from "../../../styled-components/conversion/style";
import Navigation from "../../Navigations/Navigation";
import { Row, Col, Tabs, Select, Button, Divider, Icon } from "antd";
const Option = Select.Option

class Conversion extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 1
        }
        this.handleTabChange = this.handleTabChange.bind(this);
    }
    handleTabChange(e) {
        console.log(e);
        this.setState({
            selectedTab: e
        })
    }
    render() {
        return (
            <ConversionWarp>
                <Navigation></Navigation>
                <ConversionContainer>
                    <MainRow>
                        <LeftCol lg={12}>
                            <ConversionTab defaultActiveKey="1" onChange={this.handleTabChange}>
                                <ConversionTabPane tab="BUY" key="1">
                                    <Row>
                                        <Col>
                                            <ConversionTitle>Choose Which Assets to Trade</ConversionTitle>
                                        </Col>
                                    </Row>
                                    <ConversionRadioRow>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" checked />
                                                <span className="radio-label">Including Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" />
                                                <span className="radio-label">Excluding Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                    </ConversionRadioRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Get
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            <ConversionDropDown defaultValue="XRP">
                                                <DropDownOption value="BTC"> <DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  BTC</DropDownOption>
                                                <DropDownOption value="XRP"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  XRP</DropDownOption>
                                                <DropDownOption value="LTC"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  LTC</DropDownOption>
                                                <DropDownOption value="ETH"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  ETH</DropDownOption>
                                            </ConversionDropDown>
                                        </Col>
                                    </BorderRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Pay
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            <ConversionDropDown defaultValue="USD" disabled>
                                                <DropDownOption value="USD"> <DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  USD</DropDownOption>
                                                <DropDownOption value="XRP"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  XRP</DropDownOption>
                                                <DropDownOption value="LTC"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  Disabled</DropDownOption>
                                                <DropDownOption value="ETH"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  ETH</DropDownOption>
                                            </ConversionDropDown>
                                        </Col>
                                    </BorderRow>
                                    <Row style={{ marginBottom: "25px" }}>
                                        <Col xs={12}>
                                            <PayWith>
                                                Pay With
                                            </PayWith>
                                        </Col>
                                        <Col xs={12} style={{ textAlign: "right" }}>
                                            <BankAcountDropdown defaultValue="1" >
                                                <Option value="1">Suntest ****789</Option>
                                                <Option value="2">Silvergate ****123</Option>
                                            </BankAcountDropdown>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ConversionSubmitBtn type="primary" size="large" block>Buy xrp</ConversionSubmitBtn>
                                        </Col>
                                    </Row>
                                </ConversionTabPane>
                                <ConversionTabPane tab="SELL" key="2">
                                    <Row>
                                        <Col>
                                            <ConversionTitle>Choose Which Assets to Trade</ConversionTitle>
                                        </Col>
                                    </Row>
                                    <ConversionRadioRow>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" checked />
                                                <span className="radio-label">Including Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                        <Col md={12}>
                                            <CustomRadioContainer>
                                                <input type="radio" name="fees" />
                                                <span className="radio-label">Excluding Fees</span>
                                                <span className="checkmark"></span>
                                            </CustomRadioContainer>
                                        </Col>
                                    </ConversionRadioRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Pay
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            <ConversionDropDown defaultValue="XRP">
                                                <DropDownOption value="BTC"> <DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  BTC</DropDownOption>
                                                <DropDownOption value="XRP"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  XRP</DropDownOption>
                                                <DropDownOption value="LTC"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  Disabled</DropDownOption>
                                                <DropDownOption value="ETH"><DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  ETH</DropDownOption>
                                            </ConversionDropDown>
                                        </Col>
                                    </BorderRow>
                                    <BorderRow>
                                        <RowTitle>
                                            You Get
                                        </RowTitle>
                                        <Col xs={12} sm={12} md={16}>
                                            <ConversionInput type="text" />
                                        </Col>
                                        <Col xs={12} sm={12} md={8} style={{ height: "42px" }}>
                                            <ConversionDropDown defaultValue="USD" disabled>
                                                <DropDownOption value="USD"> <DropIcon src="https://s3.us-east-2.amazonaws.com/production-static-asset/coin/defualt_coin.png" height="20px" />  USD</DropDownOption>
                                            </ConversionDropDown>
                                        </Col>
                                    </BorderRow>
                                    {/* <Row style={{ marginBottom: "25px" }}>
                                        <Col xs={12}>
                                            <PayWith>
                                                Pay With
                                            </PayWith>
                                        </Col>
                                        <Col xs={12} style={{ textAlign: "right" }}>
                                            <BankAcountDropdown defaultValue="1" >
                                                <Option value="1">Suntest ****789</Option>
                                                <Option value="2">Silvergate ****123</Option>
                                            </BankAcountDropdown>
                                        </Col>
                                    </Row> */}
                                    <Row>
                                        <Col>
                                            <ConversionSubmitBtn type="primary" size="large" block style={{ marginTop: "57px" }}>SELL xrp</ConversionSubmitBtn>
                                        </Col>
                                    </Row>
                                </ConversionTabPane>
                            </ConversionTab>
                        </LeftCol>
                        <RightCol lg={12}>
                            <RightColContainer>
                                <Row>
                                    <Col>
                                        {this.state.selectedTab == 1 &&
                                            <RightColTitle>You Are Buying</RightColTitle>
                                        }
                                        {this.state.selectedTab == 2 &&
                                            <RightColTitle>You Are Selling</RightColTitle>
                                        }
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <RightColAmount>0.0123 BTC</RightColAmount>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <RightColPrice>@ $3,914.06  per BTC</RightColPrice>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        <DashedSeprator></DashedSeprator>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightSpan>0.0123 BTC</RightSpan>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftSpan>$3,000</LeftSpan>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightSpan>FALDAX Fee</RightSpan>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftSpan>$5.00</LeftSpan>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col xs={12}>
                                        <RightTotal>Total</RightTotal>
                                    </Col>
                                    <Col xs={12} style={{ textAlign: "right" }}>
                                        <LeftTotal>$3005</LeftTotal>
                                    </Col>
                                </Row>
                            </RightColContainer>
                        </RightCol>
                    </MainRow>
                </ConversionContainer>
            </ConversionWarp>
        )
    }
}
export default Conversion;