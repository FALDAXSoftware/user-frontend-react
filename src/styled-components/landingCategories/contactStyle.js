import styled from 'styled-components';
import DatePicker from "react-datepicker";
export const Headcontact = styled.div`
   
`
export const Head_span= styled.p`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    text-transform: uppercase;
    line-height: 1.498;
    padding-top: 45px;
    margin-bottom: 40px;
    @media(max-width:480px)
    {
        text-align:center;
    }
`
export const Contact_wrap = styled.div`
    background-color:#f5f6fa;
`
export const Grey_wrap = styled.div`
    padding-top:110px;
    padding-bottom:30px;
` 
export const Row_wrap = styled.div`
    padding-bottom:80px;
`
export const Left_col = styled.div`
    padding-right:90px;
    @media(max-width:576px)
    {
        padding-right:0px;
    }
`
export const Sub_head = styled.p`
    font-size: 19.975px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    margin-top:30px;
    font-weight:600;
`
export const First_div = styled.div`
    margin-top:30px;
`
export const First_label = styled.label`
    display:block;
    font-size: 13px;
    font-family: "Open Sans";
    color: rgba( 0, 0, 0, 0.502 );
`
export const First_input = styled.input`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
`
export const Second_div = styled.div`
    margin-top:25px;
`
export const Second_label = styled(First_label)`
`
export const Second_input = styled(First_input)`

`
export const Third_div = styled(Second_div)`

`
export const Third_label = styled(First_label)`
`
export const Third_input = styled(First_input)`

`
export const Fourth_div = styled.div`
    
`
export const Fourth_label = styled(First_label)`
margin-top:30px;
`
export const Fourth_area = styled.textarea`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:145px;
    width:100%;
`
export const Fifth_div = styled.div`
    margin-top:30px;
`
export const Fifth_button = styled.button`
    min-width:230px;
    background-color:#4c84ff;
    border:none;
    border-radius:5px;
    min-height:50px;
    color:white;
`
export const Map_wrap = styled.div`
    margin-top:40px;
`
export const Subfoot_wrap = styled.div`
    margin-top:30px;
    padding-bottom: 30px;

`
export const Main_wrap1 = styled.div`
    min-height:130px;
    border-right:1px solid #f3f3f6;
    display: inline-flex;
    align-items: center;
    width: 100%;
    @media(max-width:1199px)
    {
        border-right:0px;
        display:inline-block;
    }
`
export const Main_wrap2 = styled(Main_wrap1)`
`
export const Main_wrap3 = styled(Main_wrap1)`
    border-right:0px;
`
export const Main = styled.div`
    display:inline-block;
    padding-left:30px;
    vertical-align:middle;  
    @media(max-width:1199px)
    {
        text-align:left;
    }
    @media(max-width:480px)
    {
        padding-left:10px;
        
    }
`
export const Img1 = styled.img`
    @media(max-width:480px)
    {
        width:30px;
    }
`
export const Img2 = styled.img`
    margin-left:70px;
    @media(max-width:1199px)
    {
        margin-left:0px;
    }
    @media(max-width:480px)
    {
        width:30px;
    }
`
export const Img3 = styled(Img2)`
    @media(max-width:480px)
    {
        width:30px;
    }
`
export const Sub_span= styled.span`
    font-size: 15.983px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    font-weight:600;
    
`
export const Sub_p = styled.p`
    font-size: 13.985px;
    font-family: "Open Sans";
    color: rgba( 51, 51, 51, 0.502 );
    margin-bottom:0px !important;
`




/* Media Contact File */

export const Career_wrap = styled.div`
    padding-top: 45px;
`
export const Subhead = styled.div`
    text-align:center;
`
export const Leftmedia = styled.div`
    min-height:205px;
    line-height:205px;
    width:370px;
    background:white;
    display:inline-block;
    border: 1px solid #cad0e6;
    border-radius:5px;
    margin-right:15px;
    @media(max-width:829px)
    {
        display:block;  
        margin:0px auto;
    }
    @media(max-width:400px)
    {
        width:285px;
    }
`
export const Rightmedia = styled.div`
    min-height:205px;
    line-height:205px;
    width:370px;
    background:#0f467a;
    display:inline-block;
    border: 1px solid #cad0e6;
    border-radius:5px;
    margin-left:15px;
    @media(max-width:829px)
    {
        display:block;
        margin:0px auto;
        margin-top:30px;
    }
    @media(max-width:400px)
    {
        width:285px;
    }
`
export const Textwrap = styled.div`
    text-align:center;
    margin-top: 100px;
`
export const LeftText = styled.div`
    width:370px;
    display:inline-block;
    margin-right:15px;
    text-align:left;
    @media(max-width:829px)
    {
        display:block;
        margin:0px auto;
    }
    @media(max-width:400px)
    {
        width:285px;
    }
`
export const RightText = styled.div`
    width:370px;
    display:inline-block;
    margin-left:15px;
    text-align:left;
    @media(max-width:829px)
    {
        display:block;
        margin:0px auto;
        margin-top:40px;
    }
    @media(max-width:400px)
    {
        width:285px;
    }
`
export const LT_div = styled.div`

`
export const LL_div = styled.div`
    margin-top:40px;
`
export const MediaUL = styled.ul`
    list-style-type:none;  
    padding-left:0px;
    margin-top:15px;
`
export const MediaLI = styled.li`
    display:inline-block;
    margin-right:10px;
`
export const Mediaspan = styled.span`
    font-size: 17.93px;
    font-family: "Open Sans";
    color: rgb( 74, 74, 74 );
    font-weight: bold;
    text-transform: uppercase;
`
export const MediaP = styled.p`
    font-size: 13.94px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 ); 
    font-weight:600;
`







