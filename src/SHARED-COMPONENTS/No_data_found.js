import React from 'react';
import styled from 'styled-components';
import { Contact_wrap } from 'STYLED-COMPONENTS/LANDING_CATEGORIES/contactStyle';
import { Container } from 'STYLED-COMPONENTS/HOMEPAGE/style';

export const ContainerContact = styled(Container)`
    text-align: center;
    padding: 0px 0px;
    background-color:${props => props.theme.mode == "dark" ? "#041422" : "white"};
    border-radius:5px;
    padding-bottom:70px;
    @media(max-width:480px)
    {
        padding-right:0px;
        padding-left:0px;
    }
`
const Span = styled.span`
    font-size: 24px;
    font-family: "Open sans";
    text-align: center;
    font-weight: 400;
`
const DataDiv = styled.div`
    background-color: #f8f8f8;
    border-radius: 1px solid #e2e6ea;
    height: 100px;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const NoDataFound = (props) => {
    return (
        <Contact_wrap>
            <ContainerContact>
                <DataDiv>
                    <Span>
                        No {props.title} found !!
                </Span>
                </DataDiv>
            </ContainerContact>
        </Contact_wrap >
    )
}

export default NoDataFound;
