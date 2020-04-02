import React, { Component } from 'react';
import {
    NewsHeader,
    NewsList,
    List,
    ListSpan,
    Listp,
    Date,
} from "STYLED-COMPONENTS/LOGGED_STYLE/dashStyle";
import { connect } from "react-redux";
import { globalVariables } from "Globals.js";
import { Scrollbars } from "react-custom-scrollbars";
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFull } from '@fortawesome/free-solid-svg-icons';
class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [],
            hasMoreNews: true,
            newsLoader: false,
        }
    }
    componentDidMount() {
        this.loadNews(1)
    }
    getDomainFromUrl = (url) => {
        var arr = url.split("/");
        var result = arr[2];
        return result;
    }
    loadNews = (page) => {
        var self = this;
        self.setState({ newsLoader: true });
        fetch(`${globalVariables.API_URL}/users/get-all-news?limit=50&page=${page}`, {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Accept-Language": localStorage["i18nextLng"]
            }
        })
            .then(response => response.json())
            .then(responseData => {
                // console.log(responseData);
                if (responseData.status === 200) {
                    let news = self.state.news;
                    responseData.data.map(element => {
                        news.push(element);
                    });

                    let hasMoreNews = true;

                    if (news.length >= parseInt(responseData.NewsCount)) {
                        hasMoreNews = false;
                    }
                    self.setState({
                        newsLoader: false,
                        news: news,
                        hasMoreNews: hasMoreNews
                    });
                }
            })
            .catch(error => {
                self.setState({ newsLoader: true });
            });
    }
    render() {
        return (
            <>
                <NewsHeader>NEWS</NewsHeader>
                <NewsList>
                    <Scrollbars
                        // style={{ height: 560 }}
                        hideTracksWhenNotNeeded={true}
                        className="scrollbar news"
                    >
                        {this.state.news.map((element, index) => (
                            <List>
                                <Date>
                                    {moment
                                        .utc(element.posted_at)
                                        .format(
                                            `${this.props.profileDetails.date_format} HH:mm`
                                        )}
                                </Date>
                                <ListSpan>
                                    {element.owner === "bitcoinist" && (
                                        <img
                                            alt="bit pic"
                                            src="/images/bitcoinist.png"
                                            style={{
                                                marginRight: "10px",
                                                height: "20px"
                                            }}
                                        />
                                    )}
                                    {element.owner === "cointelegraph" && (
                                        <img
                                            alt="bit pic"
                                            src="/images/cointelegraph.ico"
                                            style={{
                                                marginRight: "10px",
                                                height: "20px"
                                            }}
                                        />
                                    )}
                                    {element.owner === "bitcoin" && (
                                        <img
                                            alt="bit pic"
                                            src="/images/bitcoin.png"
                                            style={{
                                                marginRight: "10px",
                                                height: "20px"
                                            }}
                                        />
                                    )}
                                    {element.owner !== "bitcoinist" &&
                                        element.owner !== "cointelegraph" &&
                                        element.owner !== "bitcoin" && (
                                            <FontAwesomeIcon
                                                icon={faSquareFull}
                                                color="#d4d4d4"
                                                style={{ marginRight: "10px" }}
                                            />
                                        )}
                                    {this.getDomainFromUrl(element.link)}
                                </ListSpan>
                                <Listp href={element.link} target="_blank">
                                    {element.title}
                                </Listp>
                            </List>
                        ))}
                    </Scrollbars>
                </NewsList>
            </>
        );
    }
}
function mapStateToProps(state) {
    return {
        isLoggedIn: state.simpleReducer.isLoggedIn,
        // isLoggedIn:
        //   state.simpleReducer
        //     .isLoggedIn /*
        // theme: state.themeReducer.theme !== undefined ? state.themeReducer.theme : "", */,
        profileDetails:
            state.simpleReducer.profileDetails !== undefined
                ? state.simpleReducer.profileDetails.data[0]
                : ""
        /* loader:state.simpleReducer.loader?state.simpleReducer.loader:false */
    };
}

export default connect(mapStateToProps)(News);