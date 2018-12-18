/* In-built packages */
import React, { Component } from 'react';
import { Row, Col } from 'antd';

import styled from 'styled-components';

/* Shared Components */
import Mini_graph from '../../../shared-components/Mini_graph';

/* Styled Components */



const RowofCol = styled.div`
    
    >div
    {
        border:${props=>props.theme.mode=="dark"?"":"1px solid #f1f1f1"};
        padding:0px !important;
        border-radius:0px;
    }
    >*
    {
        border-right:${props => props.theme.mode=="dark"?"2px solid #212e49":"0px !important"};
    }
    >div:last-child
    {
        border-right:${props => props.theme.mode=="dark"?"0px":"1px solid #f1f1f1 !important"};

    }
    >div:first-child>div
    {
        border-top-left-radius:5px;
        border-bottom-left-radius:5px;
    }
    >div:last-child>div
    {
        border-top-right-radius:5px;
        border-bottom-right-radius:5px;
    }

`
const Section_1 = styled.div`

`
const Container = styled.div`
    margin-right: auto;
    margin-left: auto;
    max-width:1170px;
    width:100%;
`;
const Container_row = styled(Row)`
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53)
`


export default class DashGraph extends Component {
    render() {
        return (

            <Section_1>
                <Container>
                    <Container_row className="789">
                        <RowofCol className="123">
                        {
                                        console.log("ABCDF")}
                            {this.props.data.map((chartData, index) =>
                                <Col sm={12} md={6} lg={6} key={index} style={{ padding: '10px' }}>
                                    <Mini_graph data={chartData} total={4} />
                                </Col>
                            )}
                        </RowofCol>
                    </Container_row>
                </Container>
            </Section_1>

        )
    }
}
