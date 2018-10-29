import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col,Card, Icon, Avatar} from 'antd';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { SectionBlog,Mainimage,Lefthead,Subleft,Eco,Head3,Eco2,Righthead,Whole_wrap,Blog_p,Blogs_wrap,HR_tag,Meta_title,Meta_desc,Card_foot,Prev_next,Prev,Next} from '../../styled-components/landingCategories/blog';

const Container_Blog = styled(Container)`
    width:1170px;
    padding-left:0px;
    padding-right:0px;
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
                                <Col span={9}>
                                    <Lefthead>
                                        <Subleft>
                                            <Eco>Economy</Eco>
                                            <Head3>India’s Most Popular Chat App Launching Cryptocurrency Exchange</Head3>
                                            <Eco2>Vrun Gregor</Eco2>
                                        </Subleft>
                                    </Lefthead>
                                </Col>
                                <Col span={15}>
                                    <Righthead>
                                    </Righthead>
                                </Col>
                            </Row>
                        </Mainimage>
                        <Whole_wrap>    
                            <Blog_p>Latest Blogs</Blog_p><HR_tag/>
                            <Blogs_wrap>
                                <Row>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
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
                            <Blogs_wrap>
                                <Row>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
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
                            <Blogs_wrap>
                                <Row>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
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
                            <Blogs_wrap>
                                <Row>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
                                            className="Card-Blog"
                                        >
                                            <Meta
                                            title={<Meta_title>Bitcoin</Meta_title>}
                                            description={<Meta_desc>Savedroid-cryptocurrencies for everyone</Meta_desc>}
                                            />
                                        </Card>
                                    </Col>
                                    <Col style={{marginLeft:"30px",width:"370px",display:"inline-block"}}>
                                        <Card
                                            style={{ width: 300 }}
                                            cover={<img alt="example" height="195px" width="370px" src="./images/LandingCat/Blog/headImage.png" />}
                                            actions={[<Card_foot>Aug 14,2018</Card_foot>,<Card_foot>Varun Gregor</Card_foot>,<Card_foot>25 comments</Card_foot>]}
                                            bodyStyle={{paddingTop:"15px",paddingLeft: "25px",backgroundColor:"#f7f7f7",paddingBottom: "0px",paddingRight:"30px"}}
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
                            <Prev><i style={{verticalAlign:"middle"}} className="material-icons">keyboard_backspace</i><span style={{verticalAlign:"middle"}}>Previous Articles</span></Prev>
                            <Next><i style={{verticalAlign:"middle"}} className="material-icons">keyboard_backspace</i><span style={{verticalAlign:"middle"}}>Next Articles</span></Next>
                        </Prev_next>
                    </SectionBlog>
                </Container_Blog>
               
                <CommonFooter />
            </div>
        );
    }
}
                
export default Blog;