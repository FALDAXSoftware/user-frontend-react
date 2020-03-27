import React, {Component} from "react";


class MarketWidget extends  Component{
    constructor(props) {
        super(props);
        this._ref = React.createRef();
    }
    componentDidMount() {
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-screener.js'
        script.async = true;
        script.innerHTML = JSON.stringify(  this.props.options)
        this._ref.current.appendChild(script);
    }
    render(){
        return(
            <div className="tradingview-widget-container" ref={this._ref} >
                <div className="tradingview-widget-container__widget"></div>
            </div>
        )
    }

}
export default MarketWidget
