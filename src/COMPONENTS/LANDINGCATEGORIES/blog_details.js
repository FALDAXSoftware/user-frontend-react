import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { Row, Col, Spin } from 'antd';
import moment from 'moment';
import ReactHtmlParser from 'react-html-parser';
import BlogComments from './blog_comments'
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import { globalVariables } from "Globals.js";
import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style'
import {
    BDMainWrap, MetaTitle, BlogDesc2, Status, Date, Name, Comment, HeadImage, LeftCol,
    PostHeadSpan, PostHeadBelow, RightCol, MsgIcon, SocialHead, SocialLi, LI1, LI2,
    MainWrap, SubWrap, RelPost, RelImg, RelP, RelName, RelSpan, TagSpan
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/blogStyle';
import {
    _FBICON, _YOUTUBEICON, _LINKEDINICON, _TWEETERICON, _GOOGLEICON, _BLOGICON
} from 'CONSTANTS/images';

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
    /* Life Cycle Methods */
    componentWillReceiveProps(props, newProps) {
        var ID = props.location.search.split('=');
        if (ID[1] !== this.state.blogID) {
            this.blogsMethod(ID[1]);
        }
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
                // console.log(error)
            })
    }

    /*  
        Page:/blogDetails
        This method is called to get a particular blog detail.
    */

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

    render() {
        const { contactDetails } = this.state;
        //var Tags = this.state.blogsData !== undefined && this.state.blogsData !== '' && this.state.blogsData !== null ? (this.state.blogsData.tags !== null ? this.state.blogsData.tags.split(',') : "") : "";

        return (
            <div>
                <Navigation />
                <Container>
                    {this.state.blogsData !== null ?
                        <BDMainWrap>
                            <Row>
                                <Col sm={24} md={24} lg={24} xl={17} xxl={17}>
                                    <LeftCol>
                                        {/* <Meta_title>{this.state.blogsData.tags.split(',')[0]}</Meta_title> */}
                                        <BlogDesc2>{this.state.blogsData.title}</BlogDesc2>
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
                                        <HeadImage image={`${this.state.blogsData.featured_image}`} />
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
                                                <PostHeadBelow>
                                                    <PostHeadSpan>Related Posts</PostHeadSpan>
                                                </PostHeadBelow>
                                                <MainWrap>
                                                    <SubWrap>
                                                        <Row>
                                                            {this.state.relatedPosts.length > 0 ?
                                                                this.state.relatedPosts.map(function (temp, index) {
                                                                    var date = moment.utc(temp.created_at).local().format("MMM DD,YYYY");
                                                                    return (
                                                                        <Col sm={24} md={8}>
                                                                            <Link to={`/blogDetails?blogID=${temp.id}`}>
                                                                                <RelPost>
                                                                                    <RelImg style={{ backgroundImage: `url(${globalVariables._AMAZONBUCKET + temp.cover_image})` }}>
                                                                                    </RelImg>
                                                                                    <RelP>{temp.title}</RelP>
                                                                                    <RelSpan>{date}</RelSpan>
                                                                                    <RelName>{temp.admin_name}</RelName>
                                                                                </RelPost>
                                                                            </Link>
                                                                        </Col>
                                                                    );
                                                                })
                                                                : ""}
                                                        </Row>
                                                    </SubWrap>
                                                </MainWrap>
                                            </div>
                                            : ""}
                                        <BlogComments blogID={this.state.blogID} />
                                    </LeftCol>
                                </Col>
                                <RightCol xl={7} xxl={7}>
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
                                </RightCol>
                            </Row>
                        </BDMainWrap>
                        : ""}
                </Container>
                <CommonFooter />
                {(this.state.loader) ? <SpinEx className="Ex_spin">
                    <Spin size="large" />
                </SpinEx> : ""}
            </div>
        );
    }
}

export default withRouter(BlogDetails);
