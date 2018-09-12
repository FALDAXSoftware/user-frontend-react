/* In-build packages */
import React from 'react';
import { Row, Col, Table } from 'antd';
import styled from 'styled-components';

/* Styled componets */
const AntdTable = styled.div`
    overflow: auto;
`;

/* Component defination start here */
const CustomTable = ({ loading, columns, dataSource, pagination, handleTableChange }) => {
    return (
        <AntdTable>
            <Table
                loading={loading || false}
                columns={columns}
                rowKey={(record, index) => index}
                dataSource={dataSource || []}
                pagination={pagination || false}
                onChange={handleTableChange || false}
                bordered={false}
                rowClassName={(record, index) => index % 2 === 0 ? "even-table-row" : "odd-table-row" }
            />
        </AntdTable>
    );
}

export default CustomTable;