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
const Second_Wrap = styled.div`
    background-color:#ffffff;
    text-align: center;
    border-bottom: 3px solid #0f477b;
`
const Second_head = styled.div`
    padding-top: 80px;
`
const Second_head_span = styled.span`
    font-size: 42px;
    font-family: "Open sans";
    color: rgb( 40, 37, 40 );
    line-height: 0.857;
`
const Card_img = styled.img`
    padding-top: 80px;
    width:auto;
    display: inline-block;
`
const Meta_main = styled(Meta)`
    margin-top:60px;
    margin-bottom:10px;
`
const Card_span = styled.span`
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
            dots: false,
            infinite: false,
            speed: 500,
            arrows: true,
            infinite: true,
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
            <Second_Wrap>
                <Second_head>
                    <Second_head_span>Features</Second_head_span>
                </Second_head>
                <div style={{ width: "90%", margin: "auto" }}>
                    <Slider {...settings}>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP17} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Security"
                                    description="It’s sad this has to be listed as a feature but  FALDAX was developed from the ground upto endure your security."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP18} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Coin & Token Selection"
                                    description="You shouldn’t have to have accounts on multiple exchanges to trade the crypto you’re interested. We have 73 coins/tokens ar launch with plans to add hundreds more."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP19} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Portfolio Management"
                                    description=" Stop paying for portfolio managemnet software and enjoy our rbust, free of charge portfolio instead. We also have some exciting upcoming additions not offered anywhere else. Click this link provide your email address to be notified when we announce these features!"
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP20} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Affilliate System"
                                    description="You love trading crypto so much that you tell all of your friends and family about it. When you do convience them to try it, why not make a little for your efforts too? Give them your affilliate link or code and you can!"
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP21} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Basic And Advanced UI"
                                    description="You should feel comfortable with our intuitive UI regardless of your trading experience. Toggle between ‘Basic’ and ‘Advanced’ and use what works best for you!"
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP22} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Advanced Charting Tools"
                                    description="By leveraging TradingView’s charting libraries, we are able to provide you with some of the most robust charting tools available today."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP23} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Collaboration "
                                    description=" Friends list, private messaging, group chats, live chart viewing/markup, chart saving, and so much more! Leam and share knowledge with other treaders easily."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP24} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Accounting "
                                    description="Download your transaction history for your records or texas in an Excel, CSV or PDF format in just a few clicks."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP25} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Bank-Level Wallet Security"
                                    description="We have partnered with BitGo to ensure the safety of your digital assets. *Some tokens offered are not covered by BitGo at this time. Check our Coin/Token list for more info."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP26} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Customizable Dashboard"
                                    description="We all consume information differently which is why we want to make sure that what you want to see, in the order you want to see it, is entirely up to you."
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                        <div>
                            <Card
                                hoverable={false}
                                className="features"
                                style={{ width: "100%", border: "none" }}
                                cover={<Card_img src={_GROUP27} alt="Card image cap" />}
                            >
                                <Meta_main
                                    title="Proprietary Code "
                                    description="Everything about FALDAX was built from scratch by a team of developers that have worked on projects for companies like Google, Motorola, Unilever, Done and many more. "
                                />
                                <Card_span>Learn More <i className="material-icons right_arr">keyboard_arrow_right</i></Card_span>
                            </Card>
                        </div>
                    </Slider>
                </div>
            </Second_Wrap>
        );
    }
}
