import styled from "styled-components";
import { Row, Col } from "antd";

export const SimTopHead = styled.h2`
  display: flex;
  width: 100%;
  justify-content: center;
  margin: 0 0 40px 0;
  color: #fff;
  font-weight: bold;
  font-family: "Open sans";
  font-size: 40px;
`;

export const SimMainRow = styled(Row)`
  background-color: ${props =>
    props.theme.mode === "dark" ? "transparent" : "transparent"};
  display: flex;
  flex-wrap: wrap;
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
  font-size: 24px;
  line-height: 28px;
  padding: 0 0 20px 0;
  // text-shadow: 2px 2px 5px rgba(0, 0, 0, 0.6);
  text-align: center;
`;
export const SimSubHead = styled.span`
  font-size: 16px;
  line-height: 26px;
  text-align: center;
  margin: 50px 0 0 0;
  > p {
    margin: 0 0 15px 0;
  }
  > img {
    width: 40%;
  }
  @media (max-width: 991px) {
    width: 100%;
    > img {
      width: 150px;
    }
  }
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
      padding: 0 0 0 20px;
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
export const CreateWalletRow = styled(Row)`
  > .ant-col {
    display: flex;
    justify-content: space-between;
    margin: 0 0 25px 0;
    align-items: center;
    > a {
      padding: 10px 20px;
      border: 1px solid;
      border-color: #4c84ff;
      border-radius: 6px;
      color: #333;
    }
  }
`;
