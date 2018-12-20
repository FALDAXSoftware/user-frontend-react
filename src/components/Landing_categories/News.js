import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Spin, Input } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals"
import { Spin_Ex } from '../../styled-components/homepage/style'
import {
    SectionBlog, Whole_news, Blogs_wrap, Meta_title, Card_foot, Prev_next, Prev, Next,
    CardCover, Inputsearch, Search_wrap, RemoveButton, NoData
} from '../../styled-components/landingCategories/blogStyle';

const Container_Blog = styled(Container)`
    margin-bottom: 80px;
`
const News_main = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "white"};
`
const { Meta } = Card;
const Search = Input.Search;

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
            searchV: '',
            removeflag: false,
            searchClass: '',
            blogCSS: ''
        }
    }
    componentDidMount() {
        if (this.props.location.search !== '') {
            var bPage = this.props.location.search.split("=")
            this.BlogDetails(bPage[1]);
        } else {
            this.BlogDetails(1);
        }
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme == false)
                    this.setState({ searchClass: "news-search", blogCSS: "Card-Blog" })
                else
                    this.setState({ searchClass: "news-search-night", blogCSS: "Card-Blog-night" })
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
                    this.setState({ searchClass: "news-search", blogCSS: "Card-Blog" })
                else
                    this.setState({ searchClass: "news-search-night", blogCSS: "Card-Blog-night" })
            }
        }
    }
    BlogDetails(curr, flag = null) {
        this.setState({ loader: true })
        var searchV = this.state.searchV;
        if (flag == true)
            searchV = ""
        var obj = {};
        obj['data'] = searchV
        //var Buff=Buffer.from(URI).toString('base64')
        fetch(globalVariables.API_URL + `/users/get-all-news?page=${curr}&limit=9`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(obj)
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    var numb = Number(curr)
                    this.setState({ nxtPage: numb + 1, blogsData: responseData, currPage: curr, prevPage: numb - 1, totalPage: Math.ceil(responseData.NewsCount / 9), loader: false })
                    if (searchV !== "") {
                        this.setState({ removeflag: true })
                    }
                }
            })
            .catch(error => { })

    }
    searchChange(e) {
        this.setState({ searchV: e.target.value });
    }
    submitSearch(e) {
        if (e.target.value.trim() !== "") {
            this.BlogDetails(1);
        }
    }
    removeSearch() {
        this.setState({ searchV: "", removeflag: false });
        this.BlogDetails(1, true);
    }

    render() {
        var _self = this;
        return (
            <News_main>
                <Navigation />

                <Container_Blog style={{ minHeight: "100%" }}>
                    <SectionBlog>
                        <Search_wrap>
                            <Inputsearch
                                placeholder="Search News"
                                onChange={value => this.searchChange(value)}
                                style={{ width: "100%" }}
                                className={this.state.searchClass}
                                onPressEnter={e => this.submitSearch(e)}
                                value={this.state.searchV}
                            />
                            {this.state.removeflag == true ? <RemoveButton onClick={this.removeSearch.bind(this)}>Remove Search <Icon type="close" /></RemoveButton> : ""}
                        </Search_wrap>
                        <Whole_news>
                            <Blogs_wrap>
                                <Row className="blog-card-row">

                                    {this.state.blogsData.data !== undefined ? this.state.blogsData.data.map(function (result, key, index) {
                                        var date = moment.utc(result.created_at).local().format("MMM DD, YYYY");
                                        var img = result.cover_image;
                                        var tag = result.tags ? result.tags.split(',') : [];
                                        return (
                                            <Col key={key} xl={8} lg={12} md={{ sapn: 12 }} sm={24} className="blog-card-col">
                                                <a href={result.link} target="_blank" title={result.title}>
                                                    <Card
                                                        style={{ width: "100%" }}
                                                        cover={<CardCover alt="example" style={{ backgroundImage: `url(${img})` }} />}
                                                        actions={[<Card_foot>{date}</Card_foot>, <Card_foot>{result.owner}</Card_foot>]}
                                                        bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                        className={_self.state.blogCSS}
                                                    >
                                                        <Meta
                                                            title={<Meta_title className="news-title">{result.title}</Meta_title>}
                                                        /*   */
                                                        />
                                                    </Card>
                                                </a>
                                            </Col>);
                                    }) : ""
                                    }
                                    {this.state.blogsData !== undefined && this.state.blogsData !== '' ? (this.state.blogsData.data.length == 0 ? <NoData>No Data Found</NoData> : "") : ""}
                                </Row>
                            </Blogs_wrap>
                        </Whole_news>
                        <Prev_next>
                            {(this.state.currPage > 1 && this.state.currPage <= this.state.totalPage) ? <Link to={`/news?newsPage=${this.state.nxtPage - 2}`}><Prev><i style={{ verticalAlign: "middle", textDecoration: "none" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev></Link> : ""}

                            {(this.state.nxtPage <= this.state.totalPage) ? <Link to={`/news?newsPage=${this.state.nxtPage}`}><Next><span style={{ verticalAlign: "middle", textDecoration: "none" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next></Link> : ""}
                        </Prev_next>
                    </SectionBlog>
                </Container_Blog>

                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </News_main>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return ({
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
    });
}

export default connect(mapStateToProps)(withRouter(Blog));
