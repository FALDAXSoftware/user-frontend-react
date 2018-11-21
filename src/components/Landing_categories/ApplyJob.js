import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Avatar, Spin, notification } from 'antd';
import moment from 'moment';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import SimpleReactValidator from 'simple-react-validator';

import Navigation from '../Navigations/Navigation';
import {Spin_Ex} from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import { Contact_wrap, Grey_wrap, Headcontact, Head_apply, Apply_wrap, Title_apply, Title_span, Form_apply, LeftWing, Labelone, InputOne, RightWing, InputTwo, InputThree, Gap, Btn_apply, FileSelectText } from '../../styled-components/landingCategories/contactStyle';
import Title from 'antd/lib/skeleton/Avatar';
import { globalVariables } from "../../Globals"

let { API_URL } = globalVariables;

export const ContainerContact = styled(Container)`
    background-color:white; 
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom: 30px;
`

class ApplyJob extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
            flag_drop: null,
            cover_flag: null,
            fields: {
                first_name: '',
                last_name: '',
                email: '',
                position: '',
                phone_number: '',
                resume: [],
                cover_letter: [],
                linkedin_profile: '',
                website_url: '',
                loader:false,
                position_flag:null,
                coverLimit:null,
                resumeLimit:null
            },
        };
        this._onChangeFields = this._onChangeFields.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        let self = this;
        this.validator = new SimpleReactValidator({
            resumeRequired: { // name the rule
                message: 'The resume field is required.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    if (self.state.flag_drop == null) {
                        return false;
                    }
                    return true;
                }
            },
            resumeValid: { // name the rule
                message: 'The resume field has not valid file.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    if (self.state.flag_drop == false) {
                        return false;
                    }
                    return true;
                }
            },
            coverValid: { // name the rule
                message: 'The cover field has not valid file.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    if (self.state.cover_flag == false) {
                        return false;
                    }
                    return true;
                }
            },
            validEmail: { // name the rule
                message: 'Please enter valid email address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    console.log(val,options)
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            },
            coverLimit:{
                message: 'Please upload the document of less than 2 mb.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    console.log(val,options)
                    if (self.state.coverLimit == false) {
                        return false;
                    }
                    return true;
                } 
            },
            resumeLimit:{
                message: 'Please upload the document of less than 2 mb.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    console.log(val,options)
                    if (self.state.resumeLimit == false) {
                        return false;
                    }
                    return true;
                } 
            }
        });
    }
    componentDidMount()
    {
        if(this.props.location.search)
            {
                console.log(this.props);
                var arr = this.props.location.search.split("&");
                console.log(arr);
                var arr2 = arr[1].split("=");
                console.log(arr2[1]);
                this.setState({position_flag:arr2[1]});
            }
    }
    onDrop(type, files) {
        /* console.log(type, files) */
        if (type == 'res') {
            /* console.log("hello 123", type, files) */
            let flag = false,flagLimit=false;
            if (files.length > 0) {
                flag = true
                if(files[0].size<=3000000)
                {
                   flagLimit=true;
                }
            }
            this.setState({
                flag_drop: flag,
                resumeLimit:flagLimit,
                fields: { ...this.state.fields, resume: files[0] }
            });
        }
        else {
           /*  console.log("hello 123", type, files) */
            let flag = false,flagLimit=false;
            if (files.length > 0) {
                flag = true
                console.log(files[0].size)
                if(files[0].size<=3000000)
                {
                    console.log(this.state.flagLimit)
                    flagLimit=true;
                }
            }
            console.log(files)
            this.setState({
                cover_flag: flag,
                coverLimit:flagLimit,
                fields: { ...this.state.fields, cover_letter: files[0] }
            });
        }
    }

    onCancel() {
        this.setState({
            files: []
        });
    }
    _onChangeFields(e) {
        let fields = this.state.fields;
        let field = e.target.name;

        if (e.target.value.trim() == "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };
    onSubmit() {
        if (this.validator.allValid()) {
            let jobID;
            if(this.props.location.search)
            {
                var arr = this.props.location.search.split("&");
                var arr2 = arr[0].split("=");
                jobID=arr2[1];
            }
            /* console.log(this.state.fields) */
            let formdata = new FormData();
            formdata.append('first_name', this.state.fields['first_name']);
            formdata.append('last_name', this.state.fields['last_name'])
            formdata.append('email', this.state.fields['email'])
            formdata.append('phone_number', this.state.fields['phone_number'])
            formdata.append('position', this.state.position_flag)
            formdata.append('website_url', this.state.fields['website_url'])
            formdata.append('linkedin_profile', this.state.fields['linkedin_profile'])
            formdata.append('job_id',jobID);
            formdata.append('cover_letter', this.state.fields['cover_letter'])
            formdata.append('resume', this.state.fields['resume'])

            this.setState({loader:true});
            fetch(API_URL + "/apply-job",
                {
                    method: "post",
                    body: formdata
                })
                .then(response => response.json())
                .then((responseData) => {
                    this.openNotificationWithIcon('success', 'Job Applied', responseData.message);
                    let fields = {};
                    fields["last_name"] = '';
                    fields['first_name'] = "";
                    fields['email'] = "";
                    fields['phone_number'] = '';
                    fields['resume'] = "";
                    fields['website_url'] = "";
                    fields['cover_letter'] = "";
                    fields['linkedin_profile'] = ''

                    this.setState({ fields: fields, flag_drop: null, cover_flag: null,loader:false }, () => {
                        this.validator.hideMessages();
                        this.forceUpdate();

                    })


                })
                .catch(error => {
                   /*  console.log(error) */
                })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }
    render() {

        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Headcontact>
                            <Head_apply>Careers</Head_apply>
                            <Apply_wrap>
                                <Title_apply>
                                    {
                                        this.state.position_flag!==null ?
                                            <Title_span>Apply For {this.state.position_flag} position</Title_span>
                                        :""
                                    }
                                </Title_apply>
                                <Form_apply>
                                    <Row>
                                        <Col sm={24} md={12}>
                                            <LeftWing>
                                                <Labelone>First Name*</Labelone>
                                                <InputOne name="first_name" onChange={this._onChangeFields} value={this.state.fields.first_name} />
                                                {this.validator.message('first_name', this.state.fields.first_name, 'required|alpha_num', 'text-danger-validation')}
                                            </LeftWing>
                                        </Col>
                                        <Col sm={24} md={12}>
                                            <RightWing>
                                                <Labelone>Last Name*</Labelone>
                                                <InputTwo name="last_name" onChange={this._onChangeFields} value={this.state.fields.last_name} />
                                                {this.validator.message('last_name', this.state.fields.last_name, 'required|alpha_num', 'text-danger-validation')}
                                            </RightWing>
                                        </Col>
                                    </Row>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={12}>
                                                <LeftWing>
                                                    <Labelone>Position*</Labelone>
                                                    <InputOne disabled name="position" value={this.state.position_flag} />
                                                </LeftWing>
                                            </Col>
                                            <Col sm={24} md={12}>
                                                <RightWing>
                                                    <Labelone>Phone*</Labelone>
                                                    <InputTwo name="phone_number" onChange={this._onChangeFields} value={this.state.fields.phone_number} />
                                                    {this.validator.message('phone_number', this.state.fields.phone_number, 'required|integer', 'text-danger-validation')}
                                                </RightWing>
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={24}>
                                                <Labelone>Email*</Labelone>
                                                <InputThree name="email" onChange={this._onChangeFields} value={this.state.fields.email} />
                                                {this.validator.message('email', this.state.fields.email, 'required|validEmail', 'text-danger-validation')}
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={24}>
                                                <Labelone>Resume/CV*</Labelone>
                                                {console.log(this.state)}
                                                <Dropzone
                                                    accept=".pdf,.doc,.docx"
                                                    className="Dropzone_apply"
                                                    onDrop={this.onDrop.bind(this, 'res')}
                                                    onFileDialogCancel={this.onCancel.bind(this)}
                                                >
                                                    {this.state.flag_drop == null &&
                                                        <div>
                                                            <Icon type="download" style={{ fontSize: '30px' }} />
                                                            <FileSelectText>Choose a file or drag it here</FileSelectText>
                                                        </div>
                                                    }
                                                    {this.state.flag_drop == false &&
                                                        <div>
                                                            <Icon style={{ fontSize: '30px' }} type="close-square" />
                                                            <FileSelectText>Wrong File Selected</FileSelectText>
                                                        </div>
                                                    }
                                                    {this.state.flag_drop == true &&
                                                        <div>
                                                            <Icon style={{ fontSize: '30px' }} type="check-square" />
                                                            <FileSelectText>{this.state.fields.resume.name}</FileSelectText>
                                                        </div>
                                                    }
                                                </Dropzone>
                                                <span style={{fontSize:"12px",fontFamily:"Open Sans",color:"grey",fontStyle:"italic"}}>Supported format : .doc , .docx , .pdf.</span>
                                                {this.validator.message('resume', this.state.flag_drop, 'resumeRequired|resumeValid|resumeLimit', 'text-danger-validation')}
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={24}>
                                                <Labelone>Cover Letter</Labelone>
                                                <Dropzone
                                                    accept=".pdf,.doc,.docx"
                                                    className="Dropzone_apply"
                                                    onDrop={this.onDrop.bind(this, 'cover')}
                                                    onFileDialogCancel={this.onCancel.bind(this)}
                                                >
                                                    {this.state.cover_flag == null &&
                                                        <div>
                                                            <Icon type="download" style={{ fontSize: '30px' }} />
                                                            <FileSelectText>Choose a file or drag it here</FileSelectText>
                                                        </div>
                                                    }
                                                    {this.state.cover_flag == false &&
                                                        <div>
                                                            <Icon style={{ fontSize: '30px' }} type="close-square" />
                                                            <FileSelectText>Wrong File Selected</FileSelectText>
                                                        </div>
                                                    }
                                                    {this.state.cover_flag == true &&
                                                        <div>
                                                            <Icon style={{ fontSize: '30px' }} type="check-square" />
                                                            <FileSelectText>{this.state.fields.cover_letter.name}</FileSelectText>
                                                        </div>
                                                    }
                                                </Dropzone>
                                                <span style={{fontSize:"12px",fontFamily:"Open Sans",color:"grey",fontStyle:"italic"}}>Supported format : .doc , .docx , .pdf.</span>
                                                {this.validator.message('cover', this.state.cover_flag, 'coverValid|coverLimit', 'text-danger-validation')}
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={24}>
                                                <Labelone>Linkedin Profile*</Labelone>
                                                <InputThree name="linkedin_profile" onChange={this._onChangeFields} value={this.state.fields.linkedin_profile} />
                                                {this.validator.message('linkedin_profile', this.state.fields.linkedin_profile, 'required|url', 'text-danger-validation')}
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Gap>
                                        <Row>
                                            <Col sm={24} md={24}>
                                                <Labelone>Website*</Labelone>
                                                <InputThree name="website_url" onChange={this._onChangeFields} value={this.state.fields.website_url} />
                                                {this.validator.message('website_url', this.state.fields.website_url, 'required|url', 'text-danger-validation')}
                                            </Col>
                                        </Row>
                                    </Gap>
                                    <Btn_apply onClick={this.onSubmit}>SUBMIT</Btn_apply>
                                </Form_apply>
                            </Apply_wrap>
                        </Headcontact>
                    </ContainerContact>
                </Grey_wrap>
                <CommonFooter />
                {(this.state.loader) ? <Spin_Ex className="Ex_spin">
                    <Spin size="large" />
                </Spin_Ex> : ""}
            </Contact_wrap>
        );
    }
}

export default ApplyJob;