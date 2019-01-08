
import styled from 'styled-components';
import { Row, Col, Table } from 'antd';

export const ActPortWrap = styled.div`
    margin-top:30px;
    background-color:${props => props.theme.mode == "dark" ? "#01090f" : "#f5f6fa"};
    
`
export const Lleft = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    margin-right:15px;
    height:500px;
    padding-bottom:30px;
    overflow-y:auto;
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    border-radius: 5px;
    @media(max-width:991px)
    {
        margin-right:0px;
    }
`
export const Rright = styled.div`
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    margin-left:15px;
    height:500px;
    padding-bottom:30px;
    overflow-y:auto;
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    border-radius: 5px;
    @media(max-width:991px)
    {
        margin-left:0px;
        margin-top:30px;
    }
`
export const Topic = styled.div`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 127, 127, 127 );
    font-weight: bold; 
    padding-top:25px;
    padding-left:25px;
`
export const Act_div = styled.div`
    margin-top:20px;
    margin-left:25px;
    margin-right:25px;
`
export const ActTable = styled(Table)`
    & thead>tr>th
    {
        background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
        border-bottom:1px solid #eeeeee;
        color:${props => props.theme.mode == "dark" ? "#174c7e" : "#7f7f7f"};
    }
    & tbody>tr>td
    {
        color:${props => props.theme.mode == "dark" ? "white" : ""};
    }
`
export const High_low = styled.div`
    display: flex;
    margin-top: 30px;
    margin-right: 25px;
    margin-left: 25px;
`
export const Left_hl = styled.div`
    font-size: 24px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode == "dark" ? "white" : "rgb( 68, 68, 68 )"};
    font-weight:600;
`
export const Right_hl = styled.div`
    margin-left:auto;
    font-size: 24px;
    font-family: "Open Sans";
    color: rgb( 73, 174, 89 );      
    font-weight:600;
`
export const Rise_fall = styled.div`
    margin-top:30px;
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    padding-bottom: 40px;
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    border-radius: 5px;
    height:500px;
    overflow-y:auto;

`
export const Newsdiv = styled.div`
    margin-top:30px;
    background-color:${props => props.theme.mode == "dark" ? "#041b2c" : "white"};
    padding-bottom: 40px;
    padding-top:25px;
    box-shadow: -1px 5px 31px -10px rgba(0, 0, 0, 0.53);
    border-radius: 5px;
    height:500px;
    overflow-y:auto;
`
export const News = styled.span`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 127, 127, 127 );
    font-weight: bold;
    margin-left:30px;
    
`
export const Newslist = styled.div`
    margin-top:25px;
    margin-left:30px;
    margin-right:30px;
`
export const List = styled.div`
    border-bottom:1px solid #ddd;
    margin-top:20px;
`
export const Listspan = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 127, 127, 127 );  
`
export const Listp = styled.a`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 76, 132, 255 );
    font-weight:600;
    margin-top:8px;
    display:block;
    margin-bottom:15px;
`
export const Date = styled.span`
    float:right;
    margin-top: 20px;
    font-size: 12px;
    font-family: "Open Sans";
    color:${props => props.theme.mode == "dark" ? "#617090" : "rgb( 97, 112, 144 )"};
    padding-right: 20px;
`