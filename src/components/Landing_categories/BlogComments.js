import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter ,Link} from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar,Spin } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

import {PostHead_below,Comment_box,Commentspan,Comment_button,CommentArea} from "../../styled-components/landingCategories/blogStyle"

class BlogComments extends React.Component
{
    render()
    {
        return(
            <PostHead_below>
                <PostHead_span>Comments (34)</PostHead_span>
            </PostHead_below>
            <Comment_box>
                <Commentspan>Leave a Comment</Commentspan>
                <CommentArea placeholder="Comment" rows='5' cols='60'></CommentArea>
                <Comment_button>SUBMIT COMMENT</Comment_button>
            </Comment_box>
        );
}