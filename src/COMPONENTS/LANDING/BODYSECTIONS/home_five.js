/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Card } from 'antd';
import styled from 'styled-components';
import Slider from "react-slick";
import {
    _GROUP17, _GROUP18, _GROUP19, _GROUP20, _GROUP21, _GROUP22, _GROUP23, _GROUP24, _GROUP25,
    _GROUP26, _GROUP27
} from 'CONSTANTS/images';

/* Components */
const { Meta } = Card;

/* Styled Components */
const SecondWrap = styled.div`
    background-color:#ffffff;
    text-align: center;
    border-bottom: 3px solid #0f477b;
`
const SecondHead = styled.div`
    padding-top: 80px;
`
const SecondHeadSpan = styled.span`
    font-size: 42px;
    font-family: "Open sans";
    color: rgb( 40, 37, 40 );
    line-height: 0.857;
`
const CardImg = styled.img`
    padding-top: 80px;
    width:auto;
    display: inline-block;
`
const MetaMain = styled(Meta)`
    margin-top:60px;
    margin-bottom:10px;
`
const CardSpan = styled.span`
    font-size: 16px;
    font-family: "Open sans";
    color: rgb( 15, 71, 123 );
    line-height: 2.25;
    text-align: left;
`

function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "black !important" }}
            onClick={onClick}
        />
    );
}

function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", color: "black !important" }}
            onClick={onClick}
        />
    );
}

export default class HomeFive extends Component {
    render() {
        var settings = {
            infinite: false,
            dots: false,
            speed: 500,
            arrows: true,
            slidesToShow: 3,
            slidesToScroll: 3,
            initialSlide: 0,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        initialSlide: 2
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        };
        return (
            <SecondWrap>
                <SecondHead>
                    <SecondHeadSpan>Features</SecondHeadSpan>
                </SecondHead>
                <div style={{ width: "90%", margin: "auto" }}>
                    <Slider {...settings}>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP17} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Security"
                                    description="It’s sad this has to be listed as a feature but  FALDAX was developed from the ground upto endure your security."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP18} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Coin & Token Selection"
                                    description="You shouldn’t have to have accounts on multiple exchanges to trade the crypto you’re interested. We have 73 coins/tokens ar launch with plans to add hundreds more."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP19} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Portfolio Management"
                                    description=" Stop paying for portfolio managemnet software and enjoy our rbust, free of charge portfolio instead. We also have some exciting upcoming additions not offered anywhere else. Click this link provide your email address to be notified when we announce these features!"
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP20} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Affilliate System"
                                    description="You love trading crypto so much that you tell all of your friends and family about it. When you do convience them to try it, why not make a little for your efforts too? Give them your affilliate link or code and you can!"
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP21} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Basic And Advanced UI"
                                    description="You should feel comfortable with our intuitive UI regardless of your trading experience. Toggle between ‘Basic’ and ‘Advanced’ and use what works best for you!"
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP22} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Advanced Charting Tools"
                                    description="By leveraging TradingView’s charting libraries, we are able to provide you with some of the most robust charting tools available today."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP23} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Collaboration "
                                    description=" Friends list, private messaging, group chats, live chart viewing/markup, chart saving, and so much more! Leam and share knowledge with other treaders easily."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP24} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Accounting "
                                    description="Download your transaction history for your records or texas in an Excel, CSV or PDF format in just a few clicks."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP25} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Bank-Level Wallet Security"
                                    description="We have partnered with BitGo to ensure the safety of your digital assets. *Some tokens offered are not covered by BitGo at this time. Check our Coin/Token list for more info."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP26} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Customizable Dashboard"
                                    description="We all consume information differently which is why we want to make sure that what you want to see, in the order you want to see it, is entirely up to you."
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<CardImg src={_GROUP27} alt="Card image cap" />}
                            >
                                <MetaMain
                                    title="Proprietary Code "
                                    description="Everything about FALDAX was built from scratch by a team of developers that have worked on projects for companies like Google, Motorola, Unilever, Done and many more. "
                                />
                                <CardSpan>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></CardSpan>
                            </Card>
                        </div>
                    </Slider>
                </div>
            </SecondWrap>
        );
    }
}
