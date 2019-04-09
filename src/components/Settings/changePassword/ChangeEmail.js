/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux"
import { Row, Col, Input, notification } from 'antd';
import styled from 'styled-components';
import { createForm, formShape } from 'rc-form';
import { HeaderCol, Save } from "../Personaldetails/PersonalDetails"
import FaldaxLoader from '../../../shared-components/FaldaxLoader';
import { globalVariables } from '../../../Globals';
import SimpleReactValidator from 'simple-react-validator';

let { API_URL } = globalVariables;

const Wrapper = styled.div`
`
const ChangeRow = styled(Row)`
    &:after 
    {
        content:"";
        left: 8%;
        position: absolute;
        width: 84%;
        bottom: 0px;
        border-bottom: 1px solid #d6d6d6;
    }
`
const ChangeCol = styled.div`
    width:42%;
    height:auto;
    margin-left:auto;
    margin-right:auto;
    padding-bottom:40px;

    @media(max-width:1530px)
    {
        width:46%;
    }
    @media(max-width:1400px)
    {
        width:54%;
    }
    @media(max-width:1190px)
    {
        width:60%;
    }
    @media(max-width:1070px)
    {
        width:65%;
    }
    @media(max-width:990px)
    {
        width:75%;
    }
    @media(max-width:856px)
    {
        width:90%;
    }
`
const Old = styled.div`
    width: 635px; 
    margin:auto;
    text-align:left
    margin-top:35px;
    @media(max-width:720px)
    {
        width:400px;
    }
    @media(max-width:510px)
    {
        width:260px;
    }
`
const NewP = styled(Old)`
    margin-top:30px;
`
export const InputLabel = styled.label`
    font-size: 14.007px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? '#617090' : 'rgba( 80, 80, 80, 0.502 )'};
    -moz-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -webkit-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
    -ms-transform: matrix( 0.99999985149599,0,0,0.99949238260564,0,0);
`
export const OldInput = styled(Input)`
    margin-top:5px;
    width: 95%;
    background-color:${props => props.theme.mode == "dark" ? '#041422' : '#f8f8f8'};
    color:${props => props.theme.mode == "dark" ? 'white' : ''}
    display:inline-block;
    font-family: "Open Sans";
    font-size:16;
    height:auto;
    font-weight:600;
    padding:10px;
    padding-right:45px;
    &:focus, &:hover{
        border-color: rgb(0, 170, 250);;
        outline:0;
        box-shadow:none;
    }
    @media(max-width:720px)
    {
        width:370px;
    }
    @media(max-width:510px)
    {
        width:220px;
    }
`
const NewInput = styled(OldInput)`
`
const Button_div = styled.div`
    margin-top:30px;
    margin-bottom:50px;
`
const NewButton = styled(Save)`
    border: none;
    width:auto;
    &:hover
    {
        color: #fff;
        background-color: #40a9ff;
        border-color: #40a9ff;
    }
`

class ChangeEmail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fields: {},
            loader: false
        }
        this.validator = new SimpleReactValidator();
    }

    static propTypes = {
        form: formShape,
    };

    componentDidMount = () => {
        let fields = this.state.fields;
        fields['email'] = this.props.profileDetails.email;
        this.setState({ fields })
    }

    _changeEmail = () => {
        if (this.validator.allValid()) {
            this.setState({ loader: true });
            // fetch(API_URL + `/`, {
            //     method: "get",
            //     headers: {
            //         Accept: 'application/json',
            //         'Content-Type': 'application/json',
            //         Authorization: "Bearer " + this.props.isLoggedIn
            //     }
            // })
            //     .then(response => response.json())
            //     .then((responseData) => {
            //         console.log('>>>>>>>>responseData', responseData)
            //         this.setState({ loader: false })
            //     })
            //     .catch(error => {
            //         console.log('>error', error)
            //         this.setState({ loader: false, errMsg: true, errMessage: 'Something went wrong!!' });
            //     })
        } else {
            this.setState({ loader: false });
            this.validator.showMessages();
            this.forceUpdate();
        }
    }

    _onChangeField = (field, e) => {
        let fields = this.state.fields;
        if (e.target.value.trim() == "") {
            fields[field] = "";
        } else {
            fields[field] = e.target.value;
        }
        this.setState({ fields });
    }

    openNotificationWithIcon(type) {
        notification[type]({
            message: 'Error',
            description: this.state.errMessage
        });
        this.setState({ errMsg: false });
    };

    render() {
        const { fields, errMsg, loader } = this.state;

        if (errMsg) {
            this.openNotificationWithIcon('error');
        }

        return (
            <Wrapper>
                <Row>
                    <Col span={6} />
                    <HeaderCol span={12}>
                        <span>Change Your Email Address</span>
                    </HeaderCol>
                </Row>
                <ChangeRow>
                    <ChangeCol>
                        <NewP>
                            <InputLabel>Email*</InputLabel>
                            <div>
                                <NewInput value={fields.email !== null ? fields.email : this.props.profileDetails.email}
                                    size="large" placeholder="Email" onChange={this._onChangeField.bind(this, "email")} />
                                {this.validator.message('Email', this.state.fields['email'], 'required|email')}
                            </div>
                        </NewP>
                        <Button_div>
                            <NewButton onClick={this._changeEmail}>Update</NewButton>
                        </Button_div>
                    </ChangeCol>
                </ChangeRow>
                {(loader == true) ? <FaldaxLoader /> : ""}
            </Wrapper>
        );
    }
}

function mapStateToProps(state) {
    return ({
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
        isLoggedIn: state.simpleReducer.isLoggedIn,
    })
}

export default connect(mapStateToProps)(createForm()(ChangeEmail));
