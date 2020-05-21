/* Built-in Packages */
import React from "react";

/* Components */
import HistoryTable from "./historytable";
import { translate } from "react-i18next";

/*STYLED-COMPONENTS  */
import { LeftDiv2, Instru } from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";
class BuySell extends React.Component {
  /* Page:
        History table loader 
    */
  constructor(props) {
    super(props);
    this.t = this.props.t;
  }

  hisFunc(loader) {
    this.props.hisFunc(loader);
  }
  render() {
    return (
      <LeftDiv2>
        <Instru>{this.t("order_history_text.message")}</Instru>
        <HistoryTable
          hisFunc={(loader) => {
            this.hisFunc(loader);
          }}
          io={this.props.io}
          height={this.props.height}
          currency={this.props.currency}
          crypto={this.props.crypto}
        />
      </LeftDiv2>
    );
  }
}

export default translate(["trade"])(BuySell);
