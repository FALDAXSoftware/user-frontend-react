import React, { Component } from "react";
import "antd/dist/antd.css";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { Row, Col, Card, Icon, Spin } from "antd";
import moment from "moment";
import styled from "styled-components";
import Navigation from "COMPONENTS/NAVIGATIONS/navigation";
import CommonFooter from "COMPONENTS/LANDING/FOOTERS/footer_home";
import { Container } from "STYLED-COMPONENTS/HOMEPAGE/style";
import { globalVariables } from "Globals.js";
import { SpinEx } from "STYLED-COMPONENTS/HOMEPAGE/style";
import {
  SectionBlog,
  WholeNews,
  BlogsWrap,
  MetaTitle,
  CardFoot,
  PrevNext,
  Prev,
  Next,
  CardCover,
  InputSearch,
  SearchWrap,
  RemoveButton,
  NoData
} from "STYLED-COMPONENTS/LANDING_CATEGORIES/blogStyle";

const ContainerBlog = styled(Container)`
  margin-bottom: 80px;
`;
const NewsMain = styled.div`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "white"};
`;
const NewsTitle = styled.span`
  font-size: 40px;
  font-family: "Open sans";
  font-weight: bold;
  display: block;
  text-align: center;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  &:before {
    content: "";
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    left: 0;
    top: calc(50% - 1px);
  }
  &:after {
    content: "";
    width: calc(50% - 140px);
    height: 1px;
    display: inline-block;
    background: #827777;
    position: absolute;
    right: 0;
    top: calc(50% - 1px);
  }
  @media (max-width: 767px) {
    &:before {
      display: none;
    }
    &:after {
      display: none;
    }
  }
`;

const { Meta } = Card;
/* const Search = Input.Search; */

