import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col, Spin, notification, Select } from 'antd';
import styled from 'styled-components';
import SimpleReactValidator from 'simple-react-validator';
import "react-datepicker/dist/react-datepicker.css";
import 'react-intl-tel-input/dist/main.css';

import Navigation from '../Navigations/Navigation';
import { Spin_Ex } from '../../styled-components/homepage/style'
import CommonFooter from "../Landing/Footers/Footer_home";
import { Container } from '../../styled-components/homepage/style';
import {
    Contact_wrap, Grey_wrap, Head, Head_title, Head_desc, Body,
    Body_form, Form_coin, CoinInput,IntlTelInputS,SecurityInput,URLInput, TargetInput, EmailInput, MsgInput,
    Left, OneDiv, FifthDiv, SixthDiv, SeventhDiv, EigthDiv, AddButton, Msg, Right_input,
    SecondDiv, ThirdDiv, FourthDiv, NineDiv, TenDiv, ElevenDiv, TwelveDiv, ThirteenDiv
} from '../../styled-components/landingCategories/contactStyle';
import { globalVariables } from "../../Globals";
import { Security } from '../../Constants/images';

let { API_URL } = globalVariables;
const Option = Select.Option;

export const ContainerContact = styled(Container)`
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-right:30px;
    padding-left:30px;
    padding-bottom:70px;
    @media(max-width:480px)
    {
        padding-right:0px;
        padding-left:0px;
    }
`
export const TextAreaInput = styled(MsgInput)`
    min-height: 60px;
`

