/* Built-in Packages */
import React from "react";
import { connect } from "react-redux";
import { widget } from "CHARTING_LIB/charting_library.min";
import { globalVariables } from "Globals.js";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
const API_URL = globalVariables.API_URL;

const TVChart = styled.div`
  margin-top: 0px;
  // height: 100vh;
  height: 100%;
  &.Full_chart_height {
    height: 100vh;
  }
`;

class TradingViewChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto: "ETH",
      currency: "BTC",
    };
  }
  static defaultProps = {
    symbol: `ETH-BTC`,
    // symbol: 'AAPL',
    interval: "15",
    containerId: "tv_chart_container",
    // datafeedUrl: 'https://demo_feed.tradingview.com',
    datafeedUrl: `${API_URL}/tradingview`,
    libraryPath: `${process.env.PUBLIC_URL}/charting_library/`,
    chartsStorageUrl: "https://saveload.tradingview.com",
    chartsStorageApiVersion: "1.1",
    clientId: "tradingview.com",
    userId: "public_user_id",
    fullscreen: false,
    autosize: true,
    studiesOverrides: {},
  };
  tvWidget = null;
  componentWillReceiveProps(props, newProps) {
    /*         var self = this; */
    let flag = false;
    let crypto = this.state.crypto,
      currency = this.state.currency;
    if (props.cryptoPair !== undefined && props.cryptoPair !== "") {
      if (props.cryptoPair.crypto !== this.state.crypto) {
        this.setState({ crypto: props.cryptoPair.crypto });
        flag = true;
        crypto = props.cryptoPair.crypto;
      }
      if (props.cryptoPair.currency !== this.state.currency) {
        this.setState({ currency: props.cryptoPair.currency });
        currency = props.cryptoPair.currency;
        flag = true;
      }
    }

    if (flag === true) {
      const widgetOptions = {
        symbol: `${crypto}-${currency}`,
        // BEWARE: no trailing slash is expected in feed URL
        datafeed: new window.Datafeeds.UDFCompatibleDatafeed(props.datafeedUrl),
        interval: props.interval,
        container_id: props.containerId,
        library_path: props.libraryPath,
        locale: localStorage["i18nextLng"],
        disabled_features: [
          // "use_localstorage_for_settings",
          // "header_symbol_search",
          // "symbol_search_hot_key",
          "header_compare",
          "compare_symbol",
          // "header_saveload",
          // "header_settings",
          // "left_toolbar",
          // "header_undo_redo",
          // "study_dialog_search_control",
          // "go_to_date",
          // "timeframes_toolbar",
          "volume_force_overlay",
        ],
        enabled_features: ["high_density_bars"],
        charts_storage_url: props.chartsStorageUrl,
        charts_storage_api_version: props.chartsStorageApiVersion,
        client_id: props.clientId,
        user_id: props.userId,
        fullscreen: props.fullscreen,
        autosize: props.autosize,
        studies_overrides: props.studiesOverrides,
        theme: props.theme === true ? "Dark" : "Light",
        overrides: {
          "mainSeriesProperties.candleStyle.wickUpColor": "#008000",
          "mainSeriesProperties.candleStyle.wickDownColor": "#ff0000",
          "mainSeriesProperties.candleStyle.upColor": "#008000",
          "mainSeriesProperties.candleStyle.downColor": "#ff0000",
          "mainSeriesProperties.candleStyle.borderUpColor": "#008000",
          "mainSeriesProperties.candleStyle.borderDownColor": "#ff0000",
        },
      };

      const tvWidget = new widget(widgetOptions);
      this.tvWidget = tvWidget;

      tvWidget.onChartReady(() => {
        // const button = tvWidget.createButton()
        //     .attr('title', 'Click to show a notification popup')
        //     .addClass('apply-common-tooltip')
        //     .on('click', () => tvWidget.showNoticeDialog({
        //         title: 'Notification',
        //         body: 'TradingView Charting Library API works correctly',
        //         callback: () => {
        //             console.log('Noticed!');
        //         },
        //     }));
        // button[0].innerHTML = 'Check API';
      });
    }
  }

  componentDidMount() {
    console.log(
      "^^^prods",
      window.location.href,
      this.props,
      this.props.match.params.pair
    );
    let currency, crypto;

    if (this.props.match.params.pair) {
      currency = this.props.match.params.pair.split("-")[1];
      crypto = this.props.match.params.pair.split("-")[0];
    } else if (this.props.cryptoPair.crypto === undefined) {
      currency = this.state.currency;
      crypto = this.state.crypto;
    } else {
      currency = this.props.currency;
      crypto = this.props.crypto;
    }
    const widgetOptions = {
      symbol: `${crypto}-${currency}`,
      // BEWARE: no trailing slash is expected in feed URL
      datafeed: new window.Datafeeds.UDFCompatibleDatafeed(
        this.props.datafeedUrl
      ),
      interval: this.props.interval,
      container_id: this.props.containerId,
      library_path: this.props.libraryPath,
      locale: localStorage["i18nextLng"],
      disabled_features: [
        // "use_localstorage_for_settings",
        // "header_symbol_search",
        // "symbol_search_hot_key",
        "header_compare",
        "compare_symbol",
        // "header_saveload",
        // "header_settings",
        // "left_toolbar",
        // "header_undo_redo",
        // "study_dialog_search_control",
        // "go_to_date",
        // "timeframes_toolbar",
        "volume_force_overlay",
      ],
      enabled_features: ["high_density_bars"],
      charts_storage_url: this.props.chartsStorageUrl,
      charts_storage_api_version: this.props.chartsStorageApiVersion,
      client_id: this.props.clientId,
      user_id: this.props.userId,
      fullscreen: this.props.fullscreen,
      autosize: this.props.autosize,
      studies_overrides: this.props.studiesOverrides,
      theme: this.props.theme === true ? "Dark" : "Light",
      overrides: {
        "mainSeriesProperties.candleStyle.wickUpColor": "#008000",
        "mainSeriesProperties.candleStyle.wickDownColor": "#ff0000",
        "mainSeriesProperties.candleStyle.upColor": "#008000",
        "mainSeriesProperties.candleStyle.downColor": "#ff0000",
        "mainSeriesProperties.candleStyle.borderUpColor": "#008000",
        "mainSeriesProperties.candleStyle.borderDownColor": "#ff0000",
      },
    };

    const tvWidget = new widget(widgetOptions);
    this.tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      // const button = tvWidget.createButton()
      //     .attr('title', 'Click to show a notification popup')
      //     .addClass('apply-common-tooltip')
      //     .on('click', () => tvWidget.showNoticeDialog({
      //         title: 'Notification',
      //         body: 'TradingView Charting Library API works correctly',
      //         callback: () => {
      //             console.log('Noticed!');
      //         },
      //     }));
      // button[0].innerHTML = 'Check API';
    });
  }
  render() {
    return (
      <TVChart
        id={this.props.containerId}
        className={
          window.location.href.includes("/chart")
            ? "Full_chart_height"
            : "TVChartContainer"
        }
      />
    );
  }
}
function mapStateToProps(state) {
  return {
    /* isLoggedIn: state.simpleReducer.isLoggedIn,
        theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "", */
    cryptoPair:
      state.walletReducer.cryptoPair !== undefined
        ? state.walletReducer.cryptoPair
        : "",
    /*  profileDetails: state.simpleReducer.profileDetails !== undefined ? state.simpleReducer.profileDetails.data[0] : "", */
    /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
  };
}

export default withRouter(connect(mapStateToProps, null)(TradingViewChart));
