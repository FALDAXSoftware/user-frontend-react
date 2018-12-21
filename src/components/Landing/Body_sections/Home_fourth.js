/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Testimony2, Testimony3, Quote } from '../../../Constants/images';

/* Components */
/* Global Components */
/* Styled-Components */
const FourthRow = styled(Row)`
    height:auto;
    background-color:#ffffff;
    padding-bottom: 45px;
    border-bottom: 3px solid #0f477b;
`
const FirstSlider = styled.div`
    margin-top:140px
`
const Slide = styled.div`
    text-align:center;
`
const Slide_img = styled.img`
    display: -webkit-inline-box;
`
const Slide_span = styled.span`
    color:#0f477b;
`
const Secondslider = styled.div`
    text-align:left;
    margin-top:50px;
`
const Sub_slider = styled.div`
    margin-top:70px;
`
const P_tag = styled.p`
    display:block;
`

/* Component Defination Starts here */

export default class Home_fourth extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nav1: null,
            nav2: null
        };
    }

    componentDidMount() {
        this.setState({
            nav1: this.slider1,
            nav2: this.slider2
        });
    }

    render() {
        var settings = {
            arrows: false,
            slidesToShow: 3,
            asNavFor: this.state.nav2,
            ref: slider => (this.slider1 = slider),
            slidesToScroll: 1,
            centerMode: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        initialSlide: 2
                    }
                }
            ]
        };
        var settings2 = {
            asNavFor: this.state.nav1,
            arrows: false,
            dots: true,
            ref: slider => (this.slider2 = slider),
            slidesToShow: 1,
            swipeToSlide: true,
            focusOnSelect: true
        }
        return (
            <FourthRow>
                <Col span={18} offset={3}>
                    <Col xxl={{ span: 10 }} xl={{ span: 10 }} sm={{ span: 24 }}>
                        <FirstSlider>
                            <Slider {...settings}>
                                <div>
                                    <Slide>
                                        <Slide_img src={Testimony2} /><br />
                                        <Slide_span>Robert Leonard</Slide_span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_img src={Testimony2} /><br />
                                        <Slide_span>Robert Leonard</Slide_span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_img src={Testimony3} /><br />
                                        <Slide_span>Robert Leonard</Slide_span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_img src={Testimony3} /><br />
                                        <Slide_span>Robert Leonard</Slide_span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                            </Slider>
                        </FirstSlider>
                    </Col>
                    <Col xxl={{ span: 14 }} xl={{ span: 14 }} sm={{ span: 24 }}>
                        <Secondslider >
                            <img src={Quote} />
                            <Sub_slider>
                                <Slider {...settings2}>
                                    <div>
                                        <P_tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_tag>
                                    </div>
                                    <div>
                                        <P_tag>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_tag>
                                    </div>
                                    <div>
                                        <P_tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_tag>
                                    </div>
                                    <div>
                                        <P_tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_tag>
                                    </div>
                                </Slider>
                            </Sub_slider>
                        </Secondslider>
                    </Col>
                </Col>
            </FourthRow>
        );
    }
}
