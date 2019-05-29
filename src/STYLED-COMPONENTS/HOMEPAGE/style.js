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
    max-width:1170px;
    width:100%;
`;

export const Section1 = styled.div`
    background-color: #f5f5f5;
    @media (max-width: 576px) {
        background-color: white !important;
    }
`;

export const Section2 = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    padding-bottom: 70px;
`;

export const Section3 = styled.div`
    width: 100%;
    background-image: -webkit-linear-gradient( 90deg, rgb(245,245,245) 0%, rgb(255,255,255) 100%);
`;

export const ContainerRow = styled(Row)`
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
export const SpinEx = styled.div`
    text-align: center;
    background: white;
    border-radius: 4px;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f580;
    height: 100%;
    z-index: 9999;
`
export const SpinImg = styled.img`
    @media(max-width:5000px)
    {
        width:200px;   
    }
    @media(max-width:1600px)
    {
        width:150px;
    }
    @media(max-width:992px)
    {
        width:100px;
    }
    @media(max-width:568px)
    {
        width:70px;
    }
`
export const SpinDiv = styled.div`
display: flex;
justify-content: center;
align-items: center;
width:100%;
height:100%;
`