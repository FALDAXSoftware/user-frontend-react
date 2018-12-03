import styled from 'styled-components';
import {Row, Col, Tabs, Button,Table,Input,notification,Steps,Icon } from 'antd';

export const Header_wrap = styled.div`
    padding-top:30px;
`
export const SearchCoin = styled.div`
    display:inline-block;
    margin-left:70px;
    width: 274px;
`

export const MY_wallet = styled.div`
    display:inline-block;
    margin-left:15px;
    >span
    {
            font-size: 20px;
            font-family: "Open Sans";
            color: rgb( 51, 51, 51 );
            font-weight: bold;
            text-transform: uppercase; 
    }
`

export const Total = styled.div`
    display:inline-block;
    margin-left:100px;
    display: inline-flex;
    align-items: center;
`
export const Tot = styled.span`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.502 );  
    font-weight:600;
`
export const Money = styled.span`
    font-size: 36px;
    padding-left:15px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );  
    font-weight:600;
`
export const Currency = styled.span`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );  
    font-weight:600;
    padding-left:10px;
`
export const CoinTable = styled.div`
    margin-top:25px;
`
export const Tableofcoin = styled(Table)`
    margin-left:-30px;
    margin-right:-30px;
    margin-top:25px;
`
export const Head = styled.tr`
    background-color:#f5f6fa;
    font-size: 13px;
    font-family: "Open Sans";
    color: rgb( 23, 76, 126 );
    text-transform: uppercase;
    padding-left:45px;
    height:40px;
    >th{
        vertical-align: middle !important;
        padding-left:45px !important;
    }
`
export const Sub_head = styled.th`
    border-bottom: 0px;
`
export const Col1 = styled.tr`
    height:90px;
    >td{
        vertical-align: middle !important;
        padding-left:45px !important;
    }
`
export const Bit_img = styled.img`
    vertical-align:middle;
`
export const Bit_text = styled.div`
    vertical-align:middle;
    padding-left:15px;
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
    font-size: 23.991px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 ); 
    font-weight:600;
`
export const Price = styled.p`
    font-size: 19.993px;
    font-family: "Open Sans";
    color: rgba( 51, 51, 51, 0.702 );  
    font-weight:600;
    vertical-align: middle;
    margin-bottom: 0px;
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
    margin-left:0px;
    float:right;
`
export const Detail_wrap = styled.div`
    margin-top:35px;
`
export const Address = styled.span`
    font-size: 13.995px;
    font-family: "Open Sans";
    color: rgba( 33, 33, 33, 0.502 );
`
export const Row_wrap = styled.div`
    margin-top:70px;
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

`
export const BTC_amt = styled.span`
    font-size: 71.775px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );
`   
export const BTC = styled.span`
    font-size: 34.89px;
    font-family: "Open Sans";
    color: rgb( 80, 80, 80 );  
`
export const FIAT_amt = styled.p`
    font-size: 29.906px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.6 );
`
export const AMT = styled.span`
    font-size: 29.906px;
    font-family: "Open Sans";
    color: rgba( 80, 80, 80, 0.6 );
`