/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { /* Checkbox,  */Table, notification, Modal } from 'antd';
import moment from 'moment';
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import SimpleReactValidator from 'simple-react-validator';


/* Components */
import { globalVariables } from 'Globals.js';
import { deleteAccount } from "ACTIONS/authActions"
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader"
import { NewButton, NewInput } from "COMPONENTS/SETTINGS/changePassword/change_email"

/* styled Components */
import { AccWrap,/*  NotiWrap, NotiHead, NotiDesc, CheckRow, CheckRow2, CheckCol, CheckCol2, CheckCol3, CheckCol4, HR, */ LoginHistory, HistoryHead, Heading, Desc, FontAwesomeIconS, TableWrap, HR2, DeleteWrap, DeleteHead, DeleteDesc, DeleteBtn, ButtonDel, PaginationS } from 'STYLED-COMPONENTS/SETTINGS/accsettingsStyle'


const IpButton = styled(NewButton)`
margin-top:20px;
`
const IpInput = styled(NewInput)`
    width:300px;
    margin-top:20px;
    padding-right:7px;
`
let { API_URL } = globalVariables;

const columns = [{
    title: 'Date/Time',
    dataIndex: 'date',
    key: 'date',
}, {
    title: 'IP Address',
    dataIndex: 'IP',
    key: 'IP',
}, {
    title: 'Device',
    className: "column_device",
    dataIndex: 'Device',
    key: 'Device'
}];

/* const dataSource = [{
    key: '1',
    date: 'Mike',
    IP: 32
}, {
    key: '2',
    date: 'John',
    IP: 42
}];

const columns_text = [, {
    title: 'Notifications',
    dataIndex: 'Notifications',
    className: "column-Noti",
    key: 'Notifications',
}, {
        title: 'Text',
        className: "column-Text",
        dataIndex: 'Text',
        key: 'Text',
    }, {
        title: 'Email',
        className: "column-Email",
        dataIndex: 'Email',
        key: 'Email',
    }];
const data_noti = [{
    key: '1',
    Notifications: "Deposits",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '2',
    Notifications: "Trade Execution",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '3',
    Notifications: "Withdrawals",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '4',
    Notifications: "Login",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '5',
    Notifications: "New Review",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '6',
    Notifications: "New Private Message",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '7',
    Notifications: "New Follower",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}, {
    key: '8',
    Notifications: "Order Execution",
    Text: <Checkbox></Checkbox>,
    Email: <Checkbox></Checkbox>,
}]; */
const confirm = Modal.confirm;