class Blog extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blogsData: "",
      currPage: 1,
      prevPage: 1,
      totalPage: null,
      loader: false,
      nxtPage: 0,
      searchV: "",
      removeflag: false,
      searchClass: "",
      blogCSS: ""
    };
  }
  /* Life Cycle Methods */
  componentDidMount() {
    if (this.props.location.search !== "") {
      var bPage = this.props.location.search.split("=");
      this.BlogDetails(bPage[1]);
    } else {
      this.BlogDetails(1);
    }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({ searchClass: "news-search", blogCSS: "Card-Blog" });
        else
          this.setState({
            searchClass: "news-search-night",
            blogCSS: "Card-Blog-night"
          });
      }
    }
  }
  componentWillReceiveProps(props, newProps) {
    if (props.location.search.split("=")[1] === this.state.nxtPage) {
      this.BlogDetails(props.location.search.split("=")[1]);
    }
    if (props.location.search.split("=")[1] === this.state.prevPage) {
      this.BlogDetails(props.location.search.split("=")[1]);
    }

    if (props.theme !== undefined) {
      if (props.theme !== this.state.theme) {
        if (props.theme === false)
          this.setState({ searchClass: "news-search", blogCSS: "Card-Blog" });
        else
          this.setState({
            searchClass: "news-search-night",
            blogCSS: "Card-Blog-night"
          });
      }
    }
  }
  /*  
        Page:/news
        This method is called to get all news.
    */
  BlogDetails(curr, flag = null) {
    this.setState({ loader: true });
    var searchV = this.state.searchV;
    if (flag === true) searchV = "";
    var obj = {};
    obj["data"] = searchV;
    //var Buff=Buffer.from(URI).toString('base64')
    fetch(
      globalVariables.API_URL + `/users/get-all-news?page=${curr}&limit=9`,
      {
        method: "post",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify(obj)
      }
    )
      .then(response => response.json())
      .then(responseData => {
        if (responseData.status === 200) {
          var numb = Number(curr);
          this.setState({
            nxtPage: numb + 1,
            blogsData: responseData,
            currPage: curr,
            prevPage: numb - 1,
            totalPage: Math.ceil(responseData.NewsCount / 9),
            loader: false
          });
          if (searchV !== "") {
            this.setState({ removeflag: true });
          }
        }
      })
      .catch(error => {});
  }

  /*  
        Page:/news
        This method is called for change in Search of news.
    */

  searchChange(e) {
    this.setState({ searchV: e.target.value });
  }

  /*  
        Page:/news
        This method is called when you submit search.
    */

  submitSearch(e) {
    if (e.target.value.trim() !== "") {
      this.BlogDetails(1);
    }
  }

  /*  
        Page:/contact-us
        This method is called to clear search.
    */

  removeSearch() {
    this.setState({ searchV: "", removeflag: false });
    this.BlogDetails(1, true);
  }

  render() {
    const {
      searchClass,
      searchV,
      removeflag,
      blogsData,
      nxtPage,
      totalPage,
      currPage,
      loader
    } = this.state;
    var _self = this;
    return (
      <NewsMain>
        <Navigation />

        <ContainerBlog style={{ minHeight: "100%" }}>
          <SectionBlog>
            <div
              style={{
                display: "inline-block",
                width: "100%",
                position: "relative"
              }}
            >
              <NewsTitle>News </NewsTitle>
            </div>
            <SearchWrap>
              <InputSearch
                placeholder="Search News"
                onChange={value => this.searchChange(value)}
                style={{ width: "100%" }}
                className={searchClass}
                onPressEnter={e => this.submitSearch(e)}
                value={searchV}
              />
              {removeflag === true ? (
                <RemoveButton onClick={this.removeSearch.bind(this)}>
                  Clear Search <Icon type="close" />
                </RemoveButton>
              ) : (
                ""
              )}
            </SearchWrap>
            <WholeNews>
              <BlogsWrap>
                <Row className="blog-card-row">
                  {blogsData.data !== undefined
                    ? blogsData.data.map(function(result, key, index) {
                        var date = moment
                          .utc(result.posted_at)
                          .local()
                          .format("MMM DD, YYYY");
                        var img = result.cover_image;
                        var tag = result.tags ? result.tags.split(",") : [];
                        return (
                          <Col
                            key={key}
                            xl={8}
                            lg={12}
                            md={{ sapn: 12 }}
                            sm={24}
                            className="blog-card-col"
                          >
                            <a
                              href={result.link}
                              target="_blank"
                              title={result.title}
                            >
                              <Card
                                style={{ width: "100%" }}
                                cover={
                                  <CardCover
                                    alt="example"
                                    style={{ backgroundImage: `url(${img})` }}
                                  />
                                }
                                actions={[
                                  <CardFoot>{date}</CardFoot>,
                                  <CardFoot>{result.owner}</CardFoot>
                                ]}
                                bodyStyle={{
                                  paddingTop: "15px",
                                  paddingLeft: "25px",
                                  backgroundColor: "#f7f7f7",
                                  paddingBottom: "0px",
                                  paddingRight: "30px"
                                }}
                                className={_self.state.blogCSS}
                              >
                                <Meta
                                  title={
                                    <MetaTitle className="news-title">
                                      {result.title}
                                    </MetaTitle>
                                  }
                                />
                              </Card>
                            </a>
                          </Col>
                        );
                      })
                    : ""}
                  {blogsData !== undefined && blogsData !== "" ? (
                    blogsData.data.length === 0 ? (
                      <NoData>No Data Found</NoData>
                    ) : (
                      ""
                    )
                  ) : (
                    ""
                  )}
                </Row>
              </BlogsWrap>
            </WholeNews>
            <PrevNext>
              {currPage > 1 && currPage <= totalPage ? (
                <Link to={`/news?newsPage=${nxtPage - 2}`}>
                  <Prev>
                    <i
                      style={{
                        verticalAlign: "middle",
                        textDecoration: "none"
                      }}
                      className="material-icons"
                    >
                      keyboard_backspace
                    </i>
                    <span style={{ verticalAlign: "middle" }}>
                      Previous Articles
                    </span>
                  </Prev>
                </Link>
              ) : (
                ""
              )}

              {nxtPage <= totalPage ? (
                <Link to={`/news?newsPage=${nxtPage}`}>
                  <Next>
                    <span
                      style={{
                        verticalAlign: "middle",
                        textDecoration: "none"
                      }}
                    >
                      Next Articles
                    </span>
                    <i
                      style={{
                        verticalAlign: "middle",
                        transform: "rotate(180deg)"
                      }}
                      className="material-icons"
                    >
                      keyboard_backspace
                    </i>
                  </Next>
                </Link>
              ) : (
                ""
              )}
            </PrevNext>
          </SectionBlog>
        </ContainerBlog>

        <CommonFooter />
        {loader ? (
          <SpinEx className="Ex_spin">
            <Spin size="large" />
          </SpinEx>
        ) : (
          ""
        )}
      </NewsMain>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    theme:
      state.themeReducer.theme !== undefined ? state.themeReducer.theme : ""
  };
}

export default connect(mapStateToProps)(withRouter(Blog));