class MediaContact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: {
                email: '',
                message: '',
                target_date: '',
                url: '',
                coin_name: '',
                is_secure:'',
                country:'',
                skype:'',
                other_site:'',
                is_secure:'',
                loader: false
            },
            startDate: null,
            is_secure: '',
            selectedCountry: '',
            selectedReference: '',
            isTextBox: false,
            phoneCode: '',
            countries: []
        };
        this._onChangeFields = this._onChangeFields.bind(this);
        this.dateChange = this.dateChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validator = new SimpleReactValidator({
            validEmail: { // name the rule
                message: 'Please enter valid email address.', // give a message that will display when there is an error. :attribute will be replaced by the name you supply in calling it.
                rule: function (val, options) { // return true if it is succeeds and false it if fails validation. the _testRegex method is available to give back a true/false for the regex and given value
                    // check that it is a valid IP address and is not blacklisted
                    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                    var bool = re.test(String(val).toLowerCase());
                    return bool;
                }
            }
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
    dateChange(date) {
        let fields = this.state.fields;
        if (date != null) {
            fields["target_date"] = date.format("DD/MM/YYYY");
        } else {
            fields["target_date"] = date;
        }
        this.setState({ fields, startDate: date });
    }
    openNotificationWithIcon(type, head, desc) {
        notification[type]({
            message: head,
            description: desc,
        });
    };

    componentDidMount() {
        this._getAllCountries();
        document.getElementsByClassName("date-input")[0].setAttribute("readOnly", "readOnly")
    }

    _getAllCountries = () => {
        fetch(globalVariables.API_URL + "/users/countries", {
            method: "GET",
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    this.setState({ countries: responseData.data });
                }
            })
            .catch(error => { })
    }

    onSubmit() {
        const { selectedCountry, is_secure, phoneCode, selectedReference } = this.state;

        if (this.validator.allValid()) {
            this.setState({ loader: true })

            let formdata = new FormData();
            formdata.append('first_name', this.state.fields['first_name']);
            formdata.append('last_name', this.state.fields['last_name'])
            formdata.append('email', this.state.fields['email'])
            formdata.append('target_date', this.state.fields['target_date'])
            formdata.append('url', this.state.fields['url'])
            formdata.append('message', this.state.fields['message'])
            formdata.append('ref_site', this.state.fields['ref_site'])
            formdata.append('skype', this.state.fields['skype'])
            formdata.append('country', this.state.fields['country'])
            formdata.append('title', this.state.fields['title'])
            formdata.append('coin_name', this.state.fields['coin_name'])
            formdata.append('elevator_pitch', this.state.fields['elevator_pitch'])
            formdata.append('coin_symbol', this.state.fields['coin_symbol'])
            formdata.append('phone', phoneCode + this.state.fields['phone'])
            formdata.append('is_secure', this.state.fields['is_secure'])
            formdata.append('other_site', this.state.fields['other_site'])

            fetch(API_URL + "/users/add-coin-request", {
                method: "post",
                // headers: {
                //     'Content-Type': 'application/json',
                // },
                body: formdata
            })
                .then(response => response.json())
                .then((responseData) => {
                    this.props.history.push('/thank-you');
                    this.openNotificationWithIcon('success', 'Success', responseData.message);
                    let fields = this.state.fields;
                    Object.keys(fields).map(function(index){
                        fields[index]=""
                    })

                    this.setState({
                        fields: fields, startDate: null, loader: false,
                        selectedCountry: '', selectedReference: '', is_secure: ''
                    }, () => {
                        this.validator.hideMessages();
                        this.forceUpdate();

                    })
                })
                .catch(error => {
                })
        } else {
            this.validator.showMessages();
            // rerender to show messages for the first time
            this.forceUpdate();
        }
    }


    _changeSecurity = (isSecure) => {
        let fields = this.state.fields;
        if (isSecure.trim() == "") {
            fields['is_secure'] = "";
        } else {
            fields['is_secure'] = isSecure;
        }
        this.setState({ fields });
    }

    _changeCountry = (val) => {
        let fields = this.state.fields;
        if (val.trim() == "") {
            fields['country'] = "";
        } else {
            fields['country'] = val;
        }
        this.setState({ fields });

    }
    _changeReference = (val) => {
        var isTextBox;
        if (val == 'Other') {
            isTextBox=true;
        } else {
            isTextBox=false; 
        }
        let fields = this.state.fields;
        if (val.trim() == "") {
            fields['ref_site'] = "";
        } else {
            fields['ref_site'] = val;
        }
        this.setState({ fields,isTextBox });
        
    }
    _changeNumber(a,mob,code)
    {
        console.log(a,mob,code);
        if(mob.trim!=="")
        {
            var mobile = "+" + code.dialcode + mob;
            let fields = this.state.fields;
            fields['phone'] = mobile;
            this.setState({ fields });
        }
    }
    render() {
        const { countries, isTextBox } = this.state;
        let countryOptions = countries.map((country) => {
            return (
                <Option value={country.name}>{country.name}</Option>
            )
        })

        let phoneCodeOptions = countries.map((country) => {
            return (
                <Option value={country.alpha3Code}>{country.alpha3Code}</Option>
            )
        })

        return (
            <Contact_wrap>
                <Navigation />
                <Grey_wrap>
                    <ContainerContact>
                        <Head>
                            <Head_title>List Your Token</Head_title>
                            {/* <Subtitle>Here are the requirements to list your coin:</Subtitle> */}
                            <Head_desc>We speak to coin creators about struggles from their side of the crypto industry, and a common complaint is exchange access. Crypto, as a financial asset, is what gets the most attention but the beauty of crypto is the utility offered by tokens based on innovative ideas. We aim to help intelligent and motivated people like you focus on those ideas rather than the politics and logistics of proliferating your token. So, we made it easy:
                                <ul style={{marginTop:"20px !important"}}>
                                    <li>Complete the form below.</li>
                                    <li> We will review your information and reply with relevant questions and next steps within 24 hours.</li>
                                </ul>
                            </Head_desc>
                            <Head_desc>
                                Why should you want to work with us?

                                <ul style={{marginTop:"20px !important"}}>
                                    <li>We do not require you to pay us.</li>
                                    <li>We do not hold any of your tokens in reserve, escrow, hostage, etc.</li>
                                    <li>Our terms are simple, fair, and clear.</li>
                                    <li>We treat others with respect. Always.</li>
                                </ul>
                            </Head_desc>
                        </Head>
                        <Body>
                            {/* <BodyText>Please fill out this form or email at relations@faldax.com to apply:</BodyText> */}
                            <Body_form>
                                <Form_coin>
                                    <OneDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Coin/Token Name*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="coin_name" onChange={this._onChangeFields} value={this.state.fields.coin_name} />
                                                    {this.validator.message('coin_name', this.state.fields.coin_name, 'required|alpha_num|max:30', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </OneDiv>
                                    <SecondDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Coin/Token Symbol*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="coin_symbol" onChange={this._onChangeFields} value={this.state.fields.coin_symbol} />
                                                    {this.validator.message('coin_symbol', this.state.fields.coin_symbol, 'required|alpha_num|max:30', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </SecondDiv>
                                    <ThirdDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Elevator Pitch*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <TextAreaInput rows="2" name="elevator_pitch" onChange={this._onChangeFields} value={this.state.fields.elevator_pitch} />
                                                    {this.validator.message('elevator_pitch', this.state.fields.elevator_pitch, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </ThirdDiv>
                                    <FourthDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Is your Coin/Token a security?*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <SecurityInput style={{ width: 200, "marginLeft": "15px" }}
                                                        onChange={this._changeSecurity} value={this.state.fields.is_secure}>
                                                        <Option value='true'>Yes</Option>
                                                        <Option value='false'>No</Option>
                                                    </SecurityInput>
                                                    {this.validator.message('is_secure', this.state.fields.is_secure, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </FourthDiv>
                                    <FifthDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Website URL*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <URLInput name="url" onChange={this._onChangeFields} value={this.state.fields.url} />
                                                    {this.validator.message('url', this.state.fields.url, 'required|url', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </FifthDiv>
                                    <SixthDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Anticipated Release Date*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input className="datePicker">
                                                    <TargetInput
                                                        name="target_date"
                                                        dateFormat="DD/MM/YYYY"
                                                        minDate={new Date()}
                                                        selected={this.state.startDate}
                                                        onChange={this.dateChange}
                                                        className="date-input"
                                                    />
                                                    {this.validator.message('anticipated date', this.state.fields.target_date, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </SixthDiv>
                                    <SeventhDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Email*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <EmailInput name="email" onChange={this._onChangeFields} value={this.state.fields.email} />
                                                    {this.validator.message('email', this.state.fields.email, 'required|validEmail', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </SeventhDiv>
                                    <NineDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>First Name*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="first_name" onChange={this._onChangeFields} value={this.state.fields.first_name} />
                                                    {this.validator.message('first name', this.state.fields.first_name, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </NineDiv>
                                    <TenDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Last Name*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="last_name" onChange={this._onChangeFields} value={this.state.fields.last_name} />
                                                    {this.validator.message('last name', this.state.fields.last_name, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </TenDiv>
                                    <EigthDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Msg>
                                                    <p>Comments*</p>
                                                </Msg>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <MsgInput name="message" onChange={this._onChangeFields} value={this.state.fields.message} />
                                                    {this.validator.message('comments', this.state.fields.message, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </EigthDiv>
                                    <ElevenDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Title*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="title" onChange={this._onChangeFields} value={this.state.fields.title} />
                                                    {this.validator.message('title', this.state.fields.title, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </ElevenDiv>
                                    <TwelveDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Country*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <SecurityInput style={{ width: 200, "marginLeft": "15px" }}
                                                        onChange={this._changeCountry}>
                                                        {countryOptions}
                                                    </SecurityInput>
                                                    {this.validator.message('country', this.state.fields.country, 'required', 'text-danger-validation')}
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </TwelveDiv>
                                    <ThirteenDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Phone</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <IntlTelInputS onPhoneNumberChange={(a,b,c)=>this._changeNumber(a,b,c)} css={['intl-tel-input', 'form-control']} />
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </ThirteenDiv>
                                    <ThirteenDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>Skype</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <CoinInput name="skype" onChange={this._onChangeFields} value={this.state.fields.skype} />
                                                </Right_input>
                                            </Col>
                                        </Row>
                                    </ThirteenDiv>
                                    <TwelveDiv>
                                        <Row>
                                            <Col xs={24} sm={8} xl={10}>
                                                <Left>
                                                    <p>How did you hear about us?*</p>
                                                </Left>
                                            </Col>
                                            <Col xs={24} sm={16} xl={14}>
                                                <Right_input>
                                                    <SecurityInput style={{ width: 200, "marginLeft": "15px" }}
                                                        onChange={this._changeReference}>
                                                        <Option value="Facebook">Facebook</Option>
                                                        <Option value="Twitter">Twitter</Option>
                                                        <Option value="Reddit">Reddit</Option>
                                                        <Option value="LinkedIn">LinkedIn</Option>
                                                        <Option value="News Article">News Article</Option>
                                                        <Option value="Word of mouth">Word of mouth</Option>
                                                        <Option value="Other">Other</Option>
                                                    </SecurityInput>
                                                    {this.validator.message('ref_site', this.state.fields.ref_site, 'required', 'text-danger-validation')}
                                                    {!isTextBox ? <AddButton onClick={this.onSubmit}>SUBMIT</AddButton> : ''}
                                                </Right_input>
                                               
                                            </Col>
                                        </Row>
                                    </TwelveDiv>
                                    {
                                        isTextBox ?
                                            <ThirteenDiv>
                                                <Row>
                                                    <Col xs={24} sm={8} xl={10}>
                                                        <Left>
                                                            <p>Other</p>
                                                        </Left>
                                                    </Col>
                                                    <Col xs={24} sm={16} xl={14}>
                                                        <Right_input>
                                                            <CoinInput name="other_site" onChange={this._onChangeFields} value={this.state.fields.other_site} />
                                                            {this.validator.message('other_site', this.state.fields.other_site, 'required', 'text-danger-validation')}
                                                            <AddButton onClick={this.onSubmit}>SUBMIT</AddButton>
                                                        </Right_input>
                                                        
                                                    </Col>
                                                </Row>
                                            </ThirteenDiv> : ''
                                    }
                                </Form_coin>
                            </Body_form>
                        </Body>
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

export default MediaContact;
