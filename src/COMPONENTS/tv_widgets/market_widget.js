import React, { Component } from "react";
import { translate } from "react-i18next";
class MarketWidget extends Component {
  constructor(props) {
    super(props);
    this.t = this.props.t;
    this._ref = React.createRef();
  }
  componentDidMount() {
    const script = document.createElement("script");
    script.src =
      "https://s3.tradingview.com/external-embedding/embed-widget-screener.js";
    script.async = true;
    script.innerHTML = JSON.stringify(this.props.options);
    this._ref.current.appendChild(script);
  }
  render() {
    return (
      <div className="tradingview-widget-container" ref={this._ref}>
        <div className="tradingview-widget-container__widget"></div>
        <div class="tradingview-widget-copyright">
          <a
            href="https://www.tradingview.com/markets/cryptocurrencies/prices-all/"
            rel="noopener"
            target="_blank"
          >
            <span class="blue-text">
              {this.t("cryptocurrency_market_text.message")}
            </span>
          </a>{" "}
          {this.t("by_tradingview_text.message")}
        </div>
      </div>
    );
  }
}
export default translate(["market"])(MarketWidget);
