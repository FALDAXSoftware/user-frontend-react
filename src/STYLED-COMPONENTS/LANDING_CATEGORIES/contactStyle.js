import styled from "styled-components";
import { Row, Col, Icon, Select } from "antd";
import DatePicker from "react-datepicker";
import Dropzone from "react-dropzone";
import IntlTelInput from "react-intl-tel-input";

export const HeadContact = styled.div``;
export const HeadSpan = styled.p`
  font-size: 20px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(51, 51, 51)"};
  font-weight: bold;
  text-transform: uppercase;
  line-height: 1.498;
  padding-top: 40px;
  margin-bottom: 30px;
  @media (max-width: 480px) {
    text-align: center;
  }
`;
export const ContactWrap = styled.div`
  background-color: #f5f6fa;
`;
export const GreyWrap = styled.div`
  padding-top: 110px;
  padding-bottom: 30px;
  background-color: ${props => (props.theme.mode === "dark" ? "#01090f" : "")};
`;
export const RowWrap = styled.div`
  padding-bottom: 80px;
`;
export const LeftCol = styled.div`
  padding-right: 90px;
  @media (max-width: 576px) {
    padding-right: 0px;
  }
`;
export const SubHead = styled.p`
  font-size: 19.975px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
  margin-top: 30px;
  font-weight: 600;
`;
export const FirstDiv = styled.div`
  margin-top: 30px;
`;
export const FirstLabel = styled.label`
  display: block;
  font-size: 13px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 0, 0, 0, 0.502 )"};
  caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
export const FirstInput = styled.input`
  border: 1px solid #e2e6ea;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  border-radius: 5px;
  min-height: 45px;
  width: 100%;
  padding-left: 5px;
`;
export const SecondDiv = styled.div`
  margin-top: 25px;
`;
export const SecondLabel = styled(FirstLabel)``;
export const SecondInput = styled(FirstInput)``;
export const ThirdDiv = styled(SecondDiv)``;
export const ThirdLabel = styled(FirstLabel)``;
export const ThirdInput = styled(FirstInput)``;
export const FourthDiv = styled.div``;
export const FourthLabel = styled(FirstLabel)`
  margin-top: 30px;
`;
export const FourthArea = styled.textarea`
  border: 1px solid #e2e6ea;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f8f8f8"};
  border-radius: 5px;
  min-height: 145px;
  width: 100%;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
export const FifthDiv = styled.div`
  margin-top: 30px;
`;
export const FifthButton = styled.button`
  min-width: 230px;
  background-color: #4c84ff;
  border: none;
  border-radius: 5px;
  min-height: 50px;
  color: white;
`;
export const MapWrap = styled.div`
  margin-top: 40px;
  @media (max-width: 575px) {
    max-width: 500px;
  }
`;
export const SubfootWrap = styled.div`
  margin-top: 30px;
  padding-bottom: 30px;
`;
export const MainWrap1 = styled.div`
  min-height: 130px;
  border-right: 1px solid #f3f3f6;
  display: inline-flex;
  align-items: center;
  width: 100%;
  @media (max-width: 1199px) {
    border-right: 0px;
    display: inline-block;
  }
`;
export const MainWrap2 = styled(MainWrap1)`
  border-right: none;
`;
export const MainWrap3 = styled(MainWrap1)`
  border-right: 0px;
`;
export const Main = styled.div`
  display: inline-block;
  padding-left: 30px;
  vertical-align: middle;
  @media (max-width: 1199px) {
    text-align: left;
  }
  @media (max-width: 480px) {
    padding-left: 10px;
  }
  @media (max-width: 576px) {
    width: 80%;
  }
  @media (max-width: 375px) {
    width: 86%;
  }
`;
export const Img1 = styled.img`
  @media (max-width: 480px) {
    width: 30px;
  }
`;
export const Img2 = styled.img`
  margin-left: 70px;
  @media (max-width: 1199px) {
    margin-left: 0px;
  }
  @media (max-width: 480px) {
    width: 30px;
  }
`;
export const Img3 = styled(Img2)`
  @media (max-width: 480px) {
    width: 30px;
  }
`;
export const SubSpan = styled.span`
  font-size: 15.983px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
  font-weight: 600;
`;
export const SubP = styled.p`
  font-size: 13.985px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode ? "#7e868d" : "rgba( 51, 51, 51, 0.502 )"};
  margin-bottom: 0px !important;
`;
/* Media Contact File */

