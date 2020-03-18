/* IN-built */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { connect } from "react-redux";
import { Input, Col, Table, Row, notification, Select, Button } from "antd";
import styled from "styled-components";
import { globalVariables } from "Globals.js";
import { CopyToClipboard } from "react-copy-to-clipboard";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import { translate } from "react-i18next";
import { LogoutUser } from "../../ACTIONS/authActions";

let { API_URL, _AMAZONBUCKET, TRADE_URL } = globalVariables;
/* CONSTANTS */
const Search = Input.Search;
const Option = Select.Option;
const data = [
  {
    key: "1",
    referral: "test1@tesst.com"
  },
  {
    key: "2",
    referral: "test2@tesst.com"
  },
  {
    key: "3",
    referral: "test3@test.com"
  }
];
const ParentWrap = styled.div`
  margin-top: 30px;
`;
const Header_text = styled.div`
  font-size: 25px;
  font-family: "Open Sans";
  font-weight: 600;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 80, 80, 80 )"};
  line-height: 2.4;
  margin-top: 10px;
  text-align: center;
`;
const Ref_div = styled.div`
  margin: auto;
  width: 80%;
  background-color: ${props =>
    props.theme.mode === "dark" ? "041422" : "#fcfcfc"};
  border: 1px solid #d6d6d6;
  margin-top: 40px;
  border-radius: 10px;
  height: auto;
  @media (min-width: 2500px) {
    width: 40%;
  }
  & .coin-value {
    width: 200px !important;
  }

  .CoinsEarned {
  }
  .amtSpan {
    margin-left: 10px;
    font-weight: 600;
    font-family: "Open Sans";
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  .ColWrap {
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    .ant-select-selection--single {
      background: ${props => (props.theme.mode === "dark" ? "#041422" : "")};
      .ant-select-selection-selected-value {
        color: ${props => (props.theme.mode === "dark" ? "white" : "")};
      }
    }
    .ant-select-arrow {
      color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    }
  }
  .earnTitle {
    font-family: "Open Sans";
    font-size: 16px;
    font-weight: bold;
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
  @media (max-width: 767px) {
    .ColWrap {
      height: 60px;
    }
  }
`;
const Ref_leftcol = styled(Col)`
  text-align: left;
  padding-left: 35px;
  &:after {
    top: 8%;
    position: absolute;
    height: 84%;
    right: 0px;
    border-right: 1px solid #d6d6d6;
  }
  @media (max-width: 600px) {
    // text-align:center;
  }
`;
export const RefInput = styled(Search)`
  width: 86%;
  // margin-left:35px;
  text-align: left;
  margin-top: 5px;
  margin-bottom: 32px;
  & .ant-btn-primary {
    background-color: rgb(0, 170, 250);
    border-color: rgb(0, 170, 250);
  }
  & .ant-table-tbody > tr:hover > td {
    background-color: #041422;
  }
  @media (max-width: 768px) {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
  }
`;
const Coming = styled.div`
  margin-top: 50px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  font-size: 32px;
  @media (max-width: 767px) {
    font-size: 20px;
  }
`;
const Ref_text = styled.div`
  text-align: left;
  font-size: 14.007px;
  font-family: "Open sans";
  color: rgba(119, 119, 119, 0.702);
  text-transform: uppercase;
  // margin-left:36px;
  margin-top: 25px;
  line-height: 2.571;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  @media (max-width: 768px) {
  }
`;
const Ref_rightcol = styled(Col)``;
const CollectButton = styled(Button)`
  margin-top: 10px;
  margin-bottom: 30px;
  background: ${props => (props.theme.mode == "dark" ? "#041422" : "")};
  color: ${props => (props.theme.mode == "dark" ? "white" : "")};
`;
const Right_value = styled.div`
  text-align: center;
  font-size: 20.01px;
  font-family: "Open sans";
  color: ${props => (props.theme.mode === "dark" ? "white" : "rgb( 0, 0, 0 )")};
  font-weight: bold;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  margin-top: 7px;

  @media (max-width: 768px) {
    margin-bottom: 20px;
  }
`;
const Right_text = styled.div`
  text-align: center;
  font-size: 14.007px;
  font-family: "Open sans";
  color: rgba(119, 119, 119, 0.702);
  text-transform: uppercase;
  line-height: 2.571;
  -moz-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -webkit-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  -ms-transform: matrix(0.99999985149599, 0, 0, 0.99949238260564, 0, 0);
  margin-top: 30px;

  @media (max-width: 768px) {
    margin-top: 15px;
  }
`;
const Ref_acc = styled.div`
  margin: auto;
  width: 80%;
  height: 140px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#041422" : "#ffffff"};
  border: 1px solid #d6d6d6;
  margin-top: 40px;
  border-radius: 10px;
  height: auto;
  margin-bottom: 65px;
  overflow: auto;
  > div {
    border-radius: 10px;
  }
  @media (min-width: 2500px) {
    width: 40%;
  }
`;

