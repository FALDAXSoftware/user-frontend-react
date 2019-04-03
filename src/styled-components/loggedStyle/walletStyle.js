import styled from 'styled-components';
import { Row, Col, Tabs, Button, Table, Input, notification, Steps, Icon } from 'antd';

export const Header_wrap = styled.div`
    padding-top:30px;
    display: flex;
    align-items: center;
    @media(max-width:991px)
    {
        display:block;
    }
`
export const Header_wrap2 = styled(Header_wrap)`
    padding-top:30px;
    align-items: center;
`
export const SearchCoin = styled.div`
    display:inline-block;
    margin-left:70px;
    width: 274px;
    @media(max-width:534px)
    {
        display:block;
        margin-left:15px;
        margin-top:20px;
        width:200px;
    }
`

export const MY_wallet = styled.div`
    display:inline-block;
    margin-left:15px;
    >span
    {
            font-size: 20px;
            font-family: "Open Sans";
            color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 51, 51, 51 )"};
            font-weight: bold;
            text-transform: uppercase; 
    }
`

export const Total = styled.div`
    display:inline-block;
    display: inline-flex;
    margin-left:100px;
    align-items: center;
    @media(max-width:767px)
    {
        display:block;

    }
    @media(max-width:945px)
    {
        display:block;
        margin-top:20px;
        margin-left:15px;
    }
`
export const Tot = styled.span`
    font-size: 18px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "#828a91" : "rgba( 80, 80, 80, 0.502 )"};  
    font-weight:600;
`
export const Money = styled.span`
    font-size: 36px;
    padding-left:15px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};  
    font-weight:600;
    @media(max-width:767px)
    {
        font-size:25px;
    }
`
export const Currency = styled.span`
    font-size: 18px;
    font-family: "Open Sans";
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};  
    font-weight:600;
    padding-left:10px;
    @media(max-width:767px)
    {
        font-size:14px;
    }
`
export const CoinTable = styled.div`
    margin-top:25px;
    @media(max-width:1160px)
    { 
        overflow:auto;
    }
`
export const Tableofcoin = styled(Table)`
    margin-left:-30px;
    margin-right:-30px;
    margin-top:25px;
`
export const Head = styled.tr`
    background-color:${props => props.theme.mode == "dark" ? "#061a2b" : "#f5f6fa"};
    font-size: 13px;
    font-family: "Open Sans";
    color: rgb( 23, 76, 126 );
    text-transform: uppercase;
    padding-left:45px;
    height:40px;
    >th
    {
        vertical-align: middle !important;
        padding-left: ${props => props.wallet ? "" : "45px !important"};
        text-align:${props => props.wallet ? "center" : ""};
    }
    @media(max-width:1160px)
    {
        >th{
            padding-left:8px !important;
        }
        >th:last-child
        {
            width:10%;
        }
    }
    @media(max-width:767px)
    {
        >th{
            width:200px;
        }
        >th:last-child
        {
            width:50px;
        }
    }
`
export const Sub_head = styled.th`
    border-bottom: 0px;
`
export const Col1 = styled.tr`
    height:${props => props.wallet ? "70px" : "90px"};
    >td{
        vertical-align: middle !important;
        padding-left: ${props => props.wallet ? "" : "45px !important"};
        text-align:${props => props.wallet ? "center" : ""};
        font-size: ${props => props.wallet ? "14px" : ""};
        font-family: ${props => props.wallet ? "Open Sans" : ""};
        font-weight:  ${props => props.wallet ? "600" : ""};
        color: ${props => props.wallet ? props.theme.mode == "dark" ? "white" : "rgb( 33, 33, 33 )" : ""};
    }
    @media(max-width:1160px)
    {
        >td
        {
            padding-left:8px !important;
        }
        >td:last-child
        {
            width:10%;
        }
    }
    @media(max-width:767px)
    {
        >td
        {
            width:200px;
        }
        >td:last-child
        {
            width:50px;
        }    
    }
`
export const Bit_img = styled.img`
    margin-right:15px;
    vertical-align:middle;
    width:20px;
`
export const Bit_text = styled.div`
    vertical-align:middle;
    display:inline-block;
    >p
    {
        margin-bottom:0px !important;
    }
`
export const Bit = styled.p`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 76, 132, 255 );
    font-weight: bold;
    text-transform: uppercase;  
`
export const Bit_price = styled.p`
    font-size: 20px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 51, 51, 51 )"}; 
    font-weight:600;
    text-transform: uppercase;  
    @media(max-width:992px)
    {
        font-size:14px;
    }
`
export const Price = styled.p`
    font-size: 19.993px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgba( 51, 51, 51, 0.702 )"};  
    font-weight:600;
    vertical-align: middle;
    margin-bottom: 0px;
    @media(max-width:992px)
    {
        font-size:16px;
    }
`
export const DropMenu = styled(Icon)`
    font-size: 15px !important;
`
export const Icon_wrap = styled.div`
    border-radius:50%;
    display: inline-flex;
    cursor:pointer;
    width:20px;
    height:20px;
    justify-content: center;
    align-items: center;
    &:hover
    {
        background-color:#e2ebff;
        color:#4e85ff;
    }
`

