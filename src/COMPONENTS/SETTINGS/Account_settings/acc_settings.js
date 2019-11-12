/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Checkbox, Table, notification, Modal, Switch, DatePicker } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { faDesktop, faMobileAlt } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import SimpleReactValidator from "simple-react-validator";

/* Components */
import { globalVariables } from "Globals.js";
import { deleteAccount } from "ACTIONS/authActions";
import { LogoutUser } from "ACTIONS/authActions";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import IpModal from "./ip_modal";

/* styled Components */
import {
  AccWrap,
  NotiWrap,
  NotiHead,
  NotiDesc,
  WrapTable,
  AddButton,
  NotificationTable,
  Code2FADiv,
  HR,
  LoginHistory,
  HistoryHead,
  Heading,
  Desc,
  FontAwesomeIconS,
  TableWrap,
  HR2,
  DeleteWrap,
  DeleteHead,
  DeleteDesc,
  DeleteBtn,
  ButtonDel,
  PaginationS,
  CheckWrap,
  DeactivateButtonWarp,
  DeButtonDiv,
  DeNewButton,
  SummaryTable,
  DeactivateWrapper,
  DeactiveWrap
} from "STYLED-COMPONENTS/SETTINGS/accsettingsStyle";
import {
  NewButton,
  NewInput
} from "COMPONENTS/SETTINGS/changePassword/change_email";
import {
  VerifyModal,
  Description,
  NewP,
  InputLabel,
  OTPInput,
  ButtonDiv
} from "./ip_modal";
import ThresholdNotification from "./threshold_notification";

// const { DatePicker } = DatePicker;

const IpButton = styled(NewButton)`
  margin-top: 20px;
`;
const IpInput = styled(NewInput)`
  width: 300px;
  margin-top: 20px;
  padding-right: 7px;
`;
let { API_URL } = globalVariables;

const columns = [
  {
    title: "Date/Time",
    dataIndex: "date",
    key: "date"
  },
  {
    title: "IP Address",
    dataIndex: "IP",
    key: "IP"
  },
  {
    title: "Device",
    className: "column_device",
    dataIndex: "Device",
    key: "Device"
  }
];

const confirm = Modal.confirm;
const ModalIpInput = styled(NewInput)``;
const DaysInput = styled(NewInput)``;