const RefTable = styled(Table)`
  min-width: 600px;
  & .ant-table-tbody > tr:hover > td {
    background-color: ${props =>
      props.theme.mode === "dark" ? "transparent" : "transparent"};
  }
  .ant-empty-description {
    color: ${props => (props.theme.mode === "dark" ? "white" : "black")};
  }
`;

export const CopiedText = styled.div`
  text-align: left;
`;

class Referral extends Component {
  constructor(props) {
    super(props);
    this.state = {
      referralLink: null,
      copied: false,
      referredData: [],
      referredCoin: [],
      searchCSS: "",
      coinSelected: "",
      perCoinEarned: "",
      totalEarned: 0,
      leftOutRef: 0,
      loader: false
    };
    this.coinsEarned = this.coinsEarned.bind(this);
    this.collectRefCoins = this.collectRefCoins.bind(this);
    this.getReferralData = this.getReferralData.bind(this);
    this.t = this.props.t;
  }
  /* Life-Cycle Methods */

  componentWillReceiveProps(props) {
    if (this.props !== props) {
      this.getReferralData();
    }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({ searchCSS: "Input_search_night" });
        else this.setState({ searchCSS: "INPUT_search" });
      }
    }
  }
  componentDidMount() {
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({
            searchCSS: "Input_search_night",
            referTable: "referral-table"
          });
        else
          this.setState({
            searchCSS: "INPUT_search",
            referTable: "referral-table-night"
          });
      }
    }
    this.getReferralData();
    if (this.props.profileDetails.referral_code !== undefined) {
      this.setState({
        referralLink:
          TRADE_URL + "/signup?refID=" + this.props.profileDetails.referral_code
      });
    }
  }
  getReferralData() {
    let { profileDetails } = this.props;
    this.setState({ loader: true });
    fetch(`${API_URL}/users/referredUsers`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status == 200) {
          let fiat = profileDetails.fiat;
          let fields = [];
          let sum = 0;
          let sum2 = 0;
          responseData.referredData.map(function(temp) {
            let fiatAmt =
              parseFloat(temp.amount) * parseFloat(temp.quote[`${fiat}`].price);
            //Sum of all fiatAmt.
            sum = sum + parseFloat(fiatAmt.toFixed(4));
            //Object Taken for fields for dropdown
            let obj = {
              coin_name: temp.coin_name,
              amount: temp.amount
            };
            //first time obj is pushed in fields
            if (fields.length == 0) {
              fields.push(obj);
            } else {
              let flag = false;
              let sum3 = 0;
              let index = "";
              //map for fields to remove duplicates
              fields.map(function(temp2, index) {
                if (temp2.coin_name == obj.coin_name) {
                  flag = true;
                  fields[index].amount = fields[index].amount + obj.amount;
                }
              });
              // console.log(sum3)
              if (flag == false) {
                fields.push(obj);
              }
            }
          });
          responseData.leftReferredData.map(function(temp) {
            let fiatAmt =
              parseFloat(temp.amount) * parseFloat(temp.quote[`${fiat}`].price);
            fiatAmt = parseFloat(fiatAmt).toFixed(8);
            sum2 = parseFloat(sum2) + parseFloat(fiatAmt);
            sum2 = parseFloat(sum2.toFixed(8));
          });
          this.setState({
            referredData: responseData.data,
            referredCoin: fields,
            totalEarned: sum.toFixed(8),
            leftOutRef: sum2.toFixed(8),
            loader: false
          });
        } else if (responseData.status == 403) {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.err
          );
          let tempValue2 = {};
          tempValue2["user_id"] = this.props.profileDetails.id;
          tempValue2["jwt_token"] = this.props.isLoggedIn;
          this.props.LogoutUser(this.props.isLoggedIn, tempValue2);
        }
      })
      .catch(error => {
        this.setState({ loader: false });
      });
  }
  /* 
        Page: /editProfile --> Referral
        It is called for custom notifications.
    */
  openNotificationWithIcon = (type, msg, desc) => {
    notification[type]({
      message: msg,
      description: desc,
      duration: 2
    });
  };

  /* 
        Page: /editProfile --> Referral
        It is called when copy is clicked.
        so this method copies the text to clipboard.
    */
  SearchText() {
    document.querySelectorAll(
      ".ant-input-search-button"
    )[0].onclick = function() {
      if (document.querySelectorAll(".INPUT_search > input")[0] !== undefined)
        document.querySelectorAll(".INPUT_search > input")[0].select();
      document.execCommand("copy");
    };
    this.openNotificationWithIcon(
      "success",
      this.t("validations:success_text.message"),
      this.t("general_1:referral_code_copy_text.message")
    );
  }
  coinsEarned(coin) {
    var coinAmt = 0;
    this.state.referredCoin.map(function(temp) {
      if (temp.coin_name == coin) {
        coinAmt = temp.amount;
      }
    });
    this.setState({
      coinSelected: coin,
      perCoinEarned: coinAmt
    });
  }
  collectRefCoins() {
    this.setState({ loader: true });
    fetch(`${API_URL}/collect-referral`, {
      method: "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + this.props.isLoggedIn
      }
    })
      .then(response => response.json())
      .then(async responseData => {
        if (responseData.status == 200) {
          this.openNotificationWithIcon(
            "success",
            this.t("validations:success_text.message"),
            responseData.message
          );
          this.setState(
            {
              coinSelected: "",
              perCoinEarned: ""
            },
            () => {
              this.getReferralData();
            }
          );
        } else {
          this.openNotificationWithIcon(
            "error",
            this.t("validations:error_text.message"),
            responseData.message
          );
          this.setState({ loader: false });
        }
      })
      .catch(error => {
        this.setState({ loader: false });
      });
  }
  render() {
    const [{ referralLink, referTable, referredData }, { t }] = [
      this.state,
      this.props
    ];
    const columns1 = [
      {
        title: `${t("settings:table_head_coin.message")} ${t(
          "referral_table_head_name.message"
        )}`,
        dataIndex: "coin_name"
      },
      {
        title: `${t("general_1:amount_collected_text.message")}`,
        dataIndex: "amount"
      }
    ];
    const columns = [
      {
        title: "    ",
        dataIndex: "profile_pic",
        render: text => (
          <img width="40px" height="40px" src={`${_AMAZONBUCKET}${text}`} />
        )
      },
      {
        title: `${t("referral_table_head_name.message")}`,
        dataIndex: "full_name"
      },
      {
        title: `${t("referral_table_head_accounts_referred.message")}`,
        dataIndex: "email"
      }
    ];
    return (
      <ParentWrap>
        <Header_text>{t("referral_head.message")}</Header_text>
        <Ref_div>
          <Row>
            <Ref_leftcol sm={24} md={18}>
              <Ref_text>{t("referral_text1.message")}</Ref_text>
              <CopyToClipboard
                text={referralLink}
                onCopy={() => this.setState({ copied: true })}
              >
                <CopiedText>
                  <RefInput
                    value={this.props.profileDetails.referral_code}
                    className={this.state.searchCSS}
                    placeholder={t("edit_profile_titles:head_referral.message")}
                    enterButton={t("copy_btn.message")}
                    size="large"
                    onSearch={value => this.SearchText()}
                  />
                </CopiedText>
              </CopyToClipboard>
            </Ref_leftcol>
            <Ref_rightcol sm={24} md={6}>
              <Right_text>{t("referral_text2.message")}</Right_text>
              <Right_value>
                {this.state.leftOutRef} {this.props.profileDetails.fiat}
              </Right_value>
              <CollectButton
                onClick={() => {
                  this.collectRefCoins();
                }}
              >
                {t("collect_btn.message")}
              </CollectButton>
            </Ref_rightcol>
          </Row>
        </Ref_div>
        {this.state.referredCoin.length > 0 ? (
          <Ref_div>
            <div className="CoinsEarned">
              <Row>
                <Col xs={24} sm={24} md={8}>
                  <div className="ColWrap">
                    <Select
                      onChange={this.coinsEarned}
                      value={this.state.coinSelected}
                      className="coin-value"
                    >
                      {this.state.referredCoin.map(function(temp) {
                        return (
                          <Option value={temp.coin_name}>
                            {temp.coin_name}
                          </Option>
                        );
                      })}
                    </Select>
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <div className="ColWrap">
                    <span className="earnTitle">
                      {t("conversion:earned_text.message")}:
                    </span>
                    {this.state.perCoinEarned !== "" ? (
                      <span className="amtSpan">
                        {" "}
                        {this.state.perCoinEarned.toFixed(8)}{" "}
                        {this.state.coinSelected}
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </Col>
                <Col xs={24} sm={24} md={8}>
                  <div className="ColWrap">
                    <span className="earnTitle">
                      {t("conversion:total_text.message")}{" "}
                      {t("conversion:earned_text.message")}:
                    </span>
                    <span className="amtSpan">
                      {this.state.totalEarned} {this.props.profileDetails.fiat}
                    </span>
                  </div>
                </Col>
              </Row>
            </div>
          </Ref_div>
        ) : (
          ""
        )}
        <Ref_acc>
          <div>
            <RefTable
              columns={columns}
              dataSource={referredData}
              size="middle"
              className={referTable}
              pagination={false}
            />
          </div>
        </Ref_acc>
        {this.state.loader === true || this.props.loader === true ? (
          <FaldaxLoader />
        ) : (
          ""
        )}
      </ParentWrap>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  LogoutUser: (isLoggedIn, user_id) => dispatch(LogoutUser(isLoggedIn, user_id))
});

function mapStateToProps(state) {
  return {
    isLoggedIn: state.simpleReducer.isLoggedIn,
    profileDetails:
      state.simpleReducer.profileDetails !== undefined
        ? state.simpleReducer.profileDetails.data[0]
        : ""
  };
}

export default translate([
  "referral",
  "edit_profile_titles",
  "conversion",
  "settings",
  "general_1"
])(connect(mapStateToProps, mapDispatchToProps)(Referral));
