import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Button , Row, Col, Card, Icon, Avatar,Spin,Input } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals"
import {Spin_Ex} from '../../styled-components/homepage/style'
import { SectionBlog, Mainimage, Lefthead, Subleft, Eco, Head3, Eco2, Righthead, Whole_wrap, Blog_p, Blogs_wrap, HR_tag, Meta_title, Meta_desc, Card_foot, Prev_next, Prev, Next, MsgIcon, CardCover,Inputsearch } from '../../styled-components/landingCategories/blogStyle';

const Container_Blog = styled(Container)`
    margin-bottom: 80px;
`
const { Meta } = Card;
const Search = Input.Search;

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData : '',
            currPage:1,
            prevPage:1,
            totalPage:null,
            loader:false,
            nxtPage:0,
            searchV:''
        }
    }
    componentDidMount()
    {
        if(this.props.location.search!=='')
        {
            var bPage = this.props.location.search.split("=")
            this.BlogDetails(bPage[1]);
        }
        else
        {
            this.BlogDetails(1);
        }
    }
    componentWillReceiveProps(props,newProps)
    {
        if(props.location.search.split('=')[1]==this.state.nxtPage)
        {
            console.log("if props",this.state)
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if(props.location.search.split('=')[1]==this.state.prevPage)
        {
            console.log("else props",this.state)
            this.BlogDetails(props.location.search.split('=')[1]);
        }
    }
    BlogDetails(curr,flag=null)
    {
        this.setState({loader:true})
        var searchV = this.state.searchV;
        if(flag==true)
        searchV=""
        fetch(globalVariables.API_URL + `/users/get-all-news?page=${curr}&limit=9&data=${searchV}`,{
            method:"get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            if(responseData.status==200)
            {
                var numb = Number(curr)
                this.setState({nxtPage:numb+1,blogsData: responseData,currPage:curr,prevPage:numb-1,totalPage:Math.ceil(responseData.NewsCount/9),loader:false})
            }
        })
        .catch(error => { /* console.log(error) */ })

    }
    searchChange(e)
    {
        console.log(e.target.value)
        this.setState({searchV:e.target.value});
       
    }
    submitSearch(e)
    {
        if(e.target.value.trim()!=="")
        {
            this.BlogDetails(this.state.currPage);
        }
    }
    removeSearch()
    { this.setState({searchV:""});
        this.BlogDetails(1,true);
    }
    render() {
        return (
            <div>
                <Navigation />

                <Container_Blog style={{ minHeight: "100%" }}>
                    <SectionBlog>
                        <div>
                            <Inputsearch
                            placeholder="search news"
                            onChange={value => this.searchChange(value)}
                            style={{ width: "100%" }}
                            className="news-search"
                            onPressEnter={e => this.submitSearch(e)}
                            value={this.state.searchV}
                            />
                            <Button onClick={this.removeSearch.bind(this)}>Remove Search</Button>
                        </div>
                        <Whole_wrap>
                            <Blogs_wrap>
                                <Row className="blog-card-row">

                                {this.state.blogsData.data !== undefined?this.state.blogsData.data.map(function(result,key,index){
                                        var date=moment.utc(result.created_at).local().format("MMM DD,YYYY");
                                        var img = result.cover_image;
                                        var tag = result.tags ? result.tags.split(',') : [];
                                    return(
                                        <Col key={key} xl={8} lg={12} md={{sapn:12}} sm={24}  className="blog-card-col">
                                            <a href={result.link}>
                                                <Card
                                                    style={{ width: "100%" }}
                                                    cover={<CardCover alt="example" style={{ backgroundImage: `url(${img})` }} />}
                                                    actions={[<Card_foot>{date}</Card_foot>, <Card_foot>{result.owner}</Card_foot>]}
                                                    bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                    className="Card-Blog"
                                                >
                                                    <Meta
                                                        title={<Meta_title className="news-title">{result.title}</Meta_title>}
                                                        /*   */
                                                    />
                                                </Card>
                                            </a>
                                        </Col>);
                                    }):""
                                }

                                </Row>
                            </Blogs_wrap>
                        </Whole_wrap>
                        <Prev_next>
                            {console.log(this.state.currPage,this.state.totalPage,this.state.nxtPage)}
                            {(this.state.currPage>1 && this.state.currPage<=this.state.totalPage)?<Link to={`/news?newsPage=${this.state.nxtPage-2}`}><Prev><i style={{ verticalAlign: "middle",textDecoration:"none" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev></Link>:""}

                            {(this.state.nxtPage<=this.state.totalPage)?<Link to={`/news?newsPage=${this.state.nxtPage}`}><Next><span style={{ verticalAlign: "middle",textDecoration:"none" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next></Link>:""}
                        </Prev_next>
                    </SectionBlog>
                </Container_Blog>

                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </div>
        );
    }
}

export default connect()(withRouter(Blog));