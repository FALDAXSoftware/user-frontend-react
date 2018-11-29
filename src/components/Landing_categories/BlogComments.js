import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import {Spin_Ex} from '../../styled-components/homepage/style'
import { globalVariables } from "../../Globals"
import {PostHead_below,Comment_box,PostHead_span,Commentspan,Comment_button,CommentArea,AllComments,Comment_wrap,CommentImage,Comment_span,Comment_p,Comment_text,Comment_main,Comment_msg,Viewmore,PostHead_below_comment,PerComment} from "../../styled-components/landingCategories/blogStyle"



class BlogComments extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            comments:[],
            commentcount:null,
            commentTemp:null,
            showMsg:false,
            blogID:"",
            page:1,
            total:0,
            loader:false
        };
    }
    componentWillReceiveProps(props,newProps)
    {
        this.getComments(props.blogID);
    }
    getComments(blogID)
    {
        var Obj =  {};
        Obj['blog_id'] = blogID;
        if(blogID!=='')
        {
            this.setState({loader:true})
            fetch(globalVariables.API_URL + `/get-comments?page=1&limit=10`,{
                method:"post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(Obj)
            })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({comments:responseData.data.comments,commentcount:responseData.data.commentCount,blogID:blogID,total:responseData.data.commentCount/10,loader:false});
            })
            .catch(error => { })
        }
    }
    componentDidMount()
    {
        this.getComments(this.props.blogID);
    }
    onCommentChange(e)
    {
        this.setState({commentTemp:e.target.value,showMsg:false});
    }
    viewMore()
    {
        var page = this.state.page + 1 ;
        var Obj =  {};
        Obj['blog_id'] = this.state.blogID;
        this.setState({loader:true})
        fetch(globalVariables.API_URL + `/get-comments?page=${page}&limit=10`,{
            method:"post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(Obj)
        })
        .then(response => response.json())
        .then((responseData) => {
            this.setState({page:page,comments:this.state.comments.concat(responseData.data.comments),total:responseData.data.commentCount/10,loader:false});
        })
        .catch(error => {  })
    }
    onSubmit()
    {
        if(this.state.commentTemp.trim()!=="")
        {   
        var obj = {};
        obj["blog_id"] = this.state.blogID;
        obj['comment'] = this.state.commentTemp;
        this.setState({loader:true})
        fetch(globalVariables.API_URL + `/add-comments`,{
            method:"post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization : "Bearer " + this.props.simpleReducer.isLoggedIn
            },
            body:JSON.stringify(obj)
        })
        .then(response => response.json())
        .then((responseData) => {
            var obj1 = {};
            obj1["blog_id"] = this.state.blogID;
            fetch(globalVariables.API_URL + `/get-comments?page=1&limit=10`,{
                method:"post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify(obj1)
            })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({comments:responseData.data.comments,commentcount:responseData.data.commentCount,total:responseData.data.commentCount/10,page:1,loader:false,commentTemp:""});
            })
            .catch(error => {  })
        })
        .catch(error => {  })
        }
        else
        this.setState({showMsg:true});
    }
    render()
    {
        return(
            <div>
                {this.state.comments.length>0?
                <PostHead_below>
                    <PostHead_span>Comments ({this.state.commentcount})</PostHead_span>
                </PostHead_below>:""}
                <AllComments>
                    {this.state.comments.length>0?
                    this.state.comments.map(function(temp,index){
                        var date=moment.utc(temp.created_at).local().format("MMM DD,YYYY");
                        return(
                            <Comment_main>
                                <Comment_wrap>
                                    <CommentImage style={{backgroundImage:`url(${globalVariables.amazon_Bucket+temp.userDetails.profile_pic})`}}/>
                                    <Comment_text>
                                        <Comment_span>{temp.userDetails.first_name+" "+temp.userDetails.last_name}</Comment_span>
                                        <Comment_p>{date}</Comment_p>
                                    </Comment_text>
                                
                                </Comment_wrap>
                                <PostHead_below_comment>
                                    <PerComment>{temp.comment}</PerComment>
                                </PostHead_below_comment>
                            </Comment_main>
                        );
                    })
                    :""}
                    {this.state.total>this.state.page?<Viewmore onClick={this.viewMore.bind(this)}>View More</Viewmore>:""}
                </AllComments>
                {this.props.isLoggedIn?
                <Comment_box>
                    <Commentspan>Leave a Comment</Commentspan>
                    <CommentArea value={this.state.commentTemp} onChange={this.onCommentChange.bind(this)} placeholder="Comment" rows='5' cols='60'></CommentArea>
                    {this.state.showMsg==true?<Comment_msg>Please enter your comment in above field</Comment_msg>:""}
                    <Comment_button onClick={this.onSubmit.bind(this)}>SUBMIT COMMENT</Comment_button>
                </Comment_box>:""
                }
                 {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return{
        ...state,
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    };
}

export default  connect(mapStateToProps)(BlogComments);