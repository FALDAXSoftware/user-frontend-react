import React from "react";
import LoggedNavigation from "../../NAVIGATIONS/loggednavigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import FaldaxLoader from "SHARED-COMPONENTS/FaldaxLoader";
import {
  TokDashboardWrap,
  TokSideBar,
  TokRightContentWrap,
  TokWallet,
  TokTransactions,
  TokHeadWrap,
  TokHead,
  TokSubHead,
  TokWalletSection,
  TokWalletName,
  TokWalletAmount,
  TokLastTrans,
  TokLastLeft,
  TokLastRight,
  TokTransactionSection,
  TokRow,
  TokColImg,
  TokColInfo,
  TokColAmountInfo
} from "../../../STYLED-COMPONENTS/TOKEN/tokenStyle";

class TokenDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true
    };
  }

  componentDidMount() {
    this.setState({
      loader: false
    });
  }

  render() {
    return (
      <div>
        <LoggedNavigation />
        <TokDashboardWrap>
          <TokSideBar>
            <ul>
              <li className="active">
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Dashboard</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i class="fas fa-shopping-cart"></i>
                  <span className="content">Purchase</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-th-large"></i>
                  <span className="content">Redeem</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i class="fas fa-share"></i>
                  <span className="content">Send</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i class="fas fa-share request-icon"></i>
                  <span className="content">Request</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i class="fas fa-exchange-alt"></i>
                  <span className="content">Convert</span>
                </span>
              </li>
              <li>
                <span className="dash-item">
                  <i className="fas fa-cog"></i>
                  <span className="content">Settings</span>
                </span>
              </li>
            </ul>
          </TokSideBar>
          <TokRightContentWrap>
            <TokWallet>
              <TokHeadWrap>
                <TokHead>Wallet</TokHead>
                <TokSubHead>Hide empty wallets</TokSubHead>
              </TokHeadWrap>
              <TokWalletSection>
                <TokWalletName>
                  <span className="icon">
                    <img src="images/us-icon.png" alt="country-icon" />
                  </span>
                  <span className="name">United States Dollar X</span>
                </TokWalletName>
                <TokWalletAmount>
                  <span className="amount">512,021.20</span>
                  <span className="symbol">USDx</span>
                </TokWalletAmount>
                <TokLastTrans>
                  <TokLastLeft>
                    <span className="head">Last Transaction</span>
                    <span className="activity">Bought 29.00 USDx</span>
                  </TokLastLeft>
                  <TokLastRight>20 Mins Ago</TokLastRight>
                </TokLastTrans>
              </TokWalletSection>
              <TokWalletSection>
                <TokWalletName>
                  <span className="icon">
                    <img src="images/us-icon.png" alt="country-icon" />
                  </span>
                  <span className="name">United States Dollar X</span>
                </TokWalletName>
                <TokWalletAmount>
                  <span className="amount">512,021.20</span>
                  <span className="symbol">USDx</span>
                </TokWalletAmount>
                <TokLastTrans>
                  <TokLastLeft>
                    <span className="head">Last Transaction</span>
                    <span className="activity">Bought 29.00 USDx</span>
                  </TokLastLeft>
                  <TokLastRight>20 Mins Ago</TokLastRight>
                </TokLastTrans>
              </TokWalletSection>
              <TokWalletSection>
                <TokWalletName>
                  <span className="icon">
                    <img src="images/us-icon.png" alt="country-icon" />
                  </span>
                  <span className="name">United States Dollar X</span>
                </TokWalletName>
                <TokWalletAmount>
                  <span className="amount">512,021.20</span>
                  <span className="symbol">USDx</span>
                </TokWalletAmount>
                <TokLastTrans>
                  <TokLastLeft>
                    <span className="head">Last Transaction</span>
                    <span className="activity">Bought 29.00 USDx</span>
                  </TokLastLeft>
                  <TokLastRight>20 Mins Ago</TokLastRight>
                </TokLastTrans>
              </TokWalletSection>
            </TokWallet>
            <TokTransactions>
              <TokHeadWrap>
                <TokHead>Transactions</TokHead>
              </TokHeadWrap>
              <TokTransactionSection>
                <TokRow>
                  <TokColImg></TokColImg>
                  <TokColInfo>
                    <span className="amount-type">Received USDx</span>
                    <span className="amount-from">From Rosa</span>
                  </TokColInfo>
                  <TokColAmountInfo>
                    <span className="amount">30.00</span>
                    <span className="date">31 May</span>
                  </TokColAmountInfo>
                </TokRow>
                <TokRow>
                  <TokColImg></TokColImg>
                  <TokColInfo>
                    <span className="amount-type">Received USDx</span>
                    <span className="amount-from">From Rosa</span>
                  </TokColInfo>
                  <TokColAmountInfo>
                    <span className="amount">30.00</span>
                    <span className="date">31 May</span>
                  </TokColAmountInfo>
                </TokRow>
                <TokRow>
                  <TokColImg></TokColImg>
                  <TokColInfo>
                    <span className="amount-type">Received USDx</span>
                    <span className="amount-from">From Rosa</span>
                  </TokColInfo>
                  <TokColAmountInfo>
                    <span className="amount">30.00</span>
                    <span className="date">31 May</span>
                  </TokColAmountInfo>
                </TokRow>
                <TokRow>
                  <TokColImg></TokColImg>
                  <TokColInfo>
                    <span className="amount-type">Received USDx</span>
                    <span className="amount-from">From Rosa</span>
                  </TokColInfo>
                  <TokColAmountInfo>
                    <span className="amount">30.00</span>
                    <span className="date">31 May</span>
                  </TokColAmountInfo>
                </TokRow>
                <TokRow>
                  <TokColImg></TokColImg>
                  <TokColInfo>
                    <span className="amount-type">Received USDx</span>
                    <span className="amount-from">From Rosa</span>
                  </TokColInfo>
                  <TokColAmountInfo>
                    <span className="amount">30.00</span>
                    <span className="date">31 May</span>
                  </TokColAmountInfo>
                </TokRow>
              </TokTransactionSection>
            </TokTransactions>
          </TokRightContentWrap>
        </TokDashboardWrap>
        <CommonFooter />
        {this.state.loader ? <FaldaxLoader /> : ""}
      </div>
    );
  }
}

export default TokenDashboard;
