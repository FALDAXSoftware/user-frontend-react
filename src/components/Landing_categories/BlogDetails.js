import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Spin } from 'antd';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import BlogComments from './BlogComments'
import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals";
import { Spin_Ex } from '../../styled-components/homepage/style'
import {
    BD_mainWrap, Meta_title, Blog_desc, Status, Date, Name, Comment, Head_image, Left_col,
    PostHead_span, PostHead_below, Right_Col, MsgIcon, SocialHead, Social_Li, LI1, LI2,
    Main_Wrap, Sub_wrap, Rel_post, Rel_img, Rel_p, Rel_name, Rel_span, TagSpan
} from '../../styled-components/landingCategories/blogStyle';
import {
    _FBICON, _YOUTUBEICON, _LINKEDINICON, _TWEETERICON, _GOOGLEICON, _BLOGICON
} from '../../Constants/images';

class BlogDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData: null,
            loader: false,
            relatedPosts: [],
            blogID: '',
            contactDetails: null
        }
    }
    componentWillReceiveProps(props, newProps) {
        var ID = props.location.search.split('=');
        if (ID[1] !== this.state.blogID) {
            this.blogsMethod(ID[1]);
        }
    }
    blogsMethod(blogID) {
        var Obj = {}; Obj['id'] = blogID
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + '/users/get-blog-detail', {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Obj)
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ loader: false, blogsData: JSON.parse(responseData.data.body), blogID: blogID })
            })
            .catch(error => {
            })
        var ObjRel = {}; ObjRel['blog_id'] = blogID
        // fetch(globalVariables.API_URL + '/get-related-blog', {
        //     method: "post",
        //     headers: {
        //         Accept: 'application/json',
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(ObjRel)
        // })
        //     .then(response => response.json())
        //     .then((responseData) => {
        //         console.log('>>>>responseData', responseData)
        //         this.setState({ relatedPosts: responseData.data.blogs, loader: false })
        //     })
        //     .catch(error => {
        //     })
    }
    componentDidMount() {
        var blogID = null;
        if (this.props.location.search !== '') {
            blogID = this.props.location.search.split('=');
            this.blogsMethod(blogID[1]);
        }
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + '/get-contact-details', {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {

                this.setState({ contactDetails: responseData.data, loader: false });
            })
            .catch(error => {
                console.log(error)
            })
    }

    render() {
        const { contactDetails } = this.state;
        //var Tags = this.state.blogsData !== undefined && this.state.blogsData !== '' && this.state.blogsData !== null ? (this.state.blogsData.tags !== null ? this.state.blogsData.tags.split(',') : "") : "";

        return (
            <div>
                <Navigation />
                <Container>
                    {this.state.blogsData !== null ?
                        <BD_mainWrap>
                            <Row>
                                <Col sm={24} md={24} lg={24} xl={17} xxl={17}>
                                    <Left_col>
                                        {/* <Meta_title>{this.state.blogsData.tags.split(',')[0]}</Meta_title> */}
                                        <Blog_desc>{this.state.blogsData.title}</Blog_desc>
                                        <Status className="blog-date">
                                            <Date>{moment.utc(this.state.blogsData.created_at).local().format("MMM DD,YYYY")}</Date>
                                        </Status>
                                        <Status>
                                            <Name>{this.state.blogsData.author_name}
                                            </Name>
                                        </Status>
                                        <Status className="blog-comment">
                                            <Comment><MsgIcon src={_BLOGICON} />{this.state.blogsData.comment_count} Comments</Comment>
                                        </Status>
                                        <Head_image image={`${this.state.blogsData.featured_image}`} />
                                        <div>
                                            {ReactHtmlParser(this.state.blogsData.post_body)}
                                        </div>
                                        {/* <div style={{ marginTop: "30px", marginBottom: "50px" }}>
                                            <h2 style={{ marginBottom: "30px" }}>Tags</h2>
                                            {Tags !== '' ? Tags.map(function (Tag) {
                                                return (
                                                    <TagSpan>{Tag}</TagSpan>
                                                );
                                            }) : ""}
                                        </div> */}
                                        {this.state.relatedPosts.length > 0 ?
                                            <div>
                                                <PostHead_below>
                                                    <PostHead_span>Related Posts</PostHead_span>
                                                </PostHead_below>
                                                <Main_Wrap>
                                                    <Sub_wrap>
                                                        <Row>
                                                            {this.state.relatedPosts.length > 0 ?
                                                                this.state.relatedPosts.map(function (temp, index) {
                                                                    var date = moment.utc(temp.created_at).local().format("MMM DD,YYYY");
                                                                    return (
                                                                        <Col sm={24} md={8}>
                                                                            <Link to={`/blogDetails?blogID=${temp.id}`}>
                                                                                <Rel_post>
                                                                                    <Rel_img style={{ backgroundImage: `url(${globalVariables._AMAZONBUCKET + temp.cover_image})` }}>
                                                                                    </Rel_img>
                                                                                    <Rel_p>{temp.title}</Rel_p>
                                                                                    <Rel_span>{date}</Rel_span>
                                                                                    <Rel_name>{temp.admin_name}</Rel_name>
                                                                                </Rel_post>
                                                                            </Link>
                                                                        </Col>
                                                                    );
                                                                })
                                                                : ""}
                                                        </Row>
                                                    </Sub_wrap>
                                                </Main_Wrap>
                                            </div>
                                            : ""}
                                        <BlogComments blogID={this.state.blogID} />
                                    </Left_col>
                                </Col>
                                <Right_Col xl={7} xxl={7}>
                                    {/* <PostHead>
                                        <PostHead_span>Related Posts</PostHead_span>
                                    </PostHead>
                                    <Main_Wrap>
                                                    <Sub_wrap_right>
                                                        <Row>
                                                            <Col span={12}>
                                                                <Rel_img_right style={{backgroundImage:`url("/images/temp_img.png")`}}>
                                                                </Rel_img_right>
                                                            </Col>
                                                            <Col span={12}>
                                                                <Rel_p_right>Crowdfire Founders Plan To Launch Indian Bitcoin Exchange</Rel_p_right>
                                                                <Rel_span_right>Aug 18,2018</Rel_span_right>
                                                            </Col>
                                                        </Row>
                                                    </Sub_wrap_right>
                                        </Main_Wrap> */}
                                    {/* <SocialHead>
                                        <PostHead_span>Social Links</PostHead_span>
                                    </SocialHead>
                                    {contactDetails !== null ? <Social_Li>
                                        <LI1>
                                            <a target="_blank" href={contactDetails.fb_profile}><img width="40" height="40" src={_FBICON} /></a>
                                        </LI1>
                                        <LI2>
                                            <a target="_blank" href={contactDetails.twitter_profile}><img width="40" height="40" src={_TWEETERICON} /></a>
                                        </LI2>
                                        <LI2>
                                            <a target="_blank" href={contactDetails.google_profile}><img width="40" height="40" src={_GOOGLEICON} /></a>
                                        </LI2>
                                        <LI2>
                                            <a target="_blank" href={contactDetails.youtube_profile}><img width="40" height="40" src={_YOUTUBEICON} /></a>
                                        </LI2>
                                        <LI2>
                                            <a target="_blank" href={contactDetails.linkedin_profile}><img width="40" height="40" src={_LINKEDINICON} /></a>
                                        </LI2>
                                    </Social_Li> : ""} */}
                                </Right_Col>
                            </Row>
                        </BD_mainWrap>
                        : ""}
                </Container>
                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </div>
        );
    }
}

export default withRouter(BlogDetails);
