import styled from 'styled-components';


export const SectionBlog = styled.section`
    padding-top:110px;
`
export const Mainimage = styled.div`
   
`
export const Lefthead = styled.div`
    background:#0f477b;
    min-height:420px;
    order-color:#0f477b;
    display:flex;
    align-items:center;
`
export const Subleft = styled.div`
    padding : 0px 50px;
`
export const Eco = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
`
export const Head3 = styled.h3`
    font-size: 36px;
    font-family: "Open Sans";
    color: rgb( 255, 255, 255 );
    font-weight: bold;
`
export const Eco2 = styled.span`
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 139, 0 );

`
export const CardCover = styled.div`
    width:100%;
    height:195px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width:575px)
    {
        height:450px;
    }
`
export const Righthead = styled.div`
    min-height:420px;
    background-image:url('./images/LandingCat/Blog/headImage.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
export const Whole_wrap = styled.div`
    margin-top:55px;
`
export const Blog_p = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 0, 0, 0 );
    font-weight: bold;
    margin-bottom: 0px;
    vertical-align: middle;
    display: inline-block;
`
export const Blogs_wrap = styled.div`
    margin-top:30px;
`
export const HR_tag = styled.hr`
    box-sizing: content-box;
    height: 0;
    overflow: visible;
    display: inline-block;
    width: 87.6%;
    margin-left: 30px;
    vertical-align: middle;
`
export const Meta_title = styled.p`
    margin-bottom:0px;
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 139, 0 );
    font-weight: bold;
`
export const Meta_desc = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight: bold;
    margin-bottom:8px;
`
export const Card_foot = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    font-weight:600;
    color: #666666;  
    line-height:1;
`
export const Prev_next = styled.div`
    margin-top:45px;
    text-align:center;
        font-size: 14px;
        font-family: "Open Sans";
        color: rgb( 0, 0, 0 );
        font-weight: bold;
        display: flex;
        align-items: center;
        justify-content: center;
`
export const Prev = styled.div`
    margin-right:60px;
    border:none;
    background:#f7f7f7;
    min-width:215px;
    min-height:40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor:pointer;
    &:hover
    {
        color:#1890ff;
        
    }
`
export const Next = styled.div`
    margin-left:60px;
    border:none;
    background:#f7f7f7;
    min-width:215px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height:40px;
    border-radius: 5px;
    &:hover
    {
        color:#1890ff;
        
    }
`
export const MsgIcon= styled.img`
 margin-right:5px;
`