import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { Spin } from 'antd';
import moment from 'moment';
import { SpinEx } from 'STYLED-COMPONENTS/HOMEPAGE/style'
import { globalVariables } from "Globals"
import {
    PostHeadBelow, CommentBox, PostHeadSpan, CommentSpan1, CommentButton, CommentArea,
    AllComments, CommentWrap, CommentImage, CommentSpan2, CommentP, CommentText,
    CommentMain, CommentMsg, ViewMore, PostHeadBelowComment, PerComment
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/blogStyle"

class BlogComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            commentcount: null,
            commentTemp: null,
            showMsg: false,
            blogID: "",
            page: 1,
            total: 0,
            loader: false
        };
    }
    componentWillReceiveProps(props, newProps) {
        this.getComments(props.blogID);
    }
    getComments(blogID) {
        var Obj = {};
        Obj['blog_id'] = blogID;
        if (blogID !== '') {
            this.setState({ loader: true })
            fetch(globalVariables.API_URL + `/get-comments?page=1&limit=10`, {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(Obj)
            })
                .then(response => response.json())
                .then((responseData) => {
                    this.setState({ comments: responseData.data.comments, commentcount: responseData.data.commentCount, blogID: blogID, total: responseData.data.commentCount / 10, loader: false });
                })
                .catch(error => { })
        }
    }
    componentDidMount() {
        this.getComments(this.props.blogID);
    }
    onCommentChange(e) {
        this.setState({ commentTemp: e.target.value, showMsg: false });
    }
    viewMore() {
        var page = this.state.page + 1;
        var Obj = {};
        Obj['blog_id'] = this.state.blogID;
        this.setState({ loader: true })
        fetch(globalVariables.API_URL + `/get-comments?page=${page}&limit=10`, {
            method: "post",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(Obj)
        })
            .then(response => response.json())
            .then((responseData) => {
                this.setState({ page: page, comments: this.state.comments.concat(responseData.data.comments), total: responseData.data.commentCount / 10, loader: false });
            })
            .catch(error => { })
    }
    onSubmit() {
        if (this.state.commentTemp && this.state.commentTemp.trim() !== "") {
            var obj = {};
            obj["blog_id"] = this.state.blogID;
            obj['comment'] = this.state.commentTemp;
            this.setState({ loader: true })
            fetch(globalVariables.API_URL + `/add-comments`, {
                method: "post",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: "Bearer " + this.props.simpleReducer.isLoggedIn
                },
                body: JSON.stringify(obj)
            })
                .then(response => response.json())
                .then((responseData) => {
                    var obj1 = {};
                    obj1["blog_id"] = this.state.blogID;
                    fetch(globalVariables.API_URL + `/get-comments?page=1&limit=10`, {
                        method: "post",
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(obj1)
                    })
                        .then(response => response.json())
                        .then((responseData) => {
                            this.setState({ comments: responseData.data.comments, commentcount: responseData.data.commentCount, total: responseData.data.commentCount / 10, page: 1, loader: false, commentTemp: "" });
                        })
                        .catch(error => { })
                })
                .catch(error => { })
        } else {
            this.setState({ showMsg: true });
        }
    }

    render() {
        const { comments, commentcount } = this.state;
        return (
            <div>
                {comments.length > 0 ?
                    <PostHeadBelow>
                        <PostHeadSpan>Comments ({commentcount})</PostHeadSpan>
                    </PostHeadBelow> : ""}
                <AllComments>
                    {comments.length > 0 ?
                        comments.map(function (temp, index) {
                            var date = moment.utc(temp.created_at).local().format("MMM DD,YYYY");
                            return (
                                <CommentMain>
                                    <CommentWrap>
                                        <CommentImage style={{ backgroundImage: `url(${globalVariables._AMAZONBUCKET + temp.userDetails.profile_pic})` }} />
                                        <CommentText>
                                            <CommentSpan2>{temp.userDetails.first_name + " " + temp.userDetails.last_name}</CommentSpan2>
                                            <CommentP>{date}</CommentP>
                                        </CommentText>
                                    </CommentWrap>
                                    <PostHeadBelowComment>
                                        <PerComment>{temp.comment}</PerComment>
                                    </PostHeadBelowComment>
                                </CommentMain>
                            );
                        })
                        : ""}
                    {this.state.total > this.state.page ? <ViewMore onClick={this.viewMore.bind(this)}>View More</ViewMore> : ""}
                </AllComments>
                {this.props.isLoggedIn ?
                    <CommentBox>
                        <CommentSpan1>Leave a Comment</CommentSpan1>
                        <CommentArea value={this.state.commentTemp} onChange={this.onCommentChange.bind(this)} placeholder="Comment" rows='5' cols='60'></CommentArea>
                        {this.state.showMsg===true ? <CommentMsg>Please enter your comment in above field</CommentMsg> : ""}
                        <CommentButton onClick={this.onSubmit.bind(this)}>SUBMIT COMMENT</CommentButton>
                    </CommentBox> : ""
                }
                {(this.state.loader) ? <SpinEx className="Ex_spin">
                    <Spin size="large" />
                </SpinEx> : ""}
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        ...state,
        isLoggedIn: state.simpleReducer.isLoggedIn !== undefined ? true : false,
    };
}

export default connect(mapStateToProps)(BlogComments);
