/* Built-in Packages */
import React, { Component } from "react";
import "antd/dist/antd.css";
import { Row, Col } from "antd";
import { YearPicker, MonthPicker, DayPicker } from "react-dropdown-date";
import styled from "styled-components";
import moment from "moment";

const Picker_wrap = styled.div`
  & select[disabled] {
    color: ${props =>
      props.theme.mode === "dark"
        ? "#ffffff7a !important"
        : "rgba(0, 0, 0, 0.4) !important"};
    background: ${props =>
      props.theme.mode === "dark" ? "transparent !important" : ""};
  }
  & .ant-row.datepicker_main_row {
    & select {
      webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;
      background-size: 10px 8px !important;
      background-repeat: no-repeat !important;
      background-position: top 17px right 10px !important;
      background-image: ${props =>
        props.theme.mode === "dark"
          ? "url(/images/arrow_down_dark.png)!important"
          : "url(/images/arrow_down_light.png)"};
    }
  }
`;
let fields = {};

export default class Datepicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      year: null,
      month: null,
      day: null,
      dayCSS: "",
      monthCSS: "",
      yearCSS: ""
    };
  }
  /* Life-Cycle Methods */
  componentDidMount() {
    if (
      this.props.profileDetails.dob &&
      this.props.profileDetails.dob != "Invalid date" &&
      this.props.kyc != "kyc"
    ) {
      var dob = this.props.profileDetails.dob.split("-");
      let month = dob[1] - 1;
      let monthName;
      if (month == 0) monthName = "0";
      if (month == 1) monthName = "1";
      if (month == 2) monthName = "2";
      if (month == 3) monthName = "3";
      if (month == 4) monthName = "4";
      if (month == 5) monthName = "5";
      if (month == 6) monthName = "6";
      if (month == 7) monthName = "7";
      if (month == 8) monthName = "8";
      if (month == 9) monthName = "9";
      if (month == 10) monthName = "10";
      if (month == 11) monthName = "11";
      if (month === "") {
        monthName = ""; /* console.log(" i am in IF") */
      }
      this.setState({
        day: parseInt(dob[0]),
        month: monthName,
        year: dob[2]
      });
    }
    if (this.props.theme !== undefined) {
      if (this.props.theme !== this.state.theme) {
        if (this.props.theme === false)
          this.setState({
            dayCSS: "profile-day",
            monthCSS: "profile-month",
            yearCSS: "profile-year"
          });
        else
          this.setState({
            dayCSS: "profile-day-night",
            monthCSS: "profile-month-night",
            yearCSS: "profile-year-night"
          });
      }
    }
  }
  componentWillReceiveProps(newProps) {
    if (
      this.props.profileDetails.dob !== newProps.profileDetails.dob &&
      newProps.profileDetails.dob
    ) {
      var dob = newProps.profileDetails.dob.split("-");
      let month = dob[1] - 1;
      let monthName;
      if (month == 0) monthName = "0";
      if (month == 1) monthName = "1";
      if (month == 2) monthName = "2";
      if (month == 3) monthName = "3";
      if (month == 4) monthName = "4";
      if (month == 5) monthName = "5";
      if (month == 6) monthName = "6";
      if (month == 7) monthName = "7";
      if (month == 8) monthName = "8";
      if (month == 9) monthName = "9";
      if (month == 10) monthName = "10";
      if (month == 11) monthName = "11";
      if (month === "") {
        monthName = ""; /* console.log(" i am in IF") */
      }
      this.setState({
        day: parseInt(dob[0]),
        month: monthName,
        year: dob[2]
      });
    }
    if (this.props.kyc == "kyc" && this.props.kycData2 !== newProps.kycData2) {
      if (newProps.kycData2) {
        var date = newProps.kycData2.dob.split("-");
        let month1 = date[1] - 1;
        let monthName;
        if (month1 == 0) monthName = "0";
        if (month1 == 1) monthName = "1";
        if (month1 == 2) monthName = "2";
        if (month1 == 3) monthName = "3";
        if (month1 == 4) monthName = "4";
        if (month1 == 5) monthName = "5";
        if (month1 == 6) monthName = "6";
        if (month1 == 7) monthName = "7";
        if (month1 == 8) monthName = "8";
        if (month1 == 9) monthName = "9";
        if (month1 == 10) monthName = "10";
        if (month1 == 11) monthName = "11";
        if (month1 === "") {
          monthName = ""; /* console.log(" i am in IF") */
        }
        this.setState({
          day: Number(date[2]),
          month: monthName,
          year: date[0]
        });
      }
    }
  }
  /* 
        Page: /editProfile --> KYC/Personal Details
        It is called when date is changed.
    */

  onChangeDate(date, type) {
    // console.log("Step 1 -------> ", date, type);
    if (this.props.kyc !== "kyc") {
      if (type === "year") {
        this.setState({ year: date });
        fields[type] = date;
      } else if (type === "month") {
        let date1 = null;
        this.setState({ month: date });
        if (date == 0) date1 = "January";
        if (date == 1) date1 = "February";
        if (date == 2) date1 = "March";
        if (date == 3) date1 = "April";
        if (date == 4) date1 = "May";
        if (date == 5) date1 = "June";
        if (date == 6) date1 = "July";
        if (date == 7) date1 = "August";
        if (date == 8) date1 = "September";
        if (date == 9) date1 = "October";
        if (date == 10) date1 = "November";
        if (date == 11) date1 = "December";
        if (date === "") {
          date1 = ""; /* console.log(" i am in IF") */
        }

        if (
          (date == 0 ||
            date == 2 ||
            date == 4 ||
            date == 6 ||
            date == 7 ||
            date == 9 ||
            date == 11) &&
          this.state.day !== null
        ) {
          fields[type] = date1;
        } else {
          if (fields["day"] !== undefined && fields["day"] !== "") {
            if (date == 1) {
              if (fields["day"] > 29) {
                // console.log("Step 2------->", fields, date, date1)
                this.setState({ day: "" });
                fields["day"] = "";
              }
            } else if (date !== 1) {
              if (fields["day"] > 30) {
                // console.log("Step 2------->", fields, date, date1)
                this.setState({ day: "" });
                fields["day"] = "";
              }
            }
          }
          fields[type] = date1;
        }
      } else if (type === "day") {
        this.setState({ day: date });
        fields[type] = date;
      }
      let propFields;
      if (this.props.profileDetails.dob !== null) {
        // console.log("Step 2------->", this.props.profileDetails.dob);
        propFields = this.props.profileDetails.dob.split("-");
        // console.log(fields, fields["day"], fields["month"]);
        if (fields["day"] === undefined && propFields[2] !== undefined) {
          fields["day"] = propFields[0];
        }
        if (fields["month"] === undefined && propFields[1] !== undefined) {
          fields["month"] = propFields[1];
        }
        if (fields["year"] === undefined && propFields[0] !== undefined) {
          fields["year"] = propFields[2];
        }
      }
      if (
        !moment([fields["year"]]).isLeapYear() &&
        (fields["month"] == "02" || fields["month"] == "February") &&
        fields["day"] > 28
      ) {
        console.log("here");
        this.setState({ day: "" });
        fields["day"] = "";
      }
      if (
        moment([fields["year"]]).isLeapYear() &&
        (fields["month"] == "02" || fields["month"] == "February") &&
        fields["day"] > 29
      ) {
        // console.log("here");
        this.setState({ day: "" });
        fields["day"] = "";
      }
      // console.log("Step 4------->", fields)
      this.props.onDateChange(fields, "dob");
    } else {
      // console.log("step 2^^^^^^^^^^", date, type);
      if (type === "year") {
        this.setState({ year: date });
        fields[type] = date;
      } else if (type === "month") {
        let date1;
        this.setState({ month: date });
        if (date == 0) date1 = "January";
        if (date == 1) date1 = "February";
        if (date == 2) date1 = "March";
        if (date == 3) date1 = "April";
        if (date == 4) date1 = "May";
        if (date == 5) date1 = "June";
        if (date == 6) date1 = "July";
        if (date == 7) date1 = "August";
        if (date == 8) date1 = "September";
        if (date == 9) date1 = "October";
        if (date == 10) date1 = "November";
        if (date == 11) date1 = "December";

        if (date === "") {
          date1 = "";
        }
        if (
          (date == 0 ||
            date == 2 ||
            date == 4 ||
            date == 6 ||
            date == 7 ||
            date == 9 ||
            date == 11) &&
          this.state.day !== null
        ) {
          fields[type] = date1;
        } else {
          if (fields["day"] !== undefined && fields["day"] !== "") {
            if (date == 1) {
              if (fields["day"] > 29) {
                // console.log("Step 2------->", fields, date, date1)
                this.setState({ day: "" });
                fields["day"] = "";
              }
            } else if (date !== 1) {
              if (fields["day"] > 30) {
                // console.log("Step 2------->", fields, date, date1)
                this.setState({ day: "" });
                fields["day"] = "";
              }
            }
          }
          fields[type] = date1;
        }

        fields[type] = date1;
      } else if (type === "day") {
        this.setState({ day: date });
        fields[type] = date;
      }
      // console.log("KYC date", fields);
      let propFields1;
      if (
        this.props.kycData2.dob !== null &&
        this.props.kycData2.dob !== undefined
      ) {
        propFields1 = this.props.kycData2.dob.split("-");
        // console.log(fields["day"], propFields1[2]);
        // console.log("step 3", propFields1);
        if (fields["day"] === undefined && propFields1[2] !== undefined) {
          fields["day"] = propFields1[2];
        }
        if (fields["month"] === undefined && propFields1[1] !== undefined) {
          fields["month"] = propFields1[1];
        }
        if (fields["year"] === undefined && propFields1[0] !== undefined) {
          fields["year"] = propFields1[0];
        }
      }
      if (
        !moment([fields["year"]]).isLeapYear() &&
        (fields["month"] == "02" || fields["month"] == "February") &&
        fields["day"] > 28
      ) {
        // console.log("here");
        this.setState({ day: "" });
        fields["day"] = "";
      }
      if (
        moment([fields["year"]]).isLeapYear() &&
        (fields["month"] == "02" || fields["month"] == "February") &&
        fields["day"] > 29
      ) {
        // console.log("here");
        this.setState({ day: "" });
        fields["day"] = "";
      }
      // console.log("Final Result", fields);
      this.props.onDateChange(fields, "dob");
    }
  }

  render() {
    let date, year, month, day;
    if (this.props.kyc !== undefined) {
      if (
        this.props.kycData2 !== "" &&
        this.props.kycData2 !== null &&
        this.props.kycData2 !== undefined
      ) {
        if (
          this.props.kycData2.dob !== undefined &&
          this.props.kycData2.dob !== null
        ) {
          date = this.props.kycData2.dob.split("-");

          year = Number(date[2]);
          month = date[1];
          day = Number(date[0]);
          if (month !== null) {
            month = Number(month) - 1;
          }
        }
      }
    } else {
      if (
        this.props.profileDetails.dob !== undefined &&
        this.props.profileDetails.dob !== null
      ) {
        // console.log("profile ", this.props.kyc)

        if (this.props.profileDetails.dob !== undefined) {
          // console.log(
          //   "this.props.profileDetails.dob",
          //   moment(this.props.profileDetails.dob).date(),
          //   moment(this.props.profileDetails.dob).year(),
          //   moment(this.props.profileDetails.dob).get("month")
          // );
          // console.log(this.props.profileDetails.dob);
          date = this.props.profileDetails.dob.split("-");
          // year = moment(this.props.profileDetails.dob).year();
          // month = moment(this.props.profileDetails.dob).get("month");
          // day = moment(this.props.profileDetails.dob).date();
          year = Number(date[2]);
          month = date[1];
          day = Number(date[0]);
          // console.log("date---------", date, year, month, day);
          if (month !== null) {
            month = Number(month) - 1;
          }
        }
      }
    }
    let higherDate = new Date().getFullYear() - 18;
    let lowerDate = higherDate - 100;

    return (
      <Picker_wrap>
        <Row className="datepicker_main_row">
          <Col md={8} xl={8}>
            <DayPicker
              // mandatory
              disabled={this.props.disabled}
              year={this.state.year}
              // mandatory
              month={this.state.month}
              // mandatory if end={} is given in YearPicker
              endYearGiven
              // mandatory
              value={this.state.day !== null ? this.state.day : day ? day : ""}
              // mandatory
              onChange={day => {
                this.onChangeDate(day, "day");
                /* console.log(day); */
              }}
              id={this.state.dayCSS}
              name={"day"}
              optionClasses={"option-day"}
            />
          </Col>
          {/* {console.log(this.state.month !== null ? this.state.month : (month !== "" && month !== null) ? month : '')}
                    {console.log(this.state.month, month)} */}
          <Col md={8} xl={8}>
            <MonthPicker
              // mandatory if end={} is given in YearPicker
              disabled={this.props.disabled}
              endYearGiven
              // mandatory
              year={this.state.year}
              // mandatory
              value={
                this.state.month !== null
                  ? this.state.month
                  : month !== "" && month !== null
                  ? month
                  : ""
              }
              // mandatory
              onChange={month => {
                this.onChangeDate(month, "month");
                /*  console.log(month); */
              }}
              id={this.state.monthCSS}
              name={"month"}
              optionClasses={"option-month"}
            />
          </Col>
          <Col md={8} xl={8}>
            <YearPicker
              disabled={this.props.disabled}
              placeholder={"Select Year"}
              // default is 1900
              start={lowerDate}
              // default is current year
              end={higherDate}
              // default is ASCENDING
              // mandatory
              value={
                this.state.year !== null ? this.state.year : year ? year : ""
              }
              // mandatory
              onChange={year => {
                this.onChangeDate(year, "year");
                /* console.log(year); */
              }}
              id={this.state.yearCSS}
              name={"year"}
              optionClasses={"option-year"}
            />
          </Col>
        </Row>
      </Picker_wrap>
    );
  }
}