/* Add Coin Style */

export const Head = styled.div`
    padding-top:40px;
    margin-bottom:60px;
    @media(max-width:480px)
    {
        padding-right:10px;
        padding-left:10px;
    }
`
export const Head_title = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    text-transform: uppercase;
`
export const Head_desc = styled.p`
    font-size: 13.985px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
`
export const Subtitle = styled.p`
    font-size: 15.983px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    margin-top:30px;
`
export const Body = styled.div`
    @media(max-width:480px)
    {
        padding-right:10px;
        padding-left:10px;
    }
`
export const BodyText = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );  

`
export const Body_form = styled.div`
    border : 1px solid #d4dadf;
    border-radius:5px;
    margin-top:20px;
`
export const Form_coin = styled.div`
    margin-top:50px;
    margin-bottom: 50px;
`
export const Left = styled.div`
    height:45px;
    display: flex;
    align-items: center;
    padding-right:15px;
    justify-content: flex-end;
    &>p
    {
        margin-bottom:0px;
        font-size: 13px;
        font-family: "Open Sans";
        color: rgb( 0, 0, 0 );
        font-weight:600;
    }
    @media(max-width:1199px)
    {
        padding-left:15px;
        justify-content: flex-start;
    }
` 
export const Right_input = styled.div`
    padding-right:15px;
    padding-left:15px;
`  
export const CoinInput = styled(First_input)`
    max-width:450px;
`
export const URLInput = styled(First_input)`
    max-width:450px;
`
export const TargetInput = styled(DatePicker)`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
    max-width:450px;
    
`
export const EmailInput = styled(URLInput)`
    
`
export const MsgInput = styled(Fourth_area)`
    max-width:450px;
`
export const OneDiv = styled.div`

`
export const TwoDiv = styled.div`
    margin-top:20px;
`
export const ThreeDiv = styled(TwoDiv)`

`
export const FourDiv = styled(TwoDiv)`

`
export const FiveDiv = styled(TwoDiv)`
    
`
export const AddButton = styled(Fifth_button)`
    margin-top:50px;
    display:block;
    @media(max-width:480px)
    {
        min-width:115px;
    }
`
export const Msg = styled(Left)`
    line-height:145px;
    height:145px;
    @media(max-width:576px)
    {
        line-height:45px;
        height:auto;
    }
`

/* Apply Job */

export const Head_apply = styled(Head_span)`
    padding-top:35px;
    margin-bottom:35px;
`
export const Apply_wrap = styled.div`
    border: 1px solid #d4dadf;
    @media(max-width:467px)
    {
        border-top: 1px solid #d4dadf;
        border-bottom : 0px;
        border-right : 0px;
        border-left : 0px;
    }
`
export const Title_apply = styled.div`
    margin-top:60px;
    text-align:center;    
`
export const Title_span = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 51, 51, 51 );
    font-weight: bold;
    text-transform: uppercase;  
`
export const Form_apply = styled.div`
    max-width:575px;
    margin-right:auto;
    margin-left:auto;
    margin-top:45px;
    padding-bottom:50px;

    @media(max-width:767px)
    {
        max-width:370px;
    }
    @media(max-width:467px)
    {
        max-width:246px;
    }
`
export const Gap = styled.div`
    margin-top:20px;
`
export const LeftWing = styled.div`
    padding-right:15px;
    @media(max-width:767px)
    {
        padding-right:0px;
        margin-bottom:20px;
    }
`
export const Labelone = styled.label`
    font-size: 13px;
    font-family: "Open Sans";
    color: rgb( 0, 0, 0 );
    font-weight:600;
`
export const InputOne = styled.input`
    border:1px solid #e2e6ea;
    background-color:#f8f8f8;
    border-radius:5px;
    min-height:45px;
    width:100%;
    padding-left:5px;
`

export const RightWing = styled.div`
    padding-left:15px;
    @media(max-width:767px)
    {
        padding-left:0px;
    }
`
export const InputTwo = styled(InputOne)`

`
export const InputThree = styled(InputOne)``


export const Btn_apply = styled(AddButton)`
    margin-top:50px;
    display:block;
    @media(max-width:480px)
    {
        min-width:115px;
    }
`