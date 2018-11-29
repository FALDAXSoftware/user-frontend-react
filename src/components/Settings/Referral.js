/* IN-built */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Input, Row, Col, Button, Layout, Menu, Breadcrumb, Card, Cardimport, Modal, Table, notification } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

/* Constants */
const { Header, Content, Footer } = Layout;
const Search = Input.Search;

/* Styled Components */

const columns = [{
    title: 'Accounts Referred',
    dataIndex: 'email',
}];
const data = [{
    key: "1",
    referral: "test1@tesst.com"
}, {
    key: "2",
    referral: "test2@tesst.com"
}, {
    key: "3",
    referral: "test3@test.com"
}];


/* Styled Components */

const Parent_wrap = styled.div`
    
`
const Header_text = styled.div`
    font-size:20px;
    font-family:"Open Sans";
    font-weight: 600;
    color:${props => props.theme.mode=="dark" ? "white" : "rgb( 80, 80, 80 )"};
    line-height: 2.4;
    margin-top:10px;
    text-align:center;
`
const Header_p = styled.div`
    font-size: 16.008px;
    font-family: "Open sans";
    color: rgb( 80, 80, 80 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    text-align:center;
`
const Ref_div = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    background-color:${props => props.theme.mode=="dark" ? "041422" : "#fcfcfc"};
    border:1px solid #d6d6d6;
    margin-top:40px;
    border-radius: 10px;
    height:auto;
`
/* ADD CONTENT="" */
const Ref_leftcol = styled(Col)`
    text-align:left;
    padding-left: 35px;
    &:after 
    {
    
        top: 8%;
        position: absolute;
        height: 84%;
        right: 0px;
        border-right: 1px solid #d6d6d6;
    }
    @media(max-width:600px)
    {
        // text-align:center;
    }
`
const Ref_input = styled(Search)`
    width:86%;
    // margin-left:35px;
    text-align:left;
    margin-top:5px;
    margin-bottom: 32px;
    @media(max-width:768px)
    {
        margin-left:auto;
        margin-right:auto;
        text-align:center;
    }
`
const Ref_text = styled.div`
    text-align:left;
    font-size: 14.007px;
    font-family: "Open sans";
    color: rgba( 119, 119, 119, 0.702 );
    text-transform: uppercase;
    // margin-left:36px;
    margin-top:25px;
    line-height: 2.571;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);  
    @media(max-width:768px)
    {
    }
`
const Ref_rightcol = styled(Col)`
    
`
const Right_value = styled.div`
    text-align:center;
    font-size: 20.01px;
    font-family: "Open sans";
    color: rgb( 0, 0, 0 );
    font-weight:bold;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-top:7px;

    @media(max-width:768px)
    {
        margin-bottom:20px;
    }
`
const Right_text = styled.div`
    text-align:center;
    font-size: 14.007px;
    font-family: "Open sans";
    color: rgba( 119, 119, 119, 0.702 );
    text-transform: uppercase;
    line-height: 2.571;
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    margin-top:30px;

    @media(max-width:768px)
    {
        margin-top:15px;
    }
`
const Ref_acc = styled.div`
    margin:auto;
    width:80%;
    height:140px;
    background-color:${props => props.theme.mode=="dark" ? "#041422" : "#ffffff"};
    border:1px solid #d6d6d6;
    margin-top:40px;
    border-radius: 10px;
    height:auto;
    margin-bottom:65px;
`
class Referral extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
            copied: false,
            tableData: [],
            searchCSS:""
        }
    }
    componentWillReceiveProps(props,newProps)
    {
        if(this.props.theme!==undefined)
        {
            if(this.props.theme !== this.state.theme)
            {
                if(this.props.theme==false)
                    this.setState({searchCSS:"Input_search_night"})
                else
                    this.setState({searchCSS:"INPUT_search"})
            }
        }
    }
    componentDidMount() {
        /* console.log(this.props.isLoggedIn) */
        if(this.props.theme!==undefined)
        {
            if(this.props.theme !== this.state.theme)
            {
                if(this.props.theme==false)
                    this.setState({searchCSS:"Input_search_night",referTable:"referral-table"})
                else
                    this.setState({searchCSS:"INPUT_search",referTable:"referral-table-night"})
            }
        }
        fetch("http://18.191.87.133:8084/users/referredUsers", {
            method: "get",
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                /* console.log(responseData); */
                this.setState({ tableData: responseData.data })
            })
            .catch(error => { /* console.log(error) */ })
        if (this.props.profileDetails.referral_code !== undefined) {
            this.setState({ value: this.props.profileDetails.referral_code })
        }
    }

    openNotificationWithIcon = (type) => {
        notification[type]({
            message: 'Referral Code Copied to Clipboard',
            duration: 2
        });
    };

    SearchText() {
        // Copy to clipboard example
        document.querySelectorAll(".ant-input-search-button")[0].onclick = function () {
            // Select the content
            document.querySelectorAll(".INPUT_search > input")[0].select();
            // Copy to the clipboard
            document.execCommand('copy');
        };
        this.openNotificationWithIcon('success');
    }

    render() {
        return (
            <Parent_wrap>
                <Header_text>Referral Program</Header_text>
                {/* <Header_p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</Header_p> */}
                <Ref_div>
                    <Row>
                        <Ref_leftcol sm={24} md={18}>
                            <Ref_text>YOUR REFERRAL LINK</Ref_text>
                            <CopyToClipboard text={this.state.value}
                                onCopy={() => this.setState({ copied: true })}>
                                <div style={{ textAlign: 'left' }}>
                                    <Ref_input
                                        value={this.state.value}
                                        className={this.state.searchCSS}
                                        placeholder="Referral"
                                        enterButton="Copy"
                                        size="large"
                                        onSearch={value => this.SearchText()}
                                    />
                                </div>
                            </CopyToClipboard>
                        </Ref_leftcol>
                        {/* <Ref_rightcol sm={24} md={6}>
                            <Right_text>Total Earned</Right_text>
                            <Right_value>3.0850 BTC</Right_value>
                        </Ref_rightcol> */}
                    </Row>
                </Ref_div>
                <Ref_acc>
                    <div>
                        <Table columns={columns} dataSource={this.state.tableData}
                            size="middle"
                            className={this.state.referTable}
                            pagination={false}
                        />
                    </div>
                </Ref_acc>
            </Parent_wrap>
        );
    }
}

function mapStateToProps(state) {
    return ({
        isLoggedIn: state.simpleReducer.isLoggedIn,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : ""
    })
}
export default connect(mapStateToProps)(Referral);