export const CareerWrap = styled.div`
  padding-top: 45px;
  > iframe {
    border: none;
  }
  &.hbspt-form {
    display: flex;
  }
`;
export const SubHeadDiv = styled.div`
  text-align: center;
`;
export const LeftMedia = styled.div`
  min-height: 205px;
  line-height: 205px;
  width: 370px;
  background: white;
  display: inline-block;
  border: 1px solid #cad0e6;
  border-radius: 5px;
  margin-right: 15px;
  @media (max-width: 829px) {
    display: block;
    margin: 0px auto;
  }
  @media (max-width: 400px) {
    width: 285px;
  }
`;
export const RightMedia = styled.div`
  min-height: 205px;
  line-height: 205px;
  width: 370px;
  background: #0f467a;
  display: inline-block;
  border: 1px solid #cad0e6;
  border-radius: 5px;
  margin-left: 15px;
  @media (max-width: 829px) {
    display: block;
    margin: 0px auto;
    margin-top: 30px;
  }
  @media (max-width: 400px) {
    width: 285px;
  }
`;
export const TextWrap = styled.div`
  text-align: center;
  margin-top: 100px;
  margin-left: auto;
  margin-right: auto;
  max-width: 770px;
  @media (max-width: 767px) {
    max-width: 370px;
  }
  @media (max-width: 400px) {
    width: 285px;
  }
`;
export const LeftRow = styled(Row)`
  text-align: left;
  @media (max-width: 829px) {
  }
  @media (max-width: 400px) {
  }
`;
export const RightRow = styled(Row)`
  text-align: left;
  @media (max-width: 767px) {
  }
  @media (max-width: 400px) {
  }
`;
export const ColWrapR = styled.div`
  margin-left: 15px;
  @media (max-width: 767px) {
    margin-top: 20px;
    margin-left: 0px;
  }
`;
export const ColWrapL = styled.div`
  margin-right: 15px;
  @media (max-width: 767px) {
    margin-top: 20px;
    margin-left: 0px;
  }
`;
export const LTDiv = styled(Col)``;
export const LLDiv = styled(Col)``;
export const MediaUL = styled.ul`
  list-style-type: none;
  padding-left: 0px;
  margin-top: 15px;
`;
export const MediaLI = styled.li`
  display: inline-block;
  margin-right: 10px;
`;
export const MediaSpan = styled.span`
  font-size: 17.93px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(74, 74, 74)"};
  font-weight: bold;
  text-transform: uppercase;
`;
export const MediaP = styled.p`
    font-size: 13.94px;
    font-family: "Open Sans";
    color:${props =>
      props.theme.mode === "dark" ? "white" : "rgb(51, 51, 51)"}
    font-weight:600;
`;
export const BlueTag = styled.a`
  color: #4c84ff;
`;
export const BlueTagP = styled.a`
  color: #4c84ff;
`;

/* Add Coin Style */

