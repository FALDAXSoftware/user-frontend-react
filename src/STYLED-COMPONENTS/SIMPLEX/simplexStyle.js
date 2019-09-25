import styled from "styled-components";
import { Row, Col } from "antd";

export const SimMainRow = styled(Row)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "transparent" : "transparent"};
  display: flex;
  font-family: "Open sans";
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export const SimLeftCol = styled(Col)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "#01090f" : "#fff"};
  box-shadow: ${props =>
    props.theme.mode === "dark"
      ? ""
      : "3px 0px 5px 0px rgba(109, 109, 109, 0.19)"};
  border-radius: 4px;
  padding: 60px 20px;
  &.simplex_left_col_exchange {
    margin: 0 auto;
  }
  @media (max-width: 991px) {
    width: 100%;
  }
`;

export const SimRightCol = styled(Col)`
  display: flex;
  align-self: center;
  flex-wrap: wrap;
  padding: 20px 60px;
  color: #fff;
  @media (max-width: 991px) {
    width: 100%;
  }
  @media (max-width: 500px) {
    padding: 20px 30px;
  }
`;

export const SimHead = styled.span`
  font-weight: bold;
  font-size: 38px;
  line-height: 45px;
  padding: 0 0 20px 0;
`;
export const SimSubHead = styled.span`
  font-size: 16px;
  line-height: 26px;
`;
export const SimLastRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 30px 15px 0;
  color: ${props =>
    props.theme.mode === "dark" ? "#617090" : "rgba(0, 0, 0, 0.65)"};
  align-items: center;
  > .ant-col {
    > img {
      padding: 0 0 0 10px;
    }
  }
  > .buy_crypto_btn {
    padding: 10px 20px;
    border: 1px solid;
    border-color: #4c84ff;
    border-radius: 6px;
  }
  @media (max-width: 500px) {
    flex-wrap: wrap;
    justify-content: center;
    > .ant-col {
      width: 100%;
      margin-bottom: 20px;
      text-align: center;
    }
    > .ant-col.buy_crypto_btn {
      margin-bottom: 0;
    }
  }
`;
