/* Built-in Packages */
import React from "react";

/* Components */
import { translate } from "react-i18next";
import BuyTable from "./buytable";
import SellTable from "./selltable";

/* STYLED-COMPONENTS */
import {
  LeftDiv,
  Instru,
  BBCWrap,
  BBCWrap2,
} from "STYLED-COMPONENTS/LOGGED_STYLE/tradeStyle";

class BuySell extends React.Component {
  /* 
        Page: /trade --> Buy Book
        It is called for loader of order book.
    */
  constructor(props) {
    super(props);
    this.t = this.props.t;
  }

  loaderfunc(loader) {
    this.props.buySellLoader(loader);
  }

  render() {
    return (
      <LeftDiv>
        <Instru>
          {this.t("order_book_text.message")} {this.props.crypto}/
          {this.props.currency}
        </Instru>
        <BBCWrap>
          {console.log(this.props.height)}

          <BuyTable
            currency={this.props.currency}
            crypto={this.props.crypto}
            loaderfunc={(loader) => {
              this.loaderfunc(loader);
            }}
            io={this.props.io}
            elementHeight={this.props.height}
            pricePrecision={this.props.pricePrecision}
            qtyPrecision={this.props.qtyPrecision}
          />
        </BBCWrap>

        <BBCWrap2>
          <SellTable
            io={this.props.io}
            crypto={this.props.crypto}
            currency={this.props.currency}
            height={this.props.height}
            pricePrecision={this.props.pricePrecision}
            qtyPrecision={this.props.qtyPrecision}
          />
        </BBCWrap2>
      </LeftDiv>
    );
  }
}
export default translate(["trade"])(BuySell);
