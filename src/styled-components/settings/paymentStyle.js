import styled from 'styled-components';
import { Old_label, OldInput } from '../../components/Settings/changePassword/Passwordchange'
import { Button_wrap, Sub_wrap, Back_Button, Next_Button } from '../../components/Settings/KYC/IDselect'

export const Payment_wrap = styled.div`
    margin-top: 30px;
`
export const PayHead = styled.p`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    font-weight:600;
`
export const PayForm = styled.div`
    max-width:495px;
    margin-left:auto;
    margin-right:auto;
    text-align:left;
    margin-top:45px;
    padding-bottom :50px;
`
export const Bank = styled.div`
    margin-top:25px;
`
export const Bank_label = styled(Old_label)`
`
export const Bank_input = styled(OldInput)`
    width:100%;
`
export const Button_payment = styled(Button_wrap)`
    display: flex;
    margin-top:200px;
    justify-content: center;
`

export const Button_sub = styled(Sub_wrap)``

export const Button_cancel = styled(Back_Button)``

export const Button_add = styled(Next_Button)``

export const PayForm2 = styled(PayForm)`
    max-width:710px;
`
export const Lefty = styled.div`
    margin-right:15px;
    height:125px;
    border-radius:5px;
    border:1px solid #d4dadf;
    cursor:pointer;
    &:hover
    {
        border-color:#4c84ff;
    }
`

export const Righty = styled.div`
    margin-left:15px;
    border-radius:5px;
    height:125px;
    border:1px solid #d4dadf;
    cursor:pointer;
    &:hover
    {
        border-color:#4c84ff;
    }
`
export const Gap = styled.div`
    margin-top:30px;
`
export const Top = styled.div`
    height:45px;
    background-color:#f5f6fa;
    border-radius:5px;
    padding-left:55px;
    padding-right:15px;
    position:relative;
    &:hover
    {
        background-color:#f5f8ff;
    }
`
export const CardName = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
    padding-top: 8px;
    float: left;
`
export const RemoveCard = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 76, 132, 255 );
    float:right;
    padding-top: 12px;
    padding-right:5px;
`
export const Body_card = styled.div`
    height: 64%;
    display: flex;
    justify-content: center;
    align-items: center;
`
export const Body_center = styled.div``