/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { createForm, formShape } from 'rc-form';
import { Row, Col ,Input,Button} from 'antd';
import styled from 'styled-components'
import Datepicker from "./Datepicker"

const {TextArea}= Input;    
/* Styled-Components */
const Profile_wrap = styled.div`
    width: 71%;
    margin: auto;
`
const HeaderCol = styled(Col)`
  font-size:20px;
  font-weight: bold;
  color: #505050;
  margin-top: 20px;
  padding-bottom: 12px;
  margin-left:0px;
  font-family: "Open Sans";
  color: rgb( 80, 80, 80 );
`
const Main_row = styled(Row)`
    margin-top:40px;
    margin-bottom:300px;
`
const Left_Col = styled(Col)`

`
const ImageDiv = styled.img`
    height: 160px;
    width: 160px;
`
const Image_input = styled(Input)`
    display:none;
`
const Image_up = styled.div`
    margin-top:30px;
`
const Image_upload = styled.label`
    color:#0f477b;
`
const Remove = styled.div`
    margin-top:20px;
    color:#0f477b;
`
const Right_Col = styled(Col)`
    @media(max-width:992px)
    {
        margin-top: 60px;
    }
`
const First_Row = styled(Row)`
    text-align:left;
`
const First_name = styled.div`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.502 );
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
const First_input = styled(Input)`
    background-color:#f8f8f8;
    width:89%;
    border:1px solid #dadfe3;
    @media(max-width:768px)
    {
        width:100%;
    }
`
const Last_name = styled(First_name)`
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
const Last_input = styled(Input)`
    background-color:#f8f8f8;
    width:90%;
    border:1px solid #dadfe3;
    @media(max-width:768px)
    {
        width:100%;
    }
   
`
const Second_Row = styled(Row)`
    text-align:left;
    margin-top:25px;
`
const Country = styled(First_name)`
   
`
const Country_input = styled(First_input)`
    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:768px)
    {
        width:100%;
    }
`
const Date_birth = styled(First_name)`
    
    @media(max-width:992px)
    {
        margin-top:25px;
    }

`
const Third_Row = styled(Second_Row)`
    text-align:left;
`
const Street_Address = styled(First_name)`

`
const Street_input = styled(TextArea)`
    background-color:#f8f8f8;
    width:95%;
    border:1px solid #dadfe3;

    @media(max-width:992px)
    {
        width:95%;
    }
    @media(max-width:768px)
    {
        width:100%;
    }
`
const Fourth_Row = styled(Second_Row)`
    text-align:left;
`
const City = styled(First_name)`

`
const Postal = styled(First_name)`
    @media(max-width:768px)
    {
        margin-top:25px;
    }
`
const Fifth_Row = styled(Row)`
    text-align:left;
    margin-top:50px;
`
const Save = styled(Button)`
    font-size: 13.217px;
    font-family: "Open Sans";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
    text-transform: uppercase;
    text-align: center;
    -moz-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);
    -webkit-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);
    -ms-transform: matrix( 1.2195120140195,0,0,1.20991183157525,0,0);  
    border-radius: 24px;
    background-color: rgb( 76, 132, 255 );
    box-shadow: 0px 6px 10px 0px rgb( 76, 132, 255 );
    margin-left: 10px;
    width: 15%;
    @media(max-width:600px)
    {
        width:100px;   
    }
`
class PersonalDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }
    static propTypes = {
        form: formShape,
      };
      submit = () => {
        this.props.form.validateFields((error, value) => {
          console.log(error, value);
        });
      }
    render() {
        let errors;
        const { getFieldProps, getFieldError } = this.props.form;
        return (
            <Profile_wrap>
                <Row>
                    <Col span={6} />
                    <HeaderCol span={12}> 
                        <span>Personal Details</span>
                    </HeaderCol>
                </Row>
                <Main_row>
                    <Col>
                        <Row>
                            <Left_Col md={{span:24}} lg={{span:6}} xl={{span:6}} xxl={{span:6}}>
                                <div><ImageDiv src='./images/Settings/profile_pic.png' /></div>
                                <div><Image_input type="file" name="file" id="file"/><Image_up><Image_upload for="file">Upload New Photo</Image_upload></Image_up></div>
                                <Remove>Remove</Remove>
                            </Left_Col>
                            <Right_Col md={{span:24}} lg={{span:15,offset:3}} xl={{span:15,offset:3}} xxl={{span:15,offset:3}}>
                                <First_Row>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <First_name>First Name</First_name>
                                        <First_input placeholder="First Name" {...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Last_name>Last Name</Last_name>
                                        <Last_input placeholder="Last Name" {...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                </First_Row>
                                <Second_Row>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Country>Country</Country>
                                        <Country_input placeholder="Country" {...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                    <Col md={{span:24}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <Date_birth>Date of Birth</Date_birth>
                                        <Datepicker/>
                                    </Col>
                                </Second_Row>
                                <Third_Row>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Street_Address>Street Address</Street_Address>
                                        <Street_input placeholder="Street Address" autosize={{ minRows: 3, maxRows: 6 }} {...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                </Third_Row>
                                <Fourth_Row>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xxl={{span:12}}>
                                        <City>City/Town</City>
                                        <First_input placeholder="City"{...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                    <Col md={{span:12}} lg={{span:12}} xl={{span:12}} xl={{span:12}}>
                                        <Postal>Postal Code</Postal>
                                        <Last_input placeholder="Postal Code"{...getFieldProps('firstname', {
                                            onChange(){console.log("Hello How are You")}, // have to write original onChange here if you need
                                            rules: [{required: true}],
                                        })}/>
                                    </Col>
                                </Fourth_Row>
                                <Fifth_Row>
                                    <Col md={{span:24}} lg={{span:24}} xl={{span:24}} xxl={{span:24}}>
                                        <Save type="primary">Save</Save>
                                    </Col>
                                </Fifth_Row>
                            </Right_Col>
                        </Row>
                    </Col>
                </Main_row>
            </Profile_wrap>
        );
    }
}

export default createForm()(PersonalDetails);