export const SearchCoin2 = styled(SearchCoin)`
    margin-left:auto;
    @media(max-width:991px)
    {
        display:block;
        margin-left:15px;
        margin-top:20px;
    }
`
export const Detail_wrap = styled.div`
    margin-top:35px;
`
export const Address = styled.div`
    font-size: 13.995px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "#68727a" : "rgba( 33, 33, 33, 0.502 )"};
    margin-left:15px;
    word-break:break-all;
    >b
    {
        color: ${props => props.theme.mode == "dark" ? "white !important" : "rgba( 33, 33, 33, 0.502 )"};
    }
`
export const Row_wrap = styled.div`
    margin-top:55px;
`
export const Left_Bit = styled.div`
    display:flex;
    align-items:center;
`
export const CryptImg = styled.div`
    display:inline-block;
`
export const CryptAmt = styled.div`
    display:inline-block;
    margin-left:10px;
`
export const Right_Bit = styled.div`
    display: inline-flex;
    float: right;
    height: 130px;
    align-items: center;
    @media(max-width:1199px)
    {
        float :none;

    }
    @media(max-width:427px)
    {
        display:block;
    }
`
export const BTC_amt = styled.span`
    font-size: 71.775px;
    font-family: "Open Sans";
    line-height:1.2;
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    @media(max-width:767px)
    {
        font-size:40px;
    }
`
export const BTC = styled.span`
    font-size: 34.89px;
    font-family: "Open Sans";
    color:${props => props.theme.mode == "dark" ? "white" : "rgb( 80, 80, 80 )"};
    text-transform:uppercase;
    @media(max-width:767px)
    {
        font-size:22px;
    }

`
export const FIAT_amt = styled.p`
    font-size: 29.906px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.6 );
    margin-bottom:0px;
    @media(max-width:767px)
    {
        font-size:25px;
    }
`
export const AMT = styled.span`
    font-size: 29.906px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.6 );
    @media(max-width:767px)
    {
        font-size:25px;
    }
`
export const SendButton = styled(Button)`
    color:white;
    border:none;
    background-color:#4c84ff;
    height:55px;
    width:130px;
    &:hover
    {
        border:1px solid #4c84ff;
    }
    @media(max-width:767px)
    {
        height: 40px;
        width: 110px;
    }
    @media(max-width:427px)
    {
        display:block;
        margin-top:20px;
        margin-left:0px;
    }
`
export const DepButton = styled(SendButton)`
    margin-left:20px;
    @media(max-width:427px)
    {
        margin-left:0px;
    }
`
export const WithButton = styled(SendButton)`
    margin-left:20px;
    @media(max-width:427px)
    {
        margin-left:0px;
    }
`
export const Trans_table = styled.div`
    border:1px solid #d8d8d8;
    margin-top:50px;
    border-radius:10px;
`
export const TransTitle = styled.p`
    font-size: 20px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 51, 51, 51 )"};
    padding-left:25px;
    margin-top:30px;
    font-weight: bold;
    text-transform: uppercase;
`
export const WalletCoin = styled(SearchCoin)`
    margin-top:0px;
    & .ant-select-selection--single
    {
        background-color:${props => props.theme.mode == "dark" ? "#041421" : "white"};
    }
    & .ant-select-selection-selected-value
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
    & .ant-select-arrow
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
export const Left_head = styled.div`
    height:70px;
    display:flex;
    align-items:center;
`
export const Right_head = styled.div`
    height:70px;
    display:flex;
    align-items:center;
    @media(max-width:991px)
    {
        margin-left:15px;
    }
    @media(max-width:427px)
    {
        display:block;
    }
`
export const WallTotal = styled(Total)`
    margin-left:0px;
    @media(max-width:928px)
    {
        margin-top:0px;
    }
    @media(max-width:427px)
    {
        display:block;
    }
`
