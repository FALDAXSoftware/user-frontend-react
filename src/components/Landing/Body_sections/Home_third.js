/* In-build packages */
import React from 'react';
import { Row, Col, Button, Layout, Menu, Breadcrumb, Card, Table } from 'antd';
import styled from 'styled-components';

/* Components */
import { Section_2, Section_3, Container } from '../../../styled-components/homepage/style';

/* Styled componets */
const AntdTable = styled.div`
    overflow: auto;
`;


const Third_head = styled.div`
    margin-top: 55px;
    margin-bottom: 50px;
    text-align: center;
`;

const Third_head_span = styled.span`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;

const Third_head_p = styled.p`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;

/* Component defination start here */
const Home_third = ({ loading, columns, dataSource, pagination, handleTableChange }) => {
    
    return (
        <Section_2>
            <Container>
                <Row>
                    <Col>
                        <Third_head>
                            <Third_head_span><b>Faldax -</b> Most Advanced</Third_head_span>
                            <Third_head_p>cryptocurrency trading platform</Third_head_p>
                        </Third_head>
                        <AntdTable>
                            <Table
                                loading={loading || false}
                                columns={columns}
                                rowKey={(record, index) => index}
                                dataSource={dataSource || []}
                                pagination={pagination || false}
                                onChange={handleTableChange || false}
                                bordered={false}
                                className="dashboard-table"
                                rowClassName={(record, index) => index % 2 === 0 ? "even-table-row" : "odd-table-row"}
                            />
                        </AntdTable>
                    </Col>
                </Row>
            </Container>
        </Section_2>
    );
}

export default Home_third;