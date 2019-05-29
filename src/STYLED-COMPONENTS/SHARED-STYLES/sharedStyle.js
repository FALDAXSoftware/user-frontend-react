import styled from 'styled-components';

export const ModalWrap = styled.div`
width: 465px;
margin-left: auto;
margin-right: auto;
@media(max-width:576px)
    {
        width:350px;   
    }
    @media(max-width:425px)
    {
        width:256px;
    }
`
export const SubWrap = styled.div`
    margin-top:40px;
`
export const EmailInput = styled.input`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
    margin-top: 5px;
    @media(max-width:576px)
    {
    }
`