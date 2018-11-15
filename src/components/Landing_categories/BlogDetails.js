import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals"
import {Spin_Ex} from '../../styled-components/homepage/style'
import {BD_mainWrap,Meta_title,Blog_desc,PostHead,Status,Date,Name,Comment,Head_image,Left_col,PostHead_span,PostHead_below,Right_Col,MsgIcon,SocialHead,Social_Li,LI1,LI2} from '../../styled-components/landingCategories/blogStyle';

class BlogDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData : null,
            loader:false,
        }
    }
    componentDidMount()
    {
        console.log(this.props)
        var blogID = null;
        if(this.props.location.search!=='')
        {
            blogID = this.props.location.search.split('=');
            var Obj = {}; Obj['id'] = blogID[1]
            this.setState({loader:false})
            fetch(globalVariables.API_URL + '/users/get-blog-detail',{
                method:"post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(Obj)
            })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({loader:false,blogsData:responseData.data})
            })
            .catch(error => {
                console.log(error)
            })
        }
        
    }
    render()
    {
        return(
            <div>
                <Navigation />
                    <Container>
                        {this.state.blogsData!== null?
                        <BD_mainWrap>
                            <Row>
                                <Col sm={24} md={24} lg={24} xl={17} xxl={17}>
                                    <Left_col>
                                        <Meta_title>{this.state.blogsData.tags.split(',')[0]}</Meta_title>
                                        <Blog_desc>{this.state.blogsData.title}</Blog_desc>
                                        <Status className="blog-date">
                                            <Date>{moment.utc(this.state.blogsData.created_at).local().format("MMM DD,YYYY")}</Date>
                                        </Status>
                                        <Status>
                                            <Name>{this.state.blogsData.admin_name}
                                            </Name>
                                        </Status>
                                        <Status className="blog-comment">
                                            <Comment><MsgIcon src="/images/LandingCat/Blog/msg-icon.png" />25 Comment</Comment>
                                        </Status>
                                        <Head_image image={`${globalVariables.amazon_Bucket + this.state.blogsData.cover_image}`}/>
                                        <div>
                                            {ReactHtmlParser(this.state.blogsData.description)}
                                        </div>
                                        <PostHead_below>
                                                <PostHead_span>Related Posts</PostHead_span>
                                        </PostHead_below>
                                        
                                    </Left_col>
                                </Col>     
                                <Right_Col xl={7} xxl={7}>
                                    <PostHead>
                                        <PostHead_span>Related Posts</PostHead_span>
                                    </PostHead>
                                    <SocialHead>
                                        <PostHead_span>Social Links</PostHead_span>
                                    </SocialHead>
                                    <Social_Li>
                                        <LI1>
                                            <img width="40" height="40" src="/images/LandingCat/Blog/fb_icon.png"/>
                                        </LI1>
                                        <LI2>
                                            <img width="40" height="40" src="/images/LandingCat/Blog/tweet_icon.png"/>
                                        </LI2>
                                        <LI2>
                                            <img width="40" height="40" src="/images/LandingCat/Blog/google_icon.png"/>
                                        </LI2>
                                        <LI2>
                                            <img width="40" height="40" src="/images/LandingCat/Blog/you_icon.png"/>
                                        </LI2>
                                        <LI2>
                                            <img width="40" height="40" src="/images/LandingCat/Blog/In_icon.png"/>
                                        </LI2>
                                    </Social_Li>
                                </Right_Col>
                            </Row>
                        </BD_mainWrap>
                        :""}
                    </Container>
                <CommonFooter/>
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </div>
        );
    }
}

export default BlogDetails;