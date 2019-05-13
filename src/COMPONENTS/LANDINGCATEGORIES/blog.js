import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Navigation from 'COMPONENTS/NAVIGATIONS/navigation';
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';
import { globalVariables } from "Globals"
import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style'
import {
    SectionBlog, WholeWrap,
    BlogP, HRTag, MetaTitle, MetaDesc, CardFoot, PrevNext, Prev, Next,
    MsgIcon, CardCover, BlogDesc1, ReadMore
} from 'STYLED-COMPONENTS/LANDING_CATEGORIES/blogStyle';
import { _BLOGICON, _DEFAULTBLOG } from "CONSTANTS/images";
import NoDataFound from "SHARED-COMPONENTS/No_data_found";
import ReactHtmlParser from "react-html-parser";
import Masonry from 'react-masonry-css'

const ContainerBlog = styled(Container)`
    margin-bottom: 80px;
`
const { Meta } = Card;
const BlogMainWrap = styled.div`
    background-color: ${props => props.theme.mode === "dark" ? "#01090f" : "white"};
`
const BlogTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode === "dark" ? "#ffffff" : "#333333"};
  &:before {
    content: '';
    width: calc(50% - 130px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: '';
    width: calc(50% - 130px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
`;

class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData: '',
            currPage: 1,
            prevPage: 1,
            totalPage: null,
            loader: false,
            nxtPage: 0,
            blogCSS: ''
        }
    }
    componentDidMount() {
        if (this.props.location.search !== this.state.nxtPage && this.props.location.search !== '') {
            var bPage = this.props.location.search.split("=")
            this.BlogDetails(bPage[1]);
        } else {
            this.BlogDetails(1);
        }
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme===false)
                    this.setState({ blogCSS: "Card-Blog" })
                else
                    this.setState({ blogCSS: "Card-Blog-night" })
            }
        }
    }
    componentWillReceiveProps(props, newProps) {
        if (props.location.search.split('=')[1] === this.state.nxtPage) {
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if (props.location.search.split('=')[1] === this.state.prevPage) {
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme===false)
                    this.setState({ blogCSS: "Card-Blog" })
                else
                    this.setState({ blogCSS: "Card-Blog-night" })
            }
        }
    }

    BlogDetails(curr) {
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + `/users/get-all-blogs?page=${curr - 1}`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ loader: false })
                if (responseData.status === 200) {
                    var numb = Number(curr)
                    this.setState({ nxtPage: numb + 1, blogsData: responseData.data.objects, currPage: curr, prevPage: numb - 1, totalPage: Math.ceil(responseData.data.total_count / 9) })
                }
            })
            .catch(error => {
                this.setState({ loader: false })
            })
    }

    render() {
        const breakpointColumnsObj = {
            default: 3,
            1100: 3,
            700: 2,
            500: 1
        };
        var _self = this;
        const { blogsData } = this.state;
        return (
            <BlogMainWrap>
                <Navigation />

                <ContainerBlog style={{ minHeight: "100%" }}>
                    <SectionBlog>
                        <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                            <BlogTitle> BLOG </BlogTitle>
                        </div>
                        <Row>
                            <Masonry
                                breakpointCols={breakpointColumnsObj}
                                originLeft={false}
                                className="my-masonry-grid"
                                columnClassName="my-masonry-grid_column">
                                {blogsData !== undefined ?
                                    blogsData.length > 0 ?
                                        blogsData.map(function (result, key, index) {
                                            var date = moment(result.publish_date).format('MMM DD,YYYY');
                                            var tag = result.tags ? result.tags.split(',') : [];
                                            if (result.is_published === true)
                                                return (
                                                    <div key={key} className="my-masonry-grid_column blog-card-col">
                                                        <Link to={`/blogDetails?blogID=${result.id}`}>
                                                            <Card
                                                                style={{ width: "100%" }}
                                                                cover={<CardCover alt="example" style={{ backgroundImage: `url(${result.featured_image ? result.featured_image : _DEFAULTBLOG})` }} />}
                                                                actions={[<CardFoot>{date}</CardFoot>, <CardFoot>{result.blog_author.display_name}</CardFoot>, <CardFoot> <MsgIcon src={_BLOGICON} />{result.comment_count} Comments</CardFoot>]}
                                                                bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                                className={_self.state.blogCSS}
                                                            >
                                                                <Meta
                                                                    title={<MetaTitle>{tag[0]}</MetaTitle>}
                                                                    description={<MetaDesc>
                                                                        {result.title}
                                                                        <BlogDesc1>
                                                                            {ReactHtmlParser(result.post_body.length > 280 ? result.post_body.substr(0, 280) + "..." : result.post_body)}
                                                                        </BlogDesc1>
                                                                        <ReadMore><a href={`/blogDetails?blogID=${result.id}`} class="button">Read more</a></ReadMore>
                                                                    </MetaDesc>}
                                                                />
                                                            </Card>
                                                        </Link>
                                                    </div>)
                                            else
                                                return ""
                                        }) : <NoDataFound title="blogs" /> : ""
                                }
                            </Masonry>
                        </Row>
                        {/* {blogsData !== '' ? Object.keys(blogsData.featuredBlog).length > 0 ?
                            <Mainimage>
                                <Row>
                                    <Col sm={24} md={12} lg={9} >

                                        <Link to={`/blogDetails?blogID=${blogsData.featuredBlog.id}`}>
                                            <Lefthead>
                                                <Subleft>
                                                    <Eco>{blogsData.featuredBlog.tags}</Eco>
                                                    <Head3>{blogsData.featuredBlog.title}</Head3>
                                                    <Eco2>{blogsData.featuredBlog.admin_name}</Eco2>
                                                </Subleft>
                                            </Lefthead>
                                        </Link>
                                    </Col>
                                    <Col sm={24} md={12} lg={15}>
                                        <Righthead image={globalVariables._AMAZONBUCKET + blogsData.featuredBlog.featured_image}>
                                        </Righthead>
                                    </Col>
                                </Row>
                            </Mainimage>
                            : "" : ""} */}
                        <WholeWrap>
                            {blogsData.featuredBlog !== undefined ? Object.keys(blogsData.featuredBlog).length > 0 ?
                                <Row>
                                    <Col span={3}>
                                        <BlogP>Latest Blogs</BlogP>
                                    </Col>
                                    <Col span={21}>
                                        <HRTag />
                                    </Col>
                                </Row>
                                : "" : ""}
                            {/* <Blogs_wrap>
                                <Row className="blog-card-row">
                                    {blogsData !== undefined ?
                                        blogsData.length > 0 ?
                                            blogsData.map(function (result, key, index) {
                                                var date = moment(result.publish_date).format('MMM DD, YYYY');
                                                var tag = result.tags ? result.tags.split(',') : [];
                                                if (result.is_published == true)
                                                    return (
                                                        <Col key={key} xl={8} lg={12} md={{ sapn: 12 }} sm={24} className="blog-card-col">
                                                            <Link to={`/blogDetails?blogID=${result.id}`}>
                                                                {console.log(result.featured_image, DefaultBlog)}
                                                                <Card
                                                                    style={{ width: "100%" }}
                                                                    cover={<CardCover alt="example" style={{ backgroundImage: `url(${result.featured_image ? result.featured_image : DefaultBlog})` }} />}
                                                                    actions={[<Card_foot>{date}</Card_foot>, <Card_foot className="auth-foot">{result.blog_author.display_name}</Card_foot>, <Card_foot className="comment-foot"> <MsgIcon src={_BLOGICON} />{result.comment_count} Comments</Card_foot>]}
                                                                    bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                                    className={_self.state.blogCSS}
                                                                >

                                                                    <Meta
                                                                        title={<Meta_title>{tag[0]}</Meta_title>}
                                                                        description={<Meta_desc>
                                                                            {result.title}
                                                                            <Blog_Desc1>
                                                                                {result.short_desc}
                                                                                <a href={`/blogDetails?blogID=${result.id}`} class="button">Read more</a>
                                                                            </Blog_Desc1>
                                                                        </Meta_desc>}
                                                                    />
                                                                </Card>
                                                            </Link>
                                                        </Col>)
                                                else
                                                    return ""
                                            }) : <NoDataFound title="blogs" /> : ""

                                    }
                                </Row>
                            </Blogs_wrap> */}
                        </WholeWrap>
                        <PrevNext>
                            {(this.state.currPage > 1 && this.state.currPage <= this.state.totalPage) ? <Link to={`/blogs?blogPage=${this.state.nxtPage - 2}`}><Prev><i style={{ verticalAlign: "middle", textDecoration: "none" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev></Link> : ""}

                            {(this.state.nxtPage <= this.state.totalPage) ? <Link to={`/blogs?blogPage=${this.state.nxtPage}`}><Next><span style={{ verticalAlign: "middle", textDecoration: "none" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next></Link> : ""}
                        </PrevNext>
                    </SectionBlog>
                </ContainerBlog>

                <CommonFooter />
                {(this.state.loader) ? <SpinEx className="Ex_spin">
                    <Spin size="large" />
                </SpinEx> : ""}
            </BlogMainWrap>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}
export default connect(mapStateToProps)(withRouter(Blog));