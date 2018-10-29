import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Card, Icon, Avatar } from 'antd';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { SectionBlog, Mainimage, Lefthead, Subleft, Eco, Head3, Eco2, Righthead, Whole_wrap, Blog_p, Blogs_wrap, HR_tag, Meta_title, Meta_desc, Card_foot, Prev_next, Prev, Next, MsgIcon, CardCover } from '../../styled-components/landingCategories/blogStyle';

const Container_Blog = styled(Container)`

`
const { Meta } = Card;

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <div>
                <Navigation />
                {console.log("HELLO !@#@##$")}

                <Container_Blog style={{ minHeight: "100%" }}>
                    <SectionBlog>
                        <Mainimage>
                            <Row>
                                <Col lg={9} md={24}>
                                    <Lefthead>
                                        <Subleft>
                                            <Eco>Economy</Eco>
                                            <Head3>India’s Most Popular Chat App Launching Cryptocurrency Exchange</Head3>
                                            <Eco2>Vrun Gregor</Eco2>
                                        </Subleft>
                                    </Lefthead>
                                </Col>
                                <Col lg={15} md={24}>
                                    <Righthead>
                                    </Righthead>
                                </Col>
                            </Row>
                        </Mainimage>
                        <Whole_wrap>
                            <Blog_p>Latest Blogs</Blog_p><HR_tag />
                            <Blogs_wrap>
                                <Row className="blog-card-row">
                                    <Col lg={8} md={12} sm={12} className="blog-card-col">
                                        <Card
                                            style={{ width: "100%" }}
                                            cover={<CardCover alt="example" style={{ backgroundImage: "url('/images/LandingCat/Blog/headImage.png')" }} />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>, <Card_foot>Varun Gregodfdfdfffffffffffffffffffffffffffffffffffffffffffr</Card_foot>, <Card_foot> <MsgIcon src="/images/LandingCat/Blog/msg-icon.png" /> 25 comments</Card_foot>]}
                                            bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                                title={<Meta_title>Bitcoin</Meta_title>}
                                                description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col lg={8} md={12} sm={12} className="blog-card-col">
                                        <Card
                                            style={{ width: "100%" }}
                                            cover={<CardCover alt="example" style={{ backgroundImage: "url('/images/LandingCat/Blog/headImage.png')" }} />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>, <Card_foot>Varun Gregor</Card_foot>, <Card_foot> <MsgIcon src="/images/LandingCat/Blog/msg-icon.png" /> 25 comments</Card_foot>]}
                                            bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                                title={<Meta_title>Bitcoin</Meta_title>}
                                                description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col lg={8} md={12} sm={12} className="blog-card-col">
                                        <Card
                                            style={{ width: "100%" }}
                                            cover={<CardCover alt="example" style={{ backgroundImage: "url('/images/LandingCat/Blog/headImage.png')" }} />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>, <Card_foot>Varun Gregor</Card_foot>, <Card_foot> <MsgIcon src="/images/LandingCat/Blog/msg-icon.png" /> 25 comments</Card_foot>]}
                                            bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                                title={<Meta_title>Bitcoin</Meta_title>}
                                                description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                </Row>
                            </Blogs_wrap>
                        </Whole_wrap>
                        <Prev_next>
                            <Prev><i style={{ verticalAlign: "middle" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev>
                            <Next><span style={{ verticalAlign: "middle" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next>
                        </Prev_next>
                    </SectionBlog>
                </Container_Blog>

                <CommonFooter />
            </div>
        );
    }
}

export default Blog;