class Acc_settings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginHistory: [],
      notiCSS: "",
      historyCSS: "",
      historyCount: 0,
      ipCount: 0,
      pageHistory: 1,
      pageIp: 1,
      loader: false,
      showAddModal: false,
      showDeleteModal: false,
      whitelistData: [],
      visibleIpModal: false,
      data_noti: [],
      savedDataNoti: [],
      rangeDate: [],
      deleteText: "",
      deactivateText: "",
      code2fa: "",
      totalUSDOfWallet: "",
      showDeactivateModal: "",
      walletCoins: "",
      startValue: null,
      endValue: null,
      endOpen: false,
      daysErrMsg: "",
      isDateValid: false,
      validDays: "",
      user2fastatus: this.props.profileDetails.is_twofactor,
      // totalUSDOfWallet: this.props.totalUSDOfWallet,
      // showDeactivateModal: false,
      // walletCoins: this.props.walletCoins,
      // user2fastatus: this.props.user2fastatus,
      fields: {
        ip: null,
        days: null
      },
      isWhitelistIp: false
    };

    this.columns_text = [
      ,
      {
        title: "Notifications",
        dataIndex: "title",
        className: "column-Noti",
        key: "title"
      },
      {
        title: "Text",
        className: "column-Text",
        dataIndex: "text",
        key: "text",
        render: (value, record) => {
          // console.log(record, record.id);
          return (
            <Checkbox
              defaultChecked={JSON.parse(value)}
              key={record.id}
              onChange={e => this.checkBoxChange("text", e, record)}
            ></Checkbox>
          );
        }
      },
      {
        title: "Email",
        className: "column-Email",
        dataIndex: "email",
        key: "email",
        render: (value, record) => {
          // console.log(record, record.id);
          return (
            <Checkbox
              defaultChecked={JSON.parse(value)}
              key={record.id}
              onChange={e => this.checkBoxChange("email", e, record)}
            ></Checkbox>
          );
        }
      }
    ];
    this.columnsIP = [
      {
        title: "IP Whitelist",
        dataIndex: "ip",
        key: "ip"
      },
      {
        title: "Till Date",
        dataIndex: "expire_time",
        key: "day",
        render: src => {
          let date_format = this.props.profileDetails.date_format
            ? this.props.profileDetails.date_format
            : "DD/MM/YYYY";
          // console.log(src);
          return (
            <span>
              {src !== ""
                ? moment
                    .utc(src)
                    .local()
                    .format(`${date_format}, HH:mm:ss`)
                : "-"}
            </span>
          );
        }
      },
      {
        title: "Action",
        key: "action",
        render: src => {
          // console.log(src.is_permanent);
          return (
            <div>
              {src.is_permanent == true ? (
                "-"
              ) : (
                <div
                  onClick={this.deleteIP.bind(this, src)}
                  style={{ cursor: "pointer", color: "rgb(0, 170, 250)" }}
                >
                  Delete
                </div>
              )}
            </div>
          );
        }
      }
    ];

    this.validator = new SimpleReactValidator({
      ipvalid: {
        message: "Enter a valid IP address.",
        rule: val => {
          var RE = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      matchDelete: {
        message: "Please enter 'FORFEIT FUNDS'.",
        rule: val => {
          var RE = /^FORFEIT FUNDS$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      gttoday: {
        message: "Please enter upcoming date.",
        rule: val => {
          var a = moment();
          var b = moment(val);
          var ans = b.diff(a, "days", true); // "in a day"
          if (ans < 0) {
            // console.log("ans", ans);
            return false;
          } else {
            // console.log("ans1", ans);
            return true;
          }
        }
      }
    });
    this.validator1 = new SimpleReactValidator({
      matchDelete: {
        message: "Please enter 'FORFEIT FUNDS'.",
        rule: val => {
          var RE = /^FORFEIT FUNDS$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      },
      matchDeactivate: {
        message: "Please enter 'DEACTIVATE'.",
        rule: val => {
          var RE = /^DEACTIVATE$/;
          if (RE.test(val)) {
            return true;
          } else {
            return false;
          }
        }
      }
    });
    this.getIpWhitelist = this.getIpWhitelist.bind(this);
    this.addIpWhitelist = this.addIpWhitelist.bind(this);
    this.fianlIpWhitelist = this.fianlIpWhitelist.bind(this);
    this.onChangeSwitch = this.onChangeSwitch.bind(this);
    this.onChangeIP = this.onChangeIP.bind(this);
    this.openAddModal = this.openAddModal.bind(this);
    this.openDeleteModal = this.openDeleteModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getNotificationList = this.getNotificationList.bind(this);
    this.addData = this.addData.bind(this);
    this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    this.clearValidation = this.clearValidation.bind(this);
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
    this.getWalletSummary = this.getWalletSummary.bind(this);
    this.forfeitFunds = this.forfeitFunds.bind(this);
    this.handleDeactivateYes = this.handleDeactivateYes.bind(this);
    this.fianlPerIpWhitelist = this.fianlPerIpWhitelist.bind(this);
    this.addPerIpWhitelist = this.addPerIpWhitelist.bind(this);
    // this.onStartChange = this.onStartChange.bind(this);
    this.onChange = this.onChange.bind(this);
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
    this.setState({ user2fastatus: this.props.profileDetails.is_twofactor });
    console.log("walletCoins-------------------", this.state.user2fastatus);
  }
  componentWillMount() {
    this.getWalletSummary();
  }
  componentDidMount() {
    this.getAllLoginHistory(1);
    this.getIpWhitelist(this.state.pageIp);
    this.getNotificationList();
    this.getWalletSummary();
    if (
      this.props.profileDetails !== "" &&
      this.props.profileDetails !== undefined
    ) {
      this.setState({
        checked: this.props.profileDetails.security_feature
      });
      // console.log(this.props);
      if (
        this.props.profileDetails.is_whitelist_ip !== undefined &&
        this.props.profileDetails.is_whitelist_ip !== null
      ) {
        // console.log("9898989898988898989");
        this.setState({
          isWhitelistIp: this.props.profileDetails.is_whitelist_ip
        });
      }
    }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({ notiCSS: "noti_table", historyCSS: "history_table" });
        else
          this.setState({
            notiCSS: "noti_table_night",
            historyCSS: "history_table_night"
          });
      }
    }
  }
  onChange = value => {
    var a = moment();
    var b = moment(value);
    var ans = b.diff(a, "days"); // "in a day"

    // if (a.format("DD-MM-YYYY") === b.format("DD-MM-YYYY")) {
    //   this.setState({
    //     validDays: 1
    //   });
    // } else {
    //   this.setState({
    //     validDays: ans + 2
    //   });
    // }
    // console.log("startValue", ans + 1);
    this.setState({
      startValue: value,
      validDays: ans + 1
    });
  };
  clearValidation() {
    this.validator.hideMessages();
    this.validator1.hideMessages();
    this.forceUpdate();
    // rerender to hide messages for the first time
  }
  checkBoxChange(key, e, record) {
    // console.log(key, e, record);
    const { data_noti } = this.state;
    var tempData = data_noti;
    tempData.map(function(data, index) {
      if (data.id == record.id) {
        // console.log(tempData[key]);
        if (key == "text") tempData[index].text = e.target.checked;
        else tempData[index].email = e.target.checked;
      }
    });
    // console.log("------>>>>>", tempData);
    this.setState({ data_noti: tempData });
  }

  getNotificationList() {
    fetch(API_URL + `/get-notification-list`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log("Did IP : ", responseData);
        if (responseData.status == 200) {
          let b = JSON.parse(JSON.stringify(responseData.data));
          this.setState({ data_noti: responseData.data, savedDataNoti: b });
        } else {
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err
          );
        }
        this.setState({ loader: false });
      })
      .catch(error => {
        this.setState({ loader: false });
        this.openNotificationWithIcon("error", "Error", error);
        // console.log(error);
      });
  }
  addData() {
    const { data_noti } = this.state;
    this.setState({ loader: true });
    fetch(API_URL + `/update-notification-list`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data_noti)
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log("Did IP : ", responseData);
        if (responseData.status == 200) {
          let b = JSON.parse(JSON.stringify(responseData.data));
          this.setState({
            data_noti: responseData.data,
            savedDataNoti: b,
            loader: false
          });
        } else {
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err
          );
          this.setState({ loader: false });
        }
      })
      .catch(error => {
        this.setState({ loader: false });
        this.openNotificationWithIcon("error", "Error", error);

        // console.log(error);
      });
  }
  getIpWhitelist(pageIp) {
    fetch(API_URL + `/users/get-whitelist-ip?page=${pageIp}&limit=${10}`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        // console.log("Did IP : ", responseData);
        if (responseData.status == 200) {
          this.setState({
            whitelistData: responseData.data,
            ipCount: responseData.IPCount
          });
        } else {
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err
          );
        }
      })
      .catch(error => {
        // console.log(error);
      });
  }

  /*
        Page: /editProfile --> Settings Tab
        it is called when we click Delete button and press confirm.
        Api is called for deactivating Account in this function.
    */
  deleteUserAccount() {
    if (this.validator1.allValid()) {
      this.setState({ loader: true });
      // alert("btn clicked");
      let value = {};
      value["email"] = this.props.email;
      value["user_id"] = this.props.profileDetails.id;
      value["jwt_token"] = this.props.isLoggedIn;
      value["otp"] = this.state.code2fa;
      // value["otp"] = this.state.code2fa;
      console.log("deleteUserAccount value======================", value);
      // this.props.deleteAccount(this.props.isLoggedIn, value);
      fetch(API_URL + "/users/deleteAccount", {
        method: "delete",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + this.props.isLoggedIn
        },
        body: JSON.stringify(value)
      })
        .then(response => response.json())
        .then(responseData => {
          if (responseData.status == 200) {
            this.setState({ loader: false });
            this.openNotificationWithIcon(
              "success",
              "Deleted",
              "Account has been successfully deleted."
            );
            let tempValue2 = {};
            tempValue2["user_id"] = this.props.profileDetails.id;
            tempValue2["jwt_token"] = this.props.isLoggedIn;
            this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
          } else {
            this.openNotificationWithIcon("error", "Error", responseData.err);
          }
          // dispatch(removeLoader());
          this.setState({ loader: false });
        })
        .catch(error => {
          // dispatch(removeLoader());
          this.setState({ loader: false });
        });
    } else {
      this.validator1.showMessages();
      this.forceUpdate();
    }
  }

  deleteAccount() {
    /* console.log(this.props) */
    this.openNotificationWithIcon(
      "success",
      "Deleted",
      "Account has been successfully deleted."
    );
    let value = {};
    value["email"] = this.props.email;
    value["user_id"] = this.props.profileDetails.id;
    value["jwt_token"] = this.props.isLoggedIn;
    value["otp"] = this.state.code2fa;
    console.log("deleteAccount value======================", value);
    this.props.deleteAccount(this.props.isLoggedIn, value);
  }

  /* 
        Page: /editProfile --> Settings Tab
        It is called once in ComponentDidMount and when u perform page change from handleHistoryPagination().
        Login History API is called in it.
    */

  getAllLoginHistory = curr => {
    var self = this;
    /* var Data = {}; */
    this.setState({ loader: true });
    fetch(API_URL + `/users/login-history?page=${curr}&limit=9`, {
      method: "get",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        /*  console.log(responseData) */
        if (responseData.status == 200) {
          let antTableData = [];
          this.setState({ historyCount: responseData.historyCount });
          Object.keys(responseData.data).map(function(key, index) {
            var deviceType;
            if (responseData.data[index].device_type === 1)
              deviceType = <FontAwesomeIconS icon={faMobileAlt} />;
            else if (responseData.data[index].device_type === 0)
              deviceType = <FontAwesomeIconS icon={faDesktop} />;
            else deviceType = <FontAwesomeIconS icon={faDesktop} />;
            let ip = "";
            if (responseData.data[index].ip.split(":").length > 1) {
              ip = responseData.data[index].ip.split(":")[3];
            } else if (responseData.data[index].ip.split(":").length === 1) {
              ip = responseData.data[index].ip;
            }
            let date_format = self.props.profileDetails.date_format
              ? self.props.profileDetails.date_format
              : "DD/MM/YYYY";
            let temp = {
              key: key,
              date: moment
                .utc(responseData.data[index].created_at)
                .local()
                .format(`${date_format}, HH:mm:ss`),
              IP: ip,
              Device: deviceType
            };
            antTableData.push(temp);
          });
          /* console.log("->>>>>>>>>",antTableData); */
          self.setState({
            loginHistory: antTableData,
            loader: false
          });
        } else {
          self.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err
          );
        }
      })
      .catch(error => {
        this.openNotificationWithIcon("error", "Error", error);
      });
  };

  /* 
        Page: /editProfile --> Settings Tab
        It is called when we change page.
        getAllLoginHistory() will be called from this function and login history API will be called.
    */

  handleHistoryPagination = page => {
    this.setState({ pageHistory: page }, () => {
      this.getAllLoginHistory(page);
    });
  };

  handleIpPagination = page => {
    this.setState({ pageIp: page }, () => {
      this.getAllLoginHistory(page);
    });
  };
  /* 
        Page: /editProfile --> Settings Tab
        It is called when we have to show notifications.
        Notification will be shown that acc. is deleted.
    */

  openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
      duration: 3
    });
  };
  /* 
        Page: /editProfile --> Settings Tab
        It shows the confirm dialog box when we press delete button.
        on Clicking OK it will call deleteAccount().
    */

  showConfirm() {
    var me = this;
    confirm({
      title: "Do you want to delete the account?",
      content: "Your account will be deleted, after clicking on the OK button.",
      onOk() {
        me.deleteAccount();
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() {}
    });
  }
  openDeleteModal() {
    this.clearValidation();
    this.setState({
      showDeleteModal: true
    });
  }
  openDeactivateModal() {
    this.clearValidation();
    this.setState({
      showDeactivateModal: true
    });
  }
  openAddModal() {
    this.clearValidation();
    this.setState({
      showAddModal: true
    });
  }
  closeModal() {
    this.clearValidation();
    const wrapper = document.getElementById("wrapper");
    // console.log("wrapper.classList", wrapper);
    if (wrapper != null) {
      wrapper.classList.remove("is-nav-open");
      const deactivate = document.getElementById("deactivate");
      deactivate.classList.remove("hide");
    }
    this.setState({
      showAddModal: false,
      startValue: null,
      showDeleteModal: false,
      showDeactivateModal: false,
      code2fa: null,
      deleteText: null,
      deactivateText: null,
      fields: {
        ip: null,
        days: null
      }
    });
  }
  fianlPerIpWhitelist(fields) {
    this.setState({ loader: true });
    fetch(API_URL + `/users/add-whitelist-ip`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(fields)
    })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(responseData => {
        // console.log("Response ---> ", responseData);
        if (responseData.status == 200) {
          this.getIpWhitelist(this.state.pageIp);
          this.openNotificationWithIcon(
            "success",
            "SUCCESS",
            responseData.message
          );
          let fields = {
            days: null,
            ip: null
          };
          this.setState({
            loader: false,
            showAddModal: false,
            fields,
            visibleIpModal: false,
            isWhitelistIp: true
          });
        } else if (responseData.status == 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            "Error",
            responseData.err ? responseData.err : responseData.message
          );
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err ? responseData.err : responseData.message
          );
        }
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loader: false });
      });
  }
  fianlIpWhitelist(fields) {
    this.clearValidation();
    this.setState({ loader: true });
    var values = {
      ip: this.state.fields.ip,
      days: this.state.validDays
    };
    fetch(API_URL + `/users/add-whitelist-ip`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify(values)
    })
      .then(response => {
        // console.log(response);
        return response.json();
      })
      .then(responseData => {
        // console.log("Response ---> ", responseData);
        if (responseData.status == 200) {
          this.getIpWhitelist(this.state.pageIp);
          this.openNotificationWithIcon(
            "success",
            "SUCCESS",
            responseData.message
          );
          let fields = {
            ip: null
          };
          this.setState({
            loader: false,
            showAddModal: false,
            fields,
            daysErrMsg: "",
            isDateValid: false,
            startValue: null,
            visibleIpModal: false,
            isWhitelistIp: true
          });
        } else if (responseData.status == 500) {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            "Error",
            responseData.err ? responseData.err : responseData.message
          );
        } else {
          this.setState({ loader: false });
          this.openNotificationWithIcon(
            "error",
            responseData.status,
            responseData.err ? responseData.err : responseData.message
          );
        }
      })
      .catch(error => {
        // console.log(error);
        this.setState({ loader: false });
      });
  }
  addPerIpWhitelist(e, fields = null) {
    // console.log(fields, e);
    if (fields == null) {
      if (this.validator.allValid()) {
        this.fianlPerIpWhitelist(this.state.fields);
      } else {
        this.validator.showMessages();
        this.forceUpdate();
      }
    } else {
      this.fianlPerIpWhitelist(fields);
    }
  }
  addIpWhitelist(e, fields = null) {
    // console.log(fields, e);
    // if (fields == null) {
    //   if (this.validator.allValid() && this.state.daysErrMsg === null) {
    //     this.fianlIpWhitelist(this.state.fields);
    //   } else {
    //     this.validator.showMessages();
    //     this.forceUpdate();
    //   }
    // } else {
    //   this.fianlIpWhitelist(fields);
    // }
    if (this.validator.allValid()) {
      this.fianlIpWhitelist(this.state.fields);
    } else {
      // console.log("this.state.daysErrMsg", this.state.daysErrMsg);
      this.validator.showMessages();
      this.forceUpdate();
    }
  }

  deleteIP(src) {
    // console.log(src, this.props.isLoggedIn);
    this.setState({ loader: true });
    fetch(API_URL + `/users/delete-whitelist-ip`, {
      method: "delete",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({ id: src.id })
    })
      .then(response => {
        return response.json();
      })
      .then(responseData => {
        this.getIpWhitelist(this.state.pageIp);
        this.openNotificationWithIcon(
          "success",
          "SUCCESS",
          responseData.message
        );
        this.setState({ loader: false });
      })
      .catch(error => {
        /* console.log(error) */
        this.setState({ loader: false });
      });
  }
  ipChange(e) {
    // console.log(e.target.value, e);
    let fields = this.state.fields;
    if (e.target.value.trim() !== "") fields[e.target.name] = e.target.value;
    else fields[e.target.name] = "";
    this.setState({
      fields
    });
  }
  deleteText(e) {
    this.setState({
      deleteText: e.target.value
    });
  }
  deactivateText(e) {
    this.setState({
      deactivateText: e.target.value
    });
  }
  code2fa(e) {
    this.setState({
      code2fa: e.target.value
    });
  }
  onChangeSwitch(checked) {
    // console.log(checked);
    this.setState({ loader: true });
    fetch(API_URL + `/users/security-feature-status-change`, {
      method: "post",
      headers: {
        Authorization: "Bearer " + this.props.isLoggedIn
      },
      body: JSON.stringify({
        security_feature: checked
      })
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          this.setState(
            {
              checked
            },
            () => {
              this.openNotificationWithIcon(
                "success",
                "Success",
                responseData.message
              );
            }
          );
        } else {
          this.openNotificationWithIcon(
            "success",
            responseData.status,
            responseData.err
          );
        }
        this.setState({ loader: false });
      })
      .catch(error => {
        /* console.log(error) */
        this.openNotificationWithIcon(
          "error",
          "Error",
          "Something went wrong!"
        );
        this.setState({ loader: false });
      });
  }
  onChangeIP(checked) {
    // console.log(checked, API_URL, this.props);

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
    console.log("IP Modal Cancel");
    this.setState({ visibleIpModal: false, checkedIP: false });
  }
  getWalletSummary() {
    this.setState({
      loader: true
    });
    fetch(API_URL + `/user/deleteAccountCheck`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 201) {
          console.log("responsedata summary=-----------", responseData.data);
          this.setState({
            totalUSDOfWallet: responseData.usd_price.toFixed(2),
            walletCoins: responseData.data,
            user2fastatus: responseData.user2fastatus,
            loader: false
          });
          console.log(
            "responsedata walletCoins=-----------",
            this.state.walletCoins
          );
        } else if (responseData.status == 200) {
          console.log("responsedata summary=-----------", responseData.data);
          this.setState({
            walletCoins: null,
            user2fastatus: responseData.user2fastatus,
            loader: false
          });
          console.log(
            "responsedata walletCoins=-----------",
            this.state.walletCoins
          );
        }
      })
      .catch(error => {});
  }
  forfeitFunds() {
    this.closeModal();
    this.openDeactivateModal();
  }
  handleDeactivateYes() {
    const wrapper = document.getElementById("wrapper");
    wrapper.classList.add("is-nav-open");
    const deactivate = document.getElementById("deactivate");
    deactivate.classList.add("hide");
  }
  render() {
    const { fields, data_noti, savedDataNoti, startValue } = this.state;
    let disabled = true;
    // console.log(savedDataNoti, "-------------->", data_noti);
    if (JSON.stringify(savedDataNoti) === JSON.stringify(data_noti)) {
      disabled = true;
    } else {
      disabled = false;
    }
    return (
      <AccWrap>
        {/* ----Notification code start ---- */}
        <NotiWrap>
          <NotiHead>
            <span>Notifications</span>
          </NotiHead>
          <NotiDesc>
            <span>Automatic Email and/or Text Notifications</span>
          </NotiDesc>
        </NotiWrap>

        <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
          <WrapTable>
            <NotificationTable
              className={this.state.notiCSS}
              pagination={false}
              bordered={true}
              dataSource={data_noti}
              columns={this.columns_text}
              pagination={{ pageSize: 5, size: "small" }}
            />
          </WrapTable>
        </div>
        <AddButton disabled={disabled} onClick={this.addData}>
          Save
        </AddButton>

        <HR />
        {/* ---- Notification code ends ---- */}
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
            style={{ marginTop: "15px" }}
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
            <span>Security Settings</span>
          </DeleteHead>
          <DeleteDesc style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "1000px" }}>
              When set 'ON', changes to any security settings on your account
              will disable debits from your wallets for 24 hours. Additionally,
              you will be notified prior to changing any security settings and
              will have to confirm that you want to make those changes to ensure
              you don't accidently lock your wallet.
            </div>
          </DeleteDesc>
          {/* {console.log(this.state.checked)} */}
          <TableWrap>
            <Switch
              checkedChildren="ON"
              unCheckedChildren="OFF"
              defaultChecked
              onChange={this.onChangeSwitch}
              checked={this.state.checked}
            />
          </TableWrap>
        </div>
        {/* :
                        ""
                } */}
        <HR2 />
        <LoginHistory>
          <HistoryHead>
            <Heading>
              <span>IP Whitelist</span>
            </Heading>
            <Desc>
              {/* <span>This feature provides information about the last activity on this mail account and any concurrent activity.</span> */}
            </Desc>
          </HistoryHead>
          {!this.state.isWhitelistIp && (
            <TableWrap>
              <Switch
                checkedChildren="ON"
                unCheckedChildren="OFF"
                defaultChecked
                onChange={this.onChangeIP}
                checked={this.state.checkedIP}
              />
            </TableWrap>
          )}
          <IpModal
            visible={this.state.visibleIpModal}
            ipModalCancel={() => this.ipModalCancel()}
            permanentIp={fields => this.addPerIpWhitelist(null, fields)}
          />

          {this.state.isWhitelistIp && (
            <div>
              <TableWrap>
                <Table
                  className={this.state.historyCSS}
                  pagination={false}
                  bordered
                  dataSource={this.state.whitelistData}
                  columns={this.columnsIP}
                />
              </TableWrap>
              <PaginationS
                style={{ marginTop: "15px" }}
                className="ant-users-pagination"
                onChange={this.handleIpPagination.bind(this)}
                pageSize={10}
                hideOnSinglePage={true}
                current={this.state.pageIp}
                total={this.state.ipCount}
              />
              <IpButton onClick={this.openAddModal.bind(this)}>Add</IpButton>
            </div>
          )}
        </LoginHistory>
        <HR2 />
        <DeleteWrap>
          <DeleteHead>
            <span>Deactivate Account</span>
          </DeleteHead>
          <DeleteDesc>
            <span>Click on the button below to deactivate your account.</span>
          </DeleteDesc>
          <DeleteBtn>
            {/* <ButtonDel type="primary" onClick={this.showConfirm.bind(this)}> */}
            <ButtonDel
              type="primary"
              onClick={() => {
                if (this.state.walletCoins != null) {
                  // alert("openDeleteModal", this.state.walletCoins);
                  // console.log("openDeleteModal", this.state.walletCoins);
                  this.openDeleteModal();
                } else {
                  // alert("forfeitFunds", this.state.walletCoins);
                  // console.log("forfeitFunds", this.state.walletCoins);
                  this.openDeactivateModal();
                }
              }}
            >
              Deactivate Account
            </ButtonDel>
          </DeleteBtn>
        </DeleteWrap>
        {this.state.loader === true || this.props.loader === true ? (
          <FaldaxLoader />
        ) : (
          ""
        )}
        <VerifyModal
          visible={this.state.showAddModal}
          onCancel={this.closeModal}
          title="Whitelist an IP Address"
          footer={null}
        >
          <Description>
            {" "}
            A Whitelist enhances the security of your account by limiting access
            to your account from IP Addresses you specify. Speak to your
            Internet Service Provider to ensure that your IP Address is 'Static'
            and will not change prior to enabling this security feature.
          </Description>
          <NewP className="add_new_ip">
            <InputLabel>IP Address*</InputLabel>
            <div className="otp-input-wrap">
              <OTPInput
                className="otp-input"
                value={this.state.fields.ip}
                size="medium"
                onChange={this.ipChange.bind(this)}
                name="ip"
                style={{ marginBottom: "20px" }}
              />
              {this.validator.message(
                "ip",
                this.state.fields.ip,
                "required|ipvalid",
                "text-danger-validation",
                { required: "IP field is required." }
              )}
            </div>
            {/* <InputLabel>Enter Days</InputLabel> */}
            <div className="range_picker_wrap">
              {/* <OTPInput
                style={{ paddingRight: "10px" }}
                min="1"
                value={this.state.fields.days}
                type="number"
                size="medium"
                onChange={this.ipChange.bind(this)}
                name="days"
              />
              {this.validator.message(
                "days",
                this.state.fields.days,
                "required",
                "text-danger-validation",
                { required: "Days field is required." }
              )} */}
              <DatePicker
                // disabledDate={this.disabledStartDate}
                // minDate={moment()}
                // disabledDate={this.disabledDate}
                // defaultValue={moment()}
                format="YYYY-MM-DD"
                value={startValue}
                placeholder="Select End Date"
                onChange={this.onChange}
                showToday={false}
              />
              {this.validator.message(
                "days",
                this.state.startValue,
                "required|gttoday",
                "text-danger-validation",
                { required: "End Date field is required." }
              )}
              {/* {this.state.daysErrMsg && (
                <div className="text-danger-validation">
                  {this.state.daysErrMsg}
                </div>
              )} */}
            </div>
          </NewP>
          <ButtonDiv>
            <NewButton onClick={this.addIpWhitelist}>Submit</NewButton>
          </ButtonDiv>
        </VerifyModal>
        <VerifyModal
          visible={this.state.showDeleteModal}
          onCancel={this.closeModal}
          title="Deactivate Account"
          footer={null}
          className="deactivate_modal"
        >
          <div>
            <Description> Below is the summary of your wallet</Description>
            <SummaryTable>
              <thead>
                <tr>
                  <th>Coins</th>
                  <th>Quantity</th>
                  <th>Fiat Value</th>
                </tr>
              </thead>
              {this.state.walletCoins ? (
                <tbody>
                  {this.state.walletCoins.map(function(temps) {
                    var balance = parseFloat(temps.totalAmount).toFixed(8);
                    var fiat = parseFloat(
                      temps.fiat * temps.totalAmount
                    ).toFixed(2);
                    return (
                      <tr>
                        <td>{temps.coin_name}</td>
                        <td>{balance}</td>
                        <td>$ {fiat}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2">Total Value (USD)</td>
                    <td>$ {this.state.totalUSDOfWallet}</td>
                  </tr>
                </tbody>
              ) : (
                ""
              )}
            </SummaryTable>
            <DeactivateButtonWarp>
              <DeButtonDiv
                onClick={() => {
                  this.props.history.push("/wallet");
                }}
              >
                <DeNewButton>Remove Existing Funds</DeNewButton>
              </DeButtonDiv>
              <DeButtonDiv className="right_btn" onClick={this.forfeitFunds}>
                <DeNewButton className="right_text">
                  Forfeit Funds & Deactivate
                </DeNewButton>
              </DeButtonDiv>
            </DeactivateButtonWarp>
          </div>
        </VerifyModal>
        <VerifyModal
          visible={this.state.showDeactivateModal}
          onCancel={this.closeModal}
          title="Deactivate Account"
          footer={null}
          className="deactivate_modal"
        >
          {this.state.walletCoins ? (
            <div>
              <Description> Below is the summary of your wallet</Description>
              <SummaryTable>
                <thead>
                  <tr>
                    <th>Coins</th>
                    <th>Quantity</th>
                    <th>Fiat Value</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.walletCoins.map(function(temps) {
                    var balance = parseFloat(temps.totalAmount).toFixed(8);
                    var fiat = parseFloat(
                      temps.fiat * temps.totalAmount
                    ).toFixed(2);
                    return (
                      <tr>
                        <td>{temps.coin_name}</td>
                        <td>{balance}</td>
                        <td>$ {fiat}</td>
                      </tr>
                    );
                  })}
                  <tr>
                    <td colSpan="2">Total Value (USD)</td>
                    <td>$ {this.state.totalUSDOfWallet}</td>
                  </tr>
                </tbody>
              </SummaryTable>
            </div>
          ) : (
            ""
          )}

          <DeactiveWrap className="" id="deactivate">
            <Description className="final_deactivate">
              Are you sure, you want to Deactivate your account?
            </Description>
            <DeactivateButtonWarp className="final_deactivate">
              <DeButtonDiv
                className="final_deactivate"
                onClick={this.closeModal}
              >
                <DeNewButton>No</DeNewButton>
              </DeButtonDiv>
              <DeButtonDiv
                className="right_btn final_deactivate"
                onClick={this.handleDeactivateYes}
              >
                <DeNewButton className="right_text">Yes</DeNewButton>
              </DeButtonDiv>
            </DeactivateButtonWarp>
          </DeactiveWrap>
          {this.state.walletCoins ? (
            <DeactivateWrapper className="wrapper" id="wrapper">
              <Description>
                *Any funds in your wallet will no longer be accessible after
                deactivation of account.
              </Description>
              <div className="nav__body">
                <NewP className="deactivate">
                  <InputLabel>
                    Type 'FORFEIT FUNDS' in the box below:
                  </InputLabel>
                  <div className="otp-input-wrap">
                    <OTPInput
                      className="otp-input"
                      value={this.state.deleteText}
                      size="medium"
                      onChange={this.deleteText.bind(this)}
                      name="ip"
                      style={{ marginBottom: "20px" }}
                    />
                    {this.validator1.message(
                      "text",
                      this.state.deleteText,
                      "required|matchDelete",
                      "text-danger-validation",
                      { required: "This field is required." }
                    )}
                  </div>
                  {this.state.user2fastatus ? (
                    <div>
                      <InputLabel>
                        Enter your 2FA code in the box below:
                      </InputLabel>
                      <div>
                        <OTPInput
                          style={{ paddingRight: "10px" }}
                          min="1"
                          value={this.state.code2fa}
                          type="text"
                          size="medium"
                          onChange={this.code2fa.bind(this)}
                          name="2FA code"
                        />
                        {this.validator1.message(
                          "2FA code",
                          this.state.code2fa,
                          "required|numeric|min:6|max:6",
                          "text-danger-validation",
                          { required: "2FA field is required." }
                        )}
                      </div>
                    </div>
                  ) : (
                    <Code2FADiv>
                      <p>2FA is mandatory to deactivate your account.</p>
                      <p>Please click on below link to enable 2FA.</p>
                      <Link to={"/editProfile"}>Click here</Link>
                    </Code2FADiv>
                  )}
                </NewP>
                <DeactivateButtonWarp className="final_deactivate">
                  <DeButtonDiv
                    className="final_deactivate"
                    onClick={this.closeModal}
                  >
                    <DeNewButton>Cancel</DeNewButton>
                  </DeButtonDiv>
                  {this.state.user2fastatus ? (
                    <DeButtonDiv
                      className="right_btn final_deactivate"
                      onClick={this.deleteUserAccount}
                    >
                      <DeNewButton className="right_text">Confirm</DeNewButton>
                    </DeButtonDiv>
                  ) : (
                    <DeButtonDiv
                      disabled
                      className="right_btn final_deactivate disabled"
                      onClick={this.deleteUserAccount}
                    >
                      <DeNewButton className="right_text">Confirm</DeNewButton>
                    </DeButtonDiv>
                  )}
                </DeactivateButtonWarp>
              </div>
            </DeactivateWrapper>
          ) : (
            <DeactivateWrapper className="wrapper" id="wrapper">
              {/* <Description>
                *Any funds in your wallet will no longer be accessible after
                deactivation of account.
              </Description> */}
              <div className="nav__body">
                <NewP className="deactivate deactivate_no_funds">
                  <InputLabel>Type 'DEACTIVATE' in the box below:</InputLabel>
                  <div className="otp-input-wrap">
                    <OTPInput
                      className="otp-input"
                      value={this.state.deactivateText}
                      size="medium"
                      onChange={this.deactivateText.bind(this)}
                      name="ip"
                      style={{ marginBottom: "20px" }}
                    />
                    {this.validator1.message(
                      "text",
                      this.state.deactivateText,
                      "required|matchDeactivate",
                      "text-danger-validation",
                      { required: "This field is required." }
                    )}
                  </div>
                  {this.state.user2fastatus ? (
                    <div>
                      <InputLabel>
                        Enter your 2FA code in the box below:
                      </InputLabel>
                      <div>
                        <OTPInput
                          style={{ paddingRight: "10px" }}
                          min="1"
                          value={this.state.code2fa}
                          type="text"
                          size="medium"
                          onChange={this.code2fa.bind(this)}
                          name="2FA code"
                        />
                        {this.validator1.message(
                          "2FA code",
                          this.state.code2fa,
                          "required|numeric|min:6|max:6",
                          "text-danger-validation",
                          { required: "2FA field is required." }
                        )}
                      </div>
                    </div>
                  ) : (
                    <Code2FADiv>
                      <p>2FA is mandatory to deactivate your account.</p>
                      <p>Please click on below link to enable 2FA.</p>
                      <Link to={"/editProfile"}>Click here</Link>
                    </Code2FADiv>
                  )}
                </NewP>
                <DeactivateButtonWarp className="final_deactivate">
                  <DeButtonDiv
                    className="final_deactivate"
                    onClick={this.closeModal}
                  >
                    <DeNewButton>Cancel</DeNewButton>
                  </DeButtonDiv>
                  {this.state.user2fastatus ? (
                    <DeButtonDiv
                      className="right_btn final_deactivate"
                      onClick={this.deleteUserAccount}
                    >
                      <DeNewButton className="right_text">Confirm</DeNewButton>
                    </DeButtonDiv>
                  ) : (
                    <DeButtonDiv
                      disabled
                      className="right_btn final_deactivate disabled"
                      onClick={this.deleteUserAccount}
                    >
                      <DeNewButton className="right_text">Confirm</DeNewButton>
                    </DeButtonDiv>
                  )}
                </DeactivateButtonWarp>
              </div>
            </DeactivateWrapper>
          )}
        </VerifyModal>
      </AccWrap>
    );
  }
}

const mapStateToProps = state => {
  /* console.log("personalDetails",state) */
  return {
    ...state,
    email:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0].email
        : "",
    loader: state.simpleReducer.loader,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
};
const mapDispatchToProps = dispatch => ({
  deleteAccount: (isLoggedIn, value) =>
    dispatch(deleteAccount(isLoggedIn, value)),
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

export default connect(mapStateToProps, mapDispatchToProps)(Acc_settings);
