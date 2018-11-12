import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';

import Navigation from '../Navigations/Navigation';
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { globalVariables } from "../../Globals"
import {Spin_Ex} from '../../styled-components/homepage/style'
import { SectionBlog, Mainimage, Lefthead, Subleft, Eco, Head3, Eco2, Righthead, Whole_wrap, Blog_p, Blogs_wrap, HR_tag, Meta_title, Meta_desc, Card_foot, Prev_next, Prev, Next, MsgIcon, CardCover } from '../../styled-components/landingCategories/blogStyle';

const Container_Blog = styled(Container)`
    margin-bottom: 80px;
`
const { Meta } = Card;

class Blog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blogsData : '',
            currPage:1,
            prevPage:1,
            totalPage:null,
            loader:false,
            nxtPage:0
        }
    }
    componentDidMount()
    {
        console.log(this.props,(this.props.match.params.blogPage!==this.state.nxtPage))
        if(this.props.location.search!==this.state.nxtPage && this.props.location.search!=='')
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
        console.log(this.state.prevPage,this.state.currPage,this.state.nxtPage)
        if(props.location.search.split('=')[1]==this.state.nxtPage)
        {
            console.log(props.location.search.split('=')[1],this.state.nxtPage);
            this.BlogDetails(props.location.search.split('=')[1]);
        }
        if(props.location.search.split('=')[1]==this.state.prevPage)
        {
            console.log(props.location.search.split('=')[1],this.state.nxtPage);
            this.BlogDetails(props.location.search.split('=')[1]);
        }
    }
    BlogDetails(curr)
    {
        this.setState({loader:true})
        console.log(curr)
        fetch(globalVariables.API_URL + `/users/get-all-blogs?page=${curr}&limit=2`,{
            method:"get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then((responseData) => {
            console.log("I m in API get",responseData)
            if(responseData.status==200)
            {
                var numb = Number(curr)
                console.log(numb)
                this.setState({nxtPage:numb+1,blogsData: responseData,currPage:curr,prevPage:numb-1,totalPage:responseData.BlogCount/2,loader:false})
            }
        })
        .catch(error => { /* console.log(error) */ })

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
                                <Col sm={24} md={12} lg={9} >
                                    <Lefthead>
                                        <Subleft>
                                            <Eco>Economy</Eco>
                                            <Head3>India’s Most Popular Chat App Launching Cryptocurrency Exchange</Head3>
                                            <Eco2>Vrun Gregor</Eco2>
                                        </Subleft>
                                    </Lefthead>
                                </Col>
                                <Col sm={24} md={12} lg={15}>
                                    <Righthead>
                                    </Righthead>
                                </Col>
                            </Row>
                        </Mainimage>
                        <Whole_wrap>
                            <Row>
                                <Col span={3}>
                                    <Blog_p>Latest Blogs</Blog_p>
                                </Col> 
                                <Col span={21}>   
                                    <HR_tag />
                                </Col>
                            </Row>
                            <Blogs_wrap>
                                <Row className="blog-card-row">

                                {this.state.blogsData.data !== undefined?this.state.blogsData.data.map(function(result,key,index){
                                        console.log(result,key,index,moment.utc(result.created_at).local().format("MMM DD,YYYY"));
                                        var date=moment.utc(result.created_at).local().format("MMM DD,YYYY");
                                        var img = globalVariables.amazon_Bucket + result.cover_image;
                                        var tag = result.tags ? result.tags.split(',') : [];
                                        console.log(tag)
                                    return(
                                        <Col key={key} xl={8} lg={12} md={{sapn:12}} sm={24}  className="blog-card-col">
                                            <Link to={`/blogDetails?blogID=${result.id}`}>
                                            <Card
                                                style={{ width: "100%" }}
                                                cover={<CardCover alt="example" style={{ backgroundImage: `url(${img})` }} />}
                                                actions={[<Card_foot>{date}</Card_foot>, <Card_foot>{result.admin_name}</Card_foot>, <Card_foot> <MsgIcon src="/images/LandingCat/Blog/msg-icon.png" /> 25 comments</Card_foot>]}
                                                bodyStyle={{ paddingTop: "15px", paddingLeft: "25px", backgroundColor: "#f7f7f7", paddingBottom: "0px", paddingRight: "30px" }}
                                                className="Card-Blog"
                                            >
                                                <Meta
                                                    title={<Meta_title>{tag[0]}</Meta_title>}
                                                    description={<Meta_desc>{result.title}</Meta_desc>}
                                                />
                                            </Card>
                                            </Link>
                                        </Col>);
                                    }):""
                                }

                                </Row>
                            </Blogs_wrap>
                        </Whole_wrap>
                        <Prev_next>
                            {console.log(this.state.prevPage,this.state.currPage,this.state.nxtPage,">>>>>>>",this.state.totalPage)}
                            {(this.state.currPage>1 && this.state.currPage<this.state.totalPage)?<Link to={`/blogs?blogPage=${this.state.nxtPage-2}`}><Prev><i style={{ verticalAlign: "middle",textDecoration:"none" }} className="material-icons">keyboard_backspace</i><span style={{ verticalAlign: "middle" }}>Previous Articles</span></Prev></Link>:""}

                            {(this.state.nxtPage<=this.state.totalPage)?<Link to={`/blogs?blogPage=${this.state.nxtPage}`}><Next><span style={{ verticalAlign: "middle",textDecoration:"none" }}>Next Articles</span><i style={{ verticalAlign: "middle", transform: "rotate(180deg)" }} className="material-icons">keyboard_backspace</i></Next></Link>:""}
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