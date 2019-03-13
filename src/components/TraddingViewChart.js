import React from "react";
import { widget } from "../charting_library/charting_library.min";
import { globalVariables } from "../Globals";

import styled from 'styled-components';
const API_URL = globalVariables.API_URL;

const TVChart = styled.div`
    margin-top:0px;
    height: 100%;

`


class TraddingViewChart extends React.Component {
    static defaultProps = {
        symbol: 'XRP-BTC',
        // symbol: 'AAPL',
        interval: '1',
        containerId: 'tv_chart_container',
        // datafeedUrl: 'https://demo_feed.tradingview.com',
        datafeedUrl: `${API_URL}/tradingview`,
        libraryPath: '/charting_library/',
        chartsStorageUrl: 'https://saveload.tradingview.com',
        chartsStorageApiVersion: '1.1',
        clientId: 'tradingview.com',
        userId: 'public_user_id',
        fullscreen: false,
        autosize: true,
        studiesOverrides: {},
    };
    tvWidget = null;
    componentDidMount() {
        const widgetOptions = {
            symbol: this.props.symbol,
            // BEWARE: no trailing slash is expected in feed URL
            datafeed: new window.Datafeeds.UDFCompatibleDatafeed(this.props.datafeedUrl),
            interval: this.props.interval,
            container_id: this.props.containerId,
            library_path: this.props.libraryPath,
            locale: 'en',
            disabled_features: [
                'use_localstorage_for_settings',
                'header_symbol_search',
                'symbol_search_hot_key',
                'header_compare',
                'compare_symbol',
                'header_saveload',
                'header_settings',
                'left_toolbar',
                'header_undo_redo',
                'study_dialog_search_control',
                'go_to_date',
                'timeframes_toolbar'
            ],
            enabled_features: [],
            charts_storage_url: this.props.chartsStorageUrl,
            charts_storage_api_version: this.props.chartsStorageApiVersion,
            client_id: this.props.clientId,
            user_id: this.props.userId,
            fullscreen: this.props.fullscreen,
            autosize: this.props.autosize,
            studies_overrides: this.props.studiesOverrides,
            theme: this.props.theme == true ? "Dark" : "Light"
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
            <TVChart id={this.props.containerId} className={'TVChartContainer'} />
        );
    }
}
export default TraddingViewChart