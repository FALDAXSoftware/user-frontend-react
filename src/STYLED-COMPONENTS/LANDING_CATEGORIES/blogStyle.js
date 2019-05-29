import styled from 'styled-components';
import { Col, Input, Button } from 'antd';

const Search = Input.Search;


export const SectionBlog = styled.section`
    padding-top:110px;
`
export const MainImage = styled.div`
    margin-top: 40px;   
`
export const LeftHead = styled.div`
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
export const SubLeft = styled.div`
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
export const RightHead = styled.div`
    min-height:420px;
    background-image:url("${props => props.image}");
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    @media(max-width:480px)
    {
        min-height:320px;
    }
`
export const WholeWrap = styled.div`
    margin-top:55px;
`
export const BlogP = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color:${props => props.theme.mode === "dark" ? "white" : "rgb( 0, 0, 0 )"};
    font-weight: bold;
    margin-bottom: 0px;
    vertical-align: middle;
    display: inline-block;
`
export const BlogsWrap = styled.div`
    margin-top:30px;
`
export const HRTag = styled.hr`
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
export const MetaTitle = styled.p`
    margin-bottom:0px;
    font-size: 16px;
    font-family: "Open Sans";
    color: rgb( 255, 139, 0 );
    font-weight: bold;
    min-height:24px;
    text-overflow: ellipsis;
    overflow: hidden;
    &::focus
    {
        text-decoration:none;
    }
`
export const BlogDesc1 = styled.p`
    margin-top: 2px;
    font-size: 12px;
    font-family: "Open Sans";
    text-align:justify;
    color: black;
    font-weight: normal;
`
export const ReadMore = styled.p`
    font-size: 12px;
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
`
export const MetaDesc = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: ${props => props.theme.mode === "dark" ? "#4c84ff" : "rgb( 15, 71, 123 )"};
    font-weight: bold;
    margin-bottom:8px;

`
export const CardFoot = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    font-weight:600;
    color: ${props => props.theme.mode === "dark" ? "#b4b9bd" : "#666666"};  
    line-height:1;
`
export const PrevNext = styled.div`
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
    color:${props => props.theme.mode === "dark" ? "white" : "black"};
    background:${props => props.theme.mode === "dark" ? "#4c84ff" : "#f7f7f7"};
    min-width:215px;
    min-height:40px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor:pointer;
    &:hover
    {
        color:${props => props.theme.mode === "dark" ? "black" : '#1890ff'};
        
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
    color:${props => props.theme.mode === "dark" ? "white" : "black"};
    background:${props => props.theme.mode === "dark" ? "#4c84ff" : "#f7f7f7"};
    min-width:215px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height:40px;
    border-radius: 5px;
    cursor:pointer;
    &:hover
    {
        color:${props => props.theme.mode === "dark" ? "black" : '#1890ff'};
        
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


export const BDMainWrap = styled.div`
    padding-top:100px;
    margin-bottom:80px;
`
export const LeftCol = styled.div`
    padding-right:30px;
    @media(max-width:1199px)
    {
        padding-right:0px;
    }
`
export const BlogDesc2 = styled.p`
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
export const Comment = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgba( 102, 102, 102, 0.702 );
    font-weight:600;
`
export const HeadImage = styled.div`
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

export const PostHeadSpan = styled.span`
    font-size: 20px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight: bold;
`
export const PostHeadBelow = styled(PostHead)`
    margin-top:30px;
`
export const CommentBox = styled.div`
    margin-top:50px;
`
export const CommentSpan1 = styled.span`
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
export const CommentButton = styled.button`
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
export const RightCol = styled(Col)`
    @media(max-width:1199px)
    {
        display:none;
    }
`
export const SocialHead = styled(PostHead)`
    
`

export const SocialLi = styled.ul`
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
export const TagSpan = styled.span`
    background-color: aliceblue;
    margin-right: 10px;
    padding: 7px 10px;
    border-radius: 10px;
    color: rgb( 15,71,123 );
    font-weight: 600;
    font-size: larger;
    display: inline-block;
    white-space: nowrap;
    margin-top: 10px;
`

/* Comments Styled-Components */


export const AllComments = styled.div`
`
export const CommentWrap = styled.div`
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
export const CommentText = styled.div`
    padding-left:20px;
`
export const CommentSpan2 = styled.p`
    display:inline-block;
    margin-bottom:0px;
    font-weight:600;
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
`
export const CommentP = styled.p`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );  
    font-weight:600;
`
export const CommentMain = styled.div`
    margin-top:30px;
    word-break: break-word;
    padding-right: 30px;
`
export const PostHeadBelowComment = styled(PostHeadBelow)`
    line-height:2;
    display: flex;
    align-items: center;
`
export const PerComment = styled.span`
    font-size: 14px;
    font-family: "Open Sans";
    color: rgb( 0, 0, 0 );
    padding: 15px 15px;
`
export const CommentMsg = styled.span`
    font-size:12px;
    color:red;
`
export const ViewMore = styled.div`
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

export const MainWrap = styled.div`
    margin-top:30px;
    margin-bottom:40px;
`
export const SubWrap = styled.div`
    margin-left:-15px;
    margin-right:-15px;
`
export const RelPost = styled.div`
    margin-left:15px;
    margin-right:15px;
    @media(max-width:767px)
    {
        margin-bottom: 60px;
    }
`
export const RelImg = styled.div`
    width: 100%;
    height: 140px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    margin-bottom: 25px;
`
export const RelP = styled.p`
    font-size: 18px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
    font-weight:600;
    margin-bottom: 5px;
`
export const RelSpan = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );
    border-right: 1px solid rgb( 128, 124, 124 );
    padding-right:15px;
`
export const RelName = styled.span`
    font-size: 12px;
    font-family: "Open Sans";
    color: rgb( 128, 124, 124 );
    padding-left:15px;
`
export const RelImgRight = styled(RelImg)`

`
export const RelSpanRight = styled(RelSpan)`
    border-right:0px;
`
export const RelPRight = styled(RelP)`
    font-size: 16.01px;
    font-family: "Open Sans";
    color: rgb( 15, 71, 123 );
`
export const SubWrapRight = styled(SubWrap)`
    margin-left:0px;
    margin-right:0px;
`





/* News Style */


export const InputSearch = styled(Search)`
    width: 100%;
    height: 40px;
`
export const SearchWrap = styled.div`
    text-align:right;
    margin-top:35px;
`
export const WholeNews = styled(WholeWrap)`
    margin-top:30px;
`
export const RemoveButton = styled(Button)`
    margin-top:30px;
`
export const NoData = styled.div`
    text-align :center;
    font-family: "Open Sans";
    font-weight:bold;
    font-size:18px;
`