import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals"
import { Spin_Ex } from '../../styled-components/homepage/style'
import {
    SectionBlog, Mainimage, Lefthead, Subleft, Eco, Head3, Eco2, Righthead, Whole_wrap,
    Blog_p, Blogs_wrap, HR_tag, Meta_title, Meta_desc, Card_foot, Prev_next, Prev, Next,
    MsgIcon, CardCover
} from '../../styled-components/landingCategories/blogStyle';
import { BlogIcon } from "../../Constants/images";
import NoDataFound from "../../shared-components/No_data_found";

const Container_Blog = styled(Container)`
    margin-bottom: 80px;
`
const { Meta } = Card;
const Blog_main_wrap = styled.div`
    background-color: ${props => props.theme.mode == "dark" ? "#01090f" : "white"};
`
const BlogTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color:${props => props.theme.mode == "dark" ? "#ffffff" : "#333333"};
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
                if (this.props.theme == false)
                    this.setState({ blogCSS: "Card-Blog" })
                else
                    this.setState({ blogCSS: "Card-Blog-night" })
            }
        }
    }
    componentWillReceiveProps(props, newProps) {
        if (props.location.search.split('=')[1] == this.state.nxtPage) {
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if (props.location.search.split('=')[1] == this.state.prevPage) {
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if (props.theme !== undefined) {
            if (props.theme !== this.state.theme) {
                if (props.theme == false)
                    this.setState({ blogCSS: "Card-Blog" })
                else
                    this.setState({ blogCSS: "Card-Blog-night" })
            }
        }
    }

    BlogDetails(curr) {
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + `/users/get-all-blogs?page=${curr}&limit=9`, {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    var numb = Number(curr)
                    this.setState({ nxtPage: numb + 1, blogsData: responseData, currPage: curr, prevPage: numb - 1, totalPage: Math.ceil(responseData.BlogCount / 9), loader: false })
                }
            })
            .catch(error => { })
    }

    render() {
        var _self = this;
        const { blogsData } = this.state;
        return (
            <Blog_main_wrap>
                <Navigation />

                <Container_Blog style={{ minHeight: "100%" }}>
                    <SectionBlog>
                        <div style={{ display: 'inline-block', width: '100%', position: 'relative' }}>
                            <BlogTitle> BLOG </BlogTitle>
                        </div>
                        <Mainimage>
                            <Row>
                                <Col sm={24} md={12} lg={9} >
                                    {blogsData !== '' ? Object.keys(blogsData.featuredBlog).length > 0 ?
                                        <Link to={`/blogDetails?blogID=${blogsData.featuredBlog.id}`}>
                                            <Lefthead>
                                                <Subleft>
                                                    <Eco>{blogsData.featuredBlog.tags}</Eco>
                                                    <Head3>{blogsData.featuredBlog.title}</Head3>
                                                    <Eco2>{blogsData.featuredBlog.admin_name}</Eco2>
                                                </Subleft>
                                            </Lefthead>
                                        </Link>
                                        : "" : ""}
                                </Col>
                                {blogsData !== '' ? Object.keys(blogsData.featuredBlog).length > 0 ?
                                    <Col sm={24} md={12} lg={15}>
                                        <Righthead image={globalVariables.amazon_Bucket + blogsData.featuredBlog.cover_image}>
                                        </Righthead>
                                    </Col> : "" : ""}
                            </Row>
                        </Mainimage>
                        <Whole_wrap>
                            {blogsData && blogsData.data.length > 0 ?
                                <Row>
                                    <Col span={3}>
                                        <Blog_p>Latest Blogs</Blog_p>
                                    </Col>
                                    <Col span={21}>
                                        <HR_tag />
                                    </Col>
                                </Row>
                                : ""}
                            <Blogs_wrap>
                                <Row className="blog-card-row">
                                    {blogsData.data !== undefined ?
                                        blogsData.data.length > 0 ?
                                            blogsData.data.map(function (result, key, index) {
                                                var date = moment.utc(result.created_at).local().format("MMM DD,YYYY");
                                                var img = globalVariables.amazon_Bucket + result.cover_image;
                                                var tag = result.tags ? result.tags.split(',') : [];
                                                return (
                                                    <Col key={key} xl={8} lg={12} md={{ sapn: 12 }} sm={24} className="blog-card-col">
                                                        <Link to={`/blogDetails?blogID=${result.id}`}>
                                                            <Card
                                                                style={{ width: "100%" }}
                                                                cover={<CardCover alt="example" style={{ backgroundImage: `url(${img})` }} />}
                                                                actions={[<Card_foot>{date}</Card_foot>, <Card_foot>{result.admin_name}</Card_foot>, <Card_foot> <MsgIcon src={BlogIcon} />{result.comment_count} Comments</Card_foot>]}
                                                                bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                                className={_self.state.blogCSS}
                                                            >
                                                                <Meta
                                                                    title={<Meta_title>{tag[0]}</Meta_title>}
                                                                    description={<Meta_desc>{result.title}</Meta_desc>}
                                                                />
                                                            </Card>
                                                        </Link>
                                                    </Col>);
                                            }) : <NoDataFound title="blogs" /> : ""
                                    }
                                </Row>
                            </Blogs_wrap>
                        </Whole_wrap>
                        <Prev_next>
                            {(this.state.currPage > 1 && this.state.currPage <= this.state.totalPage) ? <Link to={`/blogs?blogPage=${this.state.nxtPage - 2}`}><Prev><i style={{ verticalAlign: "middle", textDecoration: "none" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev></Link> : ""}

                            {(this.state.nxtPage <= this.state.totalPage) ? <Link to={`/blogs?blogPage=${this.state.nxtPage}`}><Next><span style={{ verticalAlign: "middle", textDecoration: "none" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next></Link> : ""}
                        </Prev_next>
                    </SectionBlog>
                </Container_Blog>

                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Blog_main_wrap>
        );
    }
}
function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}
export default connect(mapStateToProps)(withRouter(Blog));