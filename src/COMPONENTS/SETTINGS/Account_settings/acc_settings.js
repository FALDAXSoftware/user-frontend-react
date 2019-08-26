/* Built-in Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { connect } from "react-redux";
import { /* Checkbox,  */Table, notification, Modal, Button, Input, Switch } from 'antd';
import moment from 'moment';
import { faDesktop, faMobileAlt } from '@fortawesome/free-solid-svg-icons';
import styled from 'styled-components'
import SimpleReactValidator from 'simple-react-validator';


/* Components */
import { globalVariables } from 'Globals';
import { deleteAccount } from "ACTIONS/authActions"
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader"
import IpModal from "./ip_modal"

/* styled Components */
import { AccWrap,/*  NotiWrap, NotiHead, NotiDesc, CheckRow, CheckRow2, CheckCol, CheckCol2, CheckCol3, CheckCol4, HR, */ LoginHistory, HistoryHead, Heading, Desc, FontAwesomeIconS, TableWrap, HR2, DeleteWrap, DeleteHead, DeleteDesc, DeleteBtn, ButtonDel, PaginationS } from 'STYLED-COMPONENTS/SETTINGS/accsettingsStyle'
import { NewButton, NewInput } from "COMPONENTS/SETTINGS/changePassword/change_email"
import { VerifyModal, Description, NewP, InputLabel, OTPInput, ButtonDiv } from "./ip_modal"
import ThresholdNotification from './threshold_notification'
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
const ModalIpInput = styled(NewInput)`

`
const DaysInput = styled(NewInput)`

`
class Acc_settings extends Component {
    constructor(props) {
        super(props);
        this.columnsIP = [{
            title: 'IP Whitelist',
            dataIndex: 'ip',
            key: 'ip',
        }, {
            title: 'Till Date',
            dataIndex: 'expire_time',
            key: 'day',
            render: (src) => {
                let date_format = this.props.profileDetails.date_format ? this.props.profileDetails.date_format : "DD/MM/YYYY";
                console.log(src)
                return (
                    <span>
                        {src !== "" ? moment.utc(src).local().format(`${date_format}, HH:mm:ss`) : "-"}
                    </span>
                );
            }
        },
        {
            title: 'Action',
            key: 'action',
            render: (src) => {
                console.log(src.is_permanent)
                return (
                    <div>
                        {src.is_permanent == true ? "-" : <div onClick={this.deleteIP.bind(this, src)} style={{ cursor: "pointer", color: "rgb(0, 170, 250)" }}>
                            Delete
                </div>}</div>
                );
            },
        },]
        this.state = {
            loginHistory: [],
            notiCSS: '',
            historyCSS: '',
            historyCount: 0,
            ipCount: 0,
            pageHistory: 1,
            pageIp: 1,
            loader: false,
            showAddModal: false,
            whitelistData: [],
            visibleIpModal: false,
            fields: {
                ip: null,
                days: null
            },
            isWhitelistIp: false
        };

        this.validator = new SimpleReactValidator();
        this.closeModal = this.closeModal.bind(this);
        this.openAddModal = this.openAddModal.bind(this);
        this.getIpWhitelist = this.getIpWhitelist.bind(this);
        this.addIpWhitelist = this.addIpWhitelist.bind(this);
        this.onChangeSwitch = this.onChangeSwitch.bind(this);
        this.onChangeIP = this.onChangeIP.bind(this);
        this.fianlIpWhitelist = this.fianlIpWhitelist.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
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
        this.getIpWhitelist(this.state.pageIp);
        if (this.props.profileDetails !== "" && this.props.profileDetails !== undefined) {
            this.setState({
                checked: this.props.profileDetails.security_feature
            });
            console.log(this.props)
            if (this.props.profileDetails.is_whitelist_ip !== undefined && this.props.profileDetails.is_whitelist_ip !== null) {
                console.log("9898989898988898989")
                this.setState({
                    isWhitelistIp: this.props.profileDetails.is_whitelist_ip
                });
            }
        }
        if (this.props.theme !== undefined) {
            if (this.props.theme !== this.state.theme) {
                if (this.props.theme === false)
                    this.setState({ notiCSS: "noti_table", historyCSS: 'history_table' })
                else
                    this.setState({ notiCSS: "noti_table_night", historyCSS: "history_table_night" })
            }
        }

    }

