import styled from 'styled-components';
import { Row } from 'antd';

export const MainContainer = styled.div`
    width: 100%;
`;

export const Container = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    @media (min-width: 1200px) {
        width: 1170px;
    }
`;

export const Section_1 = styled.div`
    background-color: #f5f5f5;
    @media (max-width: 576px) {
        background-color: white !important;
    }
`;

export const Section_2 = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    padding-bottom: 70px;
`;

export const Section_3 = styled.div`
    width: 100%;
    background-image: -webkit-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%);
`;

export const Container_row = styled(Row)`
    @media (min-width: 992px) {
        & > .ant-col-lg-6,
        & > .ant-col-md-6,
        & > .ant-col-sm-6,
        & > .ant-col-xs-6
        {
            margin-top: -120px;
        }
    }
    @media (min-width: 768px) {
        & > .ant-col-lg-12,
        & > .ant-col-md-12,
        & > .ant-col-sm-12,
        & > .ant-col-xs-12
        {
            margin-top: -100px;
        }
    }
    @media (min-width: 576px) and (max-width: 767px) {
        &:nth-of-type(1), &:nth-of-type(2) {
          margin-top: -100px;
        }
    }
}`;
