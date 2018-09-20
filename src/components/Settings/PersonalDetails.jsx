/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components'

/* Styled-Components */
const HeaderCol = styled(Col)`
  font-size:20pt;
  font-weight: bold;
  color: #505050;
  padding-top: 12px;
  padding-bottom: 12px;
`

const ImageDiv = styled.img`
  height: 160px;
  width: 160px;
`

class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const { } = this.state;

        return (
            <div>
                <Row>
                    <Col span={4} />
                    <HeaderCol span={12}> Personal Details !!</HeaderCol>
                </Row>
                <Row>
                    <Col span={12} offset={4}>
                        <Row>
                            <Col span={4} offset={2}>
                                <ImageDiv src='' />
                                <button>Upload new photo</button>
                            </Col>
                            <Col span={8}>
                                Fields
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PersonalDetails;