export const Head = styled.div`
  margin-bottom: 60px;
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(51, 51, 51)"};
  @media (max-width: 480px) {
    padding-right: 10px;
    padding-left: 10px;
  }
`;
export const HeadTitle = styled.span`
  font-size: 20px;
  font-family: "Open Sans";
  font-weight: bold;
  text-transform: uppercase;
`;
export const HeadDesc = styled.p`
  margin-top: 10px;
  & ul {
    margin-top: 10px;
  }
  afont-size: 13.985px;
  font-family: "Open Sans";
`;
export const SubTitle = styled.p`
  font-size: 15.983px;
  font-family: "Open Sans";
  margin-top: 30px;
`;
export const Body = styled.div`
  @media (max-width: 480px) {
    padding-right: 10px;
    padding-left: 10px;
  }
`;
export const BodyText = styled.span`
  font-size: 20px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb(51, 51, 51)"};
`;
export const BodyForm = styled.div`
  border: 1px solid #d4dadf;
  border-radius: 5px;
  margin-top: 20px;
`;
export const FormCoin = styled.div`
  margin-top: 50px;
  margin-bottom: 50px;
`;
export const Left = styled.div`
  height: 45px;
  display: flex;
  align-items: center;
  padding-right: 15px;
  justify-content: flex-end;
  & > p {
    margin-bottom: 0px;
    font-size: 13px;
    font-family: "Open Sans";
    color: ${props => (props.theme.mode === "dark" ? "white" : "rgb(0, 0, 0)")};
    font-weight: 600;
  }
  @media (max-width: 1199px) {
    padding-left: 15px;
    justify-content: flex-start;
  }
`;
export const RightInput = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  > .intl-tel-input {
    width: 450px;
    @media (max-width: 792px) {
      width: 100% !important;
    }
  }
  & .form-control {
    border: 1px solid #e2e6ea;
    background-color: ${props =>
      props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    border-radius: 5px;
    min-height: 45px;
    width: 100%;
    padding-left: 5px;
  }
`;
export const CoinInput = styled(FirstInput)`
  max-width: 450px;
`;
export const SecurityInput = styled(Select)`
  width: 450px !important;
  margin-left: 0px !important;
  @media (max-width: 792px) {
    width: 100% !important;
  }
  & .ant-select-selection {
    border: 1px solid #e2e6ea;
    background-color: ${props =>
      props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
    border-radius: 5px;
    min-height: 45px;
    width: 100%;
    padding-left: 5px;
    padding-top: 5px;
  }
`;
export const IntlTelInputS = styled(IntlTelInput)`
  & .selected-dial-code {
    color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  }
`;
export const URLInput = styled(FirstInput)`
  max-width: 450px;
`;
export const TargetInput = styled(DatePicker)`
  border: 1px solid #e2e6ea;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  border-radius: 5px;
  min-height: 45px;
  width: 100%;
  padding-left: 5px;
  max-width: 450px;
`;
export const EmailInput = styled(URLInput)``;
export const MsgInput = styled(FourthArea)`
  max-width: 450px;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#020e18" : "#f8f8f8"};
  caret-color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
`;
export const OneDiv = styled.div``;
export const FifthDiv2 = styled.div`
  margin-top: 20px;
`;
export const SixthDiv2 = styled(FifthDiv2)``;
export const SeventhDiv2 = styled(FifthDiv2)``;
export const EigthDiv2 = styled(FifthDiv2)``;
export const SecondDiv2 = styled(FifthDiv2)``;
export const ThirdDiv2 = styled(FifthDiv2)``;
export const FourthDiv2 = styled(FifthDiv2)``;
export const NineDiv2 = styled(FifthDiv2)``;
export const TenDiv2 = styled(FifthDiv2)``;
export const ElevenDiv2 = styled(FifthDiv2)``;
export const TwelveDiv2 = styled(FifthDiv2)``;
export const ThirteenDiv2 = styled(FifthDiv2)``;

export const AddButton = styled(FifthButton)`
  margin-top: 50px;
  display: block;
  @media (max-width: 480px) {
    min-width: 115px;
  }
  cursor: pointer;
`;
export const Msg = styled(Left)`
  line-height: 145px;
  height: 145px;
  @media (max-width: 576px) {
    line-height: 45px;
    height: auto;
  }
`;

/* Apply Job */

export const HeadApply = styled(HeadSpan)`
  padding-top: 35px;
  margin-bottom: 35px;
`;
export const ApplyWrap = styled.div`
  border: 1px solid #d4dadf;
  @media (max-width: 467px) {
    border-top: 1px solid #d4dadf;
    border-bottom: 0px;
    border-right: 0px;
    border-left: 0px;
  }
`;
export const TitleApply = styled.div`
  margin-top: 60px;
  text-align: center;
`;
export const TitleSpan = styled.span`
  font-size: 20px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
  font-weight: bold;
  text-transform: uppercase;
`;
export const FormApply = styled.div`
  max-width: 575px;
  margin-right: auto;
  margin-left: auto;
  margin-top: 45px;
  padding-bottom: 50px;

  @media (max-width: 767px) {
    max-width: 370px;
  }
  @media (max-width: 467px) {
    max-width: 246px;
  }
`;
export const Gap = styled.div`
  margin-top: 20px;
`;
export const LeftWing = styled.div`
  padding-right: 15px;
  @media (max-width: 767px) {
    padding-right: 0px;
    margin-bottom: 20px;
  }
`;
export const LabelOne = styled.label`
  font-size: 13px;
  font-family: "Open Sans";
  color: ${props => (props.theme.mode === "dark" ? "white" : "rgb( 0, 0, 0 )")};
  font-weight: 600;
`;
export const InputOne = styled.input`
  border: 1px solid #e2e6ea;
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f8f8f8"};
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  border-radius: 5px;
  min-height: 45px;
  width: 100%;
  padding-left: 5px;
`;

export const RightWing = styled.div`
  padding-left: 15px;
  @media (max-width: 767px) {
    padding-left: 0px;
  }
`;
export const InputTwo = styled(InputOne)``;
export const InputThree = styled(InputOne)``;

export const BtnApply = styled(AddButton)`
  margin-top: 50px;
  display: block;
  @media (max-width: 480px) {
    min-width: 115px;
  }
  cursor: pointer;
`;
export const DropzoneStyle = styled(Dropzone)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#f8f8f8"};
`;
export const IconS = styled(Icon)`
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  fontsize: 30px;
`;
export const FileSelectText = styled.p`
  margin-bottom: 0px;
  color: ${props => (props.theme.mode === "dark" ? "white" : "")};
  display: block;
  max-width: 300px;
  text-overflow: ellipsis;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
`;

/* Career Details style */

export const CareerHead = styled(HeadSpan)`
  margin-bottom: 25px;
  padding-top: 40px;
`;
export const CareerDBody = styled.div``;
export const BtnDiv = styled.div`
  display: flex;
  justify-content: center;
`;
export const JobBtn = styled(AddButton)`
  margin-top: 40px;
`;
export const BodyDetails = styled.div`
  margin-top: 40px;
  padding-bottom: 50px;
`;
export const BodyP = styled.p`
  font-size: 16px;
  font-family: "Open Sans";
  color: rgb(0, 107, 183);
  margin-bottom: 5px;
  font-weight: 600;
`;
export const LocationP = styled.p`
  font-size: 12.984px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgba( 51, 51, 51, 0.6 )"};
`;
export const DetailsP = styled.p`
  font-size: 13.983px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 25, 25, 25 )"} !important;
`;

/* Careers Style */

export const CareerDesc = styled.div`
  margin-top: 20px;
`;
export const DescHead = styled.p`
  font-size: 17.978px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
`;
export const DescBody = styled.p`
  font-size: 13.983px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 25, 25, 25 )"} !important;
`;
export const JobWrap = styled.div`
  padding-bottom: 50px;
`;
export const JobHead = styled.p`
  font-size: 17.978px;
  font-family: "Open Sans";
  color: ${props =>
    props.theme.mode === "dark" ? "white" : "rgb( 51, 51, 51 )"};
  margin-bottom: 15px;
  font-weight: 600;
`;
export const BodyDetailsJob = styled(BodyDetails)`
  padding-bottom: 0px;
  cursor: pointer;
`;
