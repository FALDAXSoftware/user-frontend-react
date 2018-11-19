import styled from 'styled-components';
import { Col,Input } from 'antd';

const Search = Input.Search;


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
    @media(max-width:480px)
    {
        min-height:320px;
    }
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
    @media(max-width:480px)
    {
        font-size:25px;
    }
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
    @media(max-width:480px)
    {
        max-height:240px;
    }
`
export const Righthead = styled.div`
    min-height:420px;
    background-image:url('/images/LandingCat/Blog/headImage.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width:480px)
    {
        min-height:320px;
    }
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
    width: 99%;
    vertical-align: middle;
    @media(max-width:991px)
    {
        display:none;
    }
`
export const Meta_title = styled.p`
    margin-bottom:0px;
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 139, 0 );
    font-weight: bold;
    min-height:24px;
`
export const Meta_desc = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight: bold;
    margin-bottom:8px;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
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
    overflow:hidden;
    width:100%;
    @media(max-width:576px)
    {
        display:block;
    }
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
    color:black;
    &:hover
    {
        color:#1890ff;
        
    }
    @media(max-width:576px)
    {
        display:block;
        padding:10px 0px;
        margin-right:0px;
    }
`
export const Next = styled.div`
    margin-left:60px;
    border:none;
    color:black;
    background:#f7f7f7;
    min-width:215px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height:40px;
    border-radius: 5px;
    cursor:pointer;
    &:hover
    {
        color:#1890ff;
        
    }
    @media(max-width:576px)
    {
        margin-top:30px;
        display:block;
        padding:10px 0px;
        margin-left:0px;
    }
`
export const MsgIcon = styled.img`
 margin-right:5px;
`



/* <<<<<<<<<<<<<<<<<<<<<<<<< BLOG DETAILS STYLED COMPONENTS >>>>>>>>>>>>>>>>>>>>>> */


export const BD_mainWrap = styled.div`
    padding-top:100px;
    margin-bottom:80px;
`
export const Left_col = styled.div`
    padding-right:30px;
    @media(max-width:1199px)
    {
        padding-right:0px;
    }
`
export const Blog_desc = styled.p`
    font-size: 30px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight:600;
    margin-bottom:0px;
`

export const Status = styled.div`
    display:inline-block;
    padding: 0px 20px;
    border-right: 1px solid black;
    line-height: 1;
`
export const Date = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgba( 102, 102, 102, 0.702 );
    font-weight:600;
`
export const Name = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgba( 102, 102, 102, 0.702 );
    font-weight:600;
`
export const Comment =styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgba( 102, 102, 102, 0.702 );
    font-weight:600;
`
export const Head_image = styled.div`
    margin-top:20px;
    background-image:url('${props => props.image}');
    min-height:400px;
    margin-bottom:35px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
`
export const PostHead = styled.div`
    background-color:#eef7ff;
    min-height:50px;
    line-height: 45px;
    padding-left: 30px;
`

export const PostHead_span = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight: bold;
`
export const PostHead_below = styled(PostHead)`
    margin-top:30px;
`
export const Comment_box = styled.div`
    margin-top:50px;
`
export const Commentspan = styled.span`
    display:block;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 0, 0, 0 );
    line-height: 2;   
`
export const CommentArea = styled.textarea`
    width:100%;
    margin-top:10px;    
    padding-top:20px;
    padding-left:20px;
    border-color:#d9d9d9;
    font-size: 14px;
    font-family: "Open Sans";
    color: rgba( 0, 0, 0, 0.502 );
`
export const Comment_button = styled.button`
    margin-top:15px;
    float:right;
    border-radius: 5px;
    cursor:pointer;
    font-family: "Open Sans";
    background-color: rgb( 76, 132, 255 );      
    color:white;
    min-height:40px;
    padding-left:25px;
    padding-right:25px;
    border:none;
    border-radius:5px;
`
export const Right_Col = styled(Col)`
    @media(max-width:1199px)
    {
        display:none;
    }
`
export const SocialHead = styled(PostHead)`
    
`

export const Social_Li = styled.ul`
    list-style-type:none;
    padding-left: 0px;
    margin-top:20px;
`
export const LI1 = styled.li`
    display:inline-block;
    padding-right: 25px;
`
export const LI2 = styled.li`
    display:inline-block;
    padding-right: 25px;
`

/* Comments Styled-Components */


export const AllComments = styled.div`
`
export const Comment_wrap = styled.div`
    display: inline-flex;
    align-items: center;

`
export const CommentImage = styled.div`
    width:70px;
    height:70px;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    display:inline-block;
`
export const Comment_text = styled.div`
    padding-left:20px;
`
export const Comment_span = styled.p`
    display:inline-block;
    margin-bottom:0px;
    font-weight:600;
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
`
export const Comment_p = styled.p`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );  
    font-weight:600;
`
export const Comment_main = styled.div`
    margin-top:30px;
    word-break: break-word;
    padding-right: 30px;
`
export const PostHead_below_comment = styled(PostHead_below)`
    
`
export const PerComment = styled.span`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 0, 0, 0 );
`
export const Comment_msg = styled.span`
    font-size:12px;
    color:red;
`
export const Viewmore = styled.div`
    margin-left: auto;
    width: 165px;
    margin-right: auto;
    cursor: pointer;
    margin-top: 50px;
    font-size: 15px;
    font-weight: 600;
    margin-top: 50px;
    border-radius: 5px;
    cursor: pointer;
    font-family: "Open Sans";
    background-color: rgb( 76,132,255 );
    color: white;
    min-height: 40px;
    line-height: 38px;
    text-align: center;
    border: none;
    border-radius: 5px;

`


/* Related Post Styled */

export const Main_Wrap = styled.div`
    margin-top:30px;
    margin-bottom:40px;
`
export const Sub_wrap =styled.div`
    margin-left:-15px;
    margin-right:-15px;
`
export const Rel_post = styled.div`
    margin-left:15px;
    margin-right:15px;
    @media(max-width:767px)
    {
        margin-bottom: 60px;
    }
`
export const Rel_img = styled.div`
    width: 100%;
    height: 140px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 25px;
`
export const Rel_p = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight:600;
    margin-bottom: 5px;
`
export const Rel_span = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );
    border-right: 1px solid rgb( 128, 124, 124 );
    padding-right:15px;
`
export const Rel_name = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );
    padding-left:15px;
`
export const Rel_img_right = styled(Rel_img)`

`
export const Rel_span_right = styled(Rel_span)`
    border-right:0px;
`
export const Rel_p_right = styled(Rel_p)`
    font-size: 16.01px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
`
export const Sub_wrap_right = styled(Sub_wrap)`
    margin-left:0px;
    margin-right:0px;
`





/* News Style */


export const Inputsearch = styled(Search)`
width: 100%;
height: 40px;

`