    getIpWhitelist(pageIp) {
        fetch(API_URL + `/users/get-whitelist-ip?page=${pageIp}&limit=${10}`, {
            method: "get",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            }
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log("Did IP : ", responseData)
                if (responseData.status == 200) {
                    this.setState({ whitelistData: responseData.data, ipCount: responseData.IPCount })
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
        this.setState({ pageHistory: page }, () => {
            this.getAllLoginHistory(page);
        })
    }

    handleIpPagination = (page) => {
        this.setState({ pageIp: page }, () => {
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
    }
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
    openAddModal() {
        this.setState({
            showAddModal: true
        })
    }
    closeModal() {
        this.setState({
            showAddModal: false
        });
    }
    fianlIpWhitelist(fields) {
        this.setState({ loader: true })
        fetch(API_URL + `/users/add-whitelist-ip`, {
            method: "post",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            },
            body: JSON.stringify(fields)
        })
            .then(response => {
                console.log(response)
                return response.json()
            })
            .then((responseData) => {
                console.log("Response ---> ", responseData)
                if (responseData.status == 200) {
                    this.getIpWhitelist(this.state.pageIp);
                    this.openNotificationWithIcon('success', "SUCCESS", responseData.message);
                    let fields = {
                        days: null,
                        ip: null
                    }
                    this.setState({ loader: false, showAddModal: false, fields, visibleIpModal: false, isWhitelistIp: true })

                }
                else {
                    this.setState({ loader: false })
                    this.openNotificationWithIcon('error', responseData.status, responseData.err ? responseData.err : responseData.message);
                }
            })
            .catch(error => {
                console.log(error)
                this.setState({ loader: false })

            })
    }
    addIpWhitelist(e, fields = null) {
        console.log(fields, e)
        if (fields == null) {

            if (this.validator.allValid()) {
                this.fianlIpWhitelist(this.state.fields);
            }
            else {
                this.validator.showMessages();
                this.forceUpdate();
            }
        }
        else {
            this.fianlIpWhitelist(fields);
        }

    }
    deleteIP(src) {
        console.log(src, this.props.isLoggedIn);
        this.setState({ loader: true })
        fetch(API_URL + `/users/delete-whitelist-ip`, {
            method: "delete",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn
            },
            body: JSON.stringify({ id: src.id })
        })
            .then(response => {
                return response.json()
            })
            .then((responseData) => {
                this.getIpWhitelist(this.state.pageIp);
                this.openNotificationWithIcon('success', "SUCCESS", responseData.message);
                this.setState({ loader: false })

            })
            .catch(error => {/* console.log(error) */
                this.setState({ loader: false })
            })

    }
    ipChange(e) {
        console.log(e.target.value, e)
        let fields = this.state.fields
        if (e.target.value.trim() !== "")
            fields[e.target.name] = e.target.value;
        else
            fields[e.target.name] = "";
        this.setState({
            fields
        })
    }
    onChangeSwitch(checked) {
        console.log(checked);
        this.setState({ loader: true });
        fetch(API_URL + `/users/security-feature-status-change`, {
            method: "post",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn,
            },
            body: JSON.stringify({
                security_feature: checked
            })
        })
            .then(response => response.json())
            .then((responseData) => {
                if (responseData.status == 200) {
                    this.setState({
                        checked
                    }, () => {
                        this.openNotificationWithIcon("success", "Success", responseData.message);
                    });

                }
                else {
                    this.openNotificationWithIcon("success", responseData.status, responseData.err);
                }
                this.setState({ loader: false });
            })
            .catch(error => {/* console.log(error) */
                this.openNotificationWithIcon("error", "Error", "Something went wrong!");
                this.setState({ loader: false })
            })

    }
    onChangeIP(checked) {

        console.log(checked, API_URL, this.props);

        this.setState({ visibleIpModal: true, checkedIP: checked });
        /* this.setState({ loader: true });

        fetch(API_URL + `/users/whitelist-ip-status-change`, {
            method: "post",
            headers: {
                Authorization: "Bearer " + this.props.isLoggedIn,
            },
            body: JSON.stringify({
                status: checked
            })
        })
            .then(response => response.json())
            .then((responseData) => {
                console.log(responseData)
                if (responseData.status == 200) {
                    console.log("Inside IF")
                    if (checked == true)
                        this.setState({ visibleIpModal: true, checkedIP: checked });
                }
                else {
                    console.log("Inside ELSE")
                    this.openNotificationWithIcon("error", responseData.status, responseData.err);
                }
                this.setState({ loader: false });
            })
            .catch(error => {
                console.log(error)
                this.openNotificationWithIcon("error", "Error", "Something went wrong!");
                this.setState({ loader: false })
            }) */

    }
    ipModalCancel() {
        console.log("IP Modal Cancel")
        this.setState({ visibleIpModal: false, checkedIP: false });
    }
    render() {
        const { fields } = this.state
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
                <ThresholdNotification isLoggedIn={this.props.isLoggedIn} />
                <HR2 />
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
                            columns={columns}
                        />
                    </TableWrap>

                    <PaginationS
                        style={{ marginTop: '15px' }}
                        className="ant-users-pagination"
                        size="small"
                        onChange={this.handleHistoryPagination.bind(this)}
                        pageSize={10}
                        hideOnSinglePage={true}
                        current={this.state.pageHistory}
                        total={this.state.historyCount}
                    />
                </LoginHistory>

                {/*  {
                    this.state.whitelistData.length > 0
                        ? */}
                <div>
                    <HR2 />
                    <DeleteHead>
                        <span>Security After Password Change</span>
                    </DeleteHead>
                    <DeleteDesc style={{ display: "flex", justifyContent: "center" }}>
                        <div style={{ width: "1000px" }}>Disable withdrawals for 24 hours, when any security method is changed, for added security purposes.Meanwhile a warning message should also be shown to the user before updating the security methods indicating the same.</div>
                    </DeleteDesc>
                    {console.log(this.state.checked)}
                    <TableWrap>
                        <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onChange={this.onChangeSwitch} checked={this.state.checked} />
                    </TableWrap>

                </div>
                {/* :
                        ""
                } */}
                <HR2 />
                <LoginHistory>
                    <HistoryHead>
                        <Heading>
                            <span>Whitelist IP</span>
                        </Heading>
                        <Desc>
                            {/* <span>This feature provides information about the last activity on this mail account and any concurrent activity.</span> */}
                        </Desc>
                    </HistoryHead>
                    {!this.state.isWhitelistIp &&
                        <TableWrap>
                            <Switch checkedChildren="ON" unCheckedChildren="OFF" defaultChecked onChange={this.onChangeIP} checked={this.state.checkedIP} />
                        </TableWrap>
                    }
                    <IpModal visible={this.state.visibleIpModal} ipModalCancel={() => this.ipModalCancel()} permanentIp={(fields) => this.addIpWhitelist(null, fields)} />

                    {this.state.isWhitelistIp &&
                        <div>
                            <TableWrap>
                                <Table
                                    className={this.state.historyCSS}
                                    pagination={false}
                                    bordered
                                    dataSource={this.state.whitelistData}
                                    columns={this.columnsIP} />
                            </TableWrap>
                            <PaginationS
                                style={{ marginTop: '15px' }}
                                className="ant-users-pagination"
                                onChange={this.handleIpPagination.bind(this)}
                                pageSize={10}
                                hideOnSinglePage={true}
                                current={this.state.pageIp}
                                total={this.state.ipCount}
                            />
                            <IpButton onClick={this.openAddModal.bind(this)}>Add</IpButton>
                        </div>
                    }
                </LoginHistory>
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
                <VerifyModal
                    visible={this.state.showAddModal}
                    onCancel={this.closeModal}
                    title="Add IP to Whitelist"
                    footer={null}
                >
                    <Description> Please enter IP which will be permanent for your FALDAX account.</Description>
                    <NewP>
                        <InputLabel>Enter IP*</InputLabel>
                        <div>
                            <OTPInput value={this.state.fields.ip}
                                size="medium" onChange={this.ipChange.bind(this)} name="ip" style={{ marginBottom: "20px" }} />
                            {this.validator.message("ip", this.state.fields.ip, "required", "text-danger-validation", { required: "IP field is required." })}
                        </div>
                        <InputLabel>Enter Days</InputLabel>
                        <div>
                            <OTPInput style={{ paddingRight: "10px" }} min="1" value={this.state.fields.days} type="number"
                                size="medium" onChange={this.ipChange.bind(this)} name="days" />
                        </div>
                    </NewP>
                    <ButtonDiv>
                        <NewButton onClick={this.addIpWhitelist}>Submit</NewButton>
                    </ButtonDiv>
                </VerifyModal>
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