import React from "react";
import { ConversionWarp, ConversionContainer, MainRow, ConversionTab, LeftCol } from "../../../styled-components/conversion/style";
import Navigation from "../../Navigations/Navigation";
import { Row, Col, Tabs } from "antd";
const TabPane = Tabs.TabPane;
class Conversion extends React.Component {
    render() {
        return (
            <ConversionWarp>
                <Navigation></Navigation>
                <ConversionContainer>
                    <MainRow>
                        <LeftCol md={12}>
                            <ConversionTab defaultActiveKey="1">
                                <TabPane tab="BUY" key="1">Content of Tab Pane 1</TabPane>
                                <TabPane tab="SELL" key="2">Content of Tab Pane 2</TabPane>
                            </ConversionTab>
                        </LeftCol>
                    </MainRow>
                </ConversionContainer>
            </ConversionWarp>
        )
    }
}
export default Conversion;