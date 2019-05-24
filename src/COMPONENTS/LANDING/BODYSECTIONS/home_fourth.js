/* In-built Packages */
import React, { Component } from 'react';
import 'antd/dist/antd.css';
import { Row, Col } from 'antd';
import styled from 'styled-components';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { _TESTIMONY2, _Testimony3, _QUOTE } from 'CONSTANTS/images';

/* Components */
/* Global Components */
/* Styled-Components */
const Fourth_Row = styled(Row)`
    height:auto;
    background-color:#ffffff;
    padding-bottom: 45px;
    border-bottom: 3px solid #0f477b;
`
const First_Slider = styled.div`
    margin-top:140px
`
const Slide = styled.div`
    text-align:center;
`
const Slide_Img = styled.img`
    display: -webkit-inline-box;
`
const Slide_Span = styled.span`
    color:#0f477b;
`
const Second_Slider = styled.div`
    text-align:left;
    margin-top:50px;
`
const Sub_Slider = styled.div`
    margin-top:70px;
`
const P_Tag = styled.p`
    display:block;
`

/* Component Definition Starts here */
export default class HomeFourth extends Component {
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
            <Fourth_Row>
                <Col span={18} offset={3}>
                    <Col xxl={{ span: 10 }} xl={{ span: 10 }} sm={{ span: 24 }}>
                        <First_Slider>
                            <Slider {...settings}>
                                <div>
                                    <Slide>
                                        <Slide_Img src={_TESTIMONY2} /><br />
                                        <Slide_Span>Robert Leonard</Slide_Span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_Img src={_TESTIMONY2} /><br />
                                        <Slide_Span>Robert Leonard</Slide_Span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_Img src={_Testimony3} /><br />
                                        <Slide_Span>Robert Leonard</Slide_Span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                                <div>
                                    <Slide>
                                        <Slide_Img src={_Testimony3} /><br />
                                        <Slide_Span>Robert Leonard</Slide_Span>
                                        <p>ceo</p>
                                    </Slide>
                                </div>
                            </Slider>
                        </First_Slider>
                    </Col>
                    <Col xxl={{ span: 14 }} xl={{ span: 14 }} sm={{ span: 24 }}>
                        <Second_Slider >
                            <img alt="fourth" src={_QUOTE} />
                            <Sub_Slider>
                                <Slider {...settings2}>
                                    <div>
                                        <P_Tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_Tag>
                                    </div>
                                    <div>
                                        <P_Tag>
                                            Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_Tag>
                                    </div>
                                    <div>
                                        <P_Tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_Tag>
                                    </div>
                                    <div>
                                        <P_Tag>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo
                                            inventore veritatis et quasi beatae vitae dicta sunt explicabo.
                                            Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
                                        </P_Tag>
                                    </div>
                                </Slider>
                            </Sub_Slider>
                        </Second_Slider>
                    </Col>
                </Col>
            </Fourth_Row>
        );
    }
}
