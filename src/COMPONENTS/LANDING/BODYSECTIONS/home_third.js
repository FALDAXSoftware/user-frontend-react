/* In-build packages */
import React from 'react';
import { Row, Col, Table } from 'antd';
import styled from 'styled-components';

/* Components */
import { Section2, Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';

/* Styled componets */
const AntdTable = styled.div`
    overflow: auto;
`;
const ThirdHead = styled.div`
    margin-top: 55px;
    margin-bottom: 50px;
    text-align: center;
`;
const ThirdHeadSpan = styled.span`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;
const ThirdHeadP = styled.p`
    font-family: 'Open sans';
    font-size: 42px;
    color: rgb(40, 37, 40);
    line-height: 1.143;
    text-align: center;
`;

/* Component definition start here */
const HomeThird = ({ loading, columns, dataSource, pagination, handleTableChange }) => {
    return (
        <Section2>
            <Container>
                <Row>
                    <Col>
                        <ThirdHead>
                            <ThirdHeadSpan><b>Faldax -</b> Most Advanced</ThirdHeadSpan>
                            <ThirdHeadP>cryptocurrency trading platform</ThirdHeadP>
                        </ThirdHead>
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
        </Section2>
    );
}

export default HomeThird;
