/* In-built packages */
import React, { Component } from 'react';
import { Row, Col } from 'antd';

/* Shared Components */
import Mini_graph from '../../../shared-components/Mini_graph';

/* Styled Components */
import { Section_1, Container, Container_row } from '../../../styled-components/homepage/style';

export default class Home_second extends Component {
    render() {
        return (

            <Section_1>
                <Container>
                    <Container_row>
                        {this.props.data.map((chartData, index) =>
                            <Col sm={12} md={6} lg={6} key={index} style={{ padding: '10px' }}>
                                <Mini_graph data={chartData} total={4} />
                            </Col>
                        )}
                    </Container_row>
                </Container>
            </Section_1>

        )
    }
}