class Acc_settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loginHistory: [],
            notiCSS: '',
            historyCSS: '',
            historyCount: 0,
            page: 1,
            loader: false,
            fields: {
                ip: null
            }
        };
        this.validator = new SimpleReactValidator();
        this.getIpWhitelist = this.getIpWhitelist.bind(this);
    }

    /* Life Cycle Methods */
    componentWillReceiveProps(props, newProps) {
        /*  console.log(this.props)
         if(this.props.theme!==undefined)
         {
             if(this.props.theme !== this.state.theme)
             {
                 if(this.props.theme==false)
                     this.setState({searchCSS:"Input_search_night"})
                 else
                     this.setState({searchCSS:"INPUT_search"})
             }
         } */
    }
    componentDidMount() {
        this.getAllLoginHistory(1);
        this.getIpWhitelist();
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme === false)
                    this.setState({ notiCSS: "noti_table", historyCSS: 'history_table' })
                else
                    this.setState({ notiCSS: "noti_table_night", historyCSS: "history_table_night" })
            }
        }
    }

    getIpWhitelist() {
        fetch(API_URL + `/users/get-whitelist-ip`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log("Did IP : ", responseData)
                if (responseData.status == 200) {
                    let fields = {};
                    fields['ip'] = responseData.data.whitelist_ip;
                    this.setState({ fields });
                }
                else {
                    this.openNotificationWithIcon('error', responseData.status, responseData.err);
                }
            })
            .catch((error) => {
                console.log(error);
            })
    }

    /*
        Page: /editProfile --> Settings Tab
        it is called when we click Delete button and press confirm.
        Api is called for deactivating Account in this function.
    */

    deleteAccount() {
        /* console.log(this.props) */
        this.openNotificationWithIcon('success', 'Deleted', 'Account has been successfully deleted.')
        let value = {};
        value["email"] = this.props.email;
        value["user_id"] = this.props.profileDetails.id;
        value["jwt_token"] = this.props.isLoggedIn;
        this.props.deleteAccount(this.props.isLoggedIn, value)
    }

    /* 
        Page: /editProfile --> Settings Tab
        It is called once in ComponentDidMount and when u perform page change from handleHistoryPagination().
        Login History API is called in it.
    */

    getAllLoginHistory = (curr) => {
        var self = this;
        /* var Data = {}; */
        this.setState({ loader: true })
        fetch(API_URL + `/users/login-history?page=${curr}&limit=9`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                /*  console.log(responseData) */
                if (responseData.status == 200) {
                    let antTableData = [];
                    this.setState({ historyCount: responseData.historyCount })
                    Object.keys(responseData.data).map(function (key, index) {

                        var deviceType;
                        if (responseData.data[index].device_type === 1) deviceType = <FontAwesomeIconS icon={faMobileAlt} />
                        else if (responseData.data[index].device_type === 0) deviceType = <FontAwesomeIconS icon={faDesktop} />
                        else deviceType = <FontAwesomeIconS icon={faDesktop} />
                        let ip = "";
                        if (responseData.data[index].ip.split(":").length > 1) {
                            ip = responseData.data[index].ip.split(":")[3];
                        } else if (responseData.data[index].ip.split(":").length === 1) {
                            ip = responseData.data[index].ip
                        }
                        let date_format = self.props.profileDetails.date_format ? self.props.profileDetails.date_format : "DD/MM/YYYY";
                        let temp = {
                            key: key,
                            date: moment.utc(responseData.data[index].created_at).local().format(`${date_format}, HH:mm:ss`),
                            IP: ip,
                            Device: deviceType
                        };
                        antTableData.push(temp);
                    });
                    /* console.log("->>>>>>>>>",antTableData); */
                    self.setState({
                        loginHistory: antTableData,
                        loader: false
                    })
                }
                else {
                    self.setState({ loader: false });
                    this.openNotificationWithIcon('error', responseData.status, responseData.err);
                }

            })
            .catch(error => {
                this.openNotificationWithIcon('error', 'Error', error);
            })
    }

    /* 
        Page: /editProfile --> Settings Tab
        It is called when we change page.
        getAllLoginHistory() will be called from this function and login history API will be called.
    */

    handleHistoryPagination = (page) => {
        this.setState({ page }, () => {
            this.getAllLoginHistory(page);
        })
    }

    /* 
        Page: /editProfile --> Settings Tab
        It is called when we have to show notifications.
        Notification will be shown that acc. is deleted.
    */

    openNotificationWithIcon = (type, msg, desc) => {
        notification[type]({
            message: msg,
            description: desc,
            duration: 3,
        });
    };
    ope
    /* 
        Page: /editProfile --> Settings Tab
        It shows the confirm dialog box when we press delete button.
        on Clicking OK it will call deleteAccount().
    */

    showConfirm() {
        var me = this
        confirm({
            title: 'Do you want to delete the account?',
            content: 'Your account will be deleted, after clicking on the OK button.',
            onOk() {
                me.deleteAccount()
                return new Promise((resolve, reject) => {
                    setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
                }).catch(() => console.log('Oops errors!'));
            },
            onCancel() { },
        });
    }
    ipWhiteList() {
        console.log("I am Clicked");
        if (this.validator.allValid()) {
            this.setState({ loader: true })
            fetch(API_URL + `/users/add-whitelist-ip`, {
                method: "post",
                headers: {
                    Authorization: "Bearer " + this.props.isLoggedIn
                },
                body: JSON.stringify(this.state.fields)
            })
                .then(response => {
                    console.log(response)
                    return response.json()
                })
                .then((responseData) => {
                    console.log("Response ---> ", responseData)
                    if (responseData.status == 200) {
                        this.getIpWhitelist();
                        this.openNotificationWithIcon('success', responseData.status, responseData.message);
                        this.setState({ loader: false })

                    }
                    else {
                        this.setState({ loader: false })
                        this.openNotificationWithIcon('error', responseData.status, responseData.err);
                    }
                })
                .catch(error => {/* console.log(error) */
                    this.setState({ loader: false })

                })
        }
        else {
            this.validator.showMessages();
            this.forceUpdate();
        }

    }
    ipChange(e) {
        console.log(e.target.value)
        let fields = {}
        fields['ip'] = e.target.value;
        this.setState({
            fields
        })
    }
    render() {
        return (
            <AccWrap>
                {/* ----Notification code start ---- */}
                {/* <Noti_Wrap>
                    <Noti_Head>
                        <span>Notifications</span>
                    </Noti_Head>
                    <Noti_desc>
                         <span>Automatic Email Notifications</span>
                    </Noti_desc>
                </Noti_Wrap>
                <Check_Wrap>
                    <Table
                        className={this.state.notiCSS}
                        pagination={false}
                        dataSource={data_noti}
                        columns={columns_text} />
                </Check_Wrap>
                <HR /> */}
                {/* ----Notification code ends ---- */}
                <LoginHistory>
                    <HistoryHead>
                        <Heading>
                            <span>Login History</span>
                        </Heading>
                        <Desc>
                            {/* <span>This feature provides information about the last activity on this mail account and any concurrent activity.</span> */}
                        </Desc>
                    </HistoryHead>
                    <TableWrap>
                        <Table
                            className={this.state.historyCSS}
                            pagination={false}
                            bordered
                            dataSource={this.state.loginHistory}
                            columns={columns} />
                    </TableWrap>

                    <PaginationS
                        style={{ marginTop: '15px' }}
                        className="ant-users-pagination"
                        onChange={this.handleHistoryPagination.bind(this)}
                        pageSize={10}
                        current={this.state.page}
                        total={this.state.historyCount}
                    />
                </LoginHistory>
                <HR2 />
                <DeleteHead>
                    <span>Whitelist</span>
                </DeleteHead>
                <div>
                    <IpInput value={this.state.fields['ip']} onChange={this.ipChange.bind(this)}></IpInput>
                    {this.validator.message('ip', this.state.fields['ip'], 'required')}
                </div>
                <IpButton onClick={this.ipWhiteList.bind(this)}>Add</IpButton>
                <HR2 />
                <DeleteWrap>
                    <DeleteHead>
                        <span>Delete Account</span>
                    </DeleteHead>
                    <DeleteDesc>
                        <span>Click on the button below to permanently delete your account.</span>
                    </DeleteDesc>
                    <DeleteBtn>
                        <ButtonDel type="primary" onClick={this.showConfirm.bind(this)}>Delete Account</ButtonDel>
                    </DeleteBtn>
                </DeleteWrap>
                {(this.state.loader === true || this.props.loader === true) ? <FaldaxLoader /> : ""}
            </AccWrap>
        );
    }
}

const mapStateToProps = (state) => {
    /* console.log("personalDetails",state) */
    return {
        ...state,
        email: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0].email : "",
        loader: state.simpleReducer.loader,
        profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "",
    }
}
const mapDispatchToProps = dispatch => ({
    deleteAccount: (isLoggedIn, email) => dispatch(deleteAccount(isLoggedIn, email))
})

export default connect(mapStateToProps, mapDispatchToProps)(Acc_settings);