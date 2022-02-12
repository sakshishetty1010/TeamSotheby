import styled from "styled-components";


export const FirstContainer=styled.div`
    background: ${({lightBg}) => (lightBg ? '#000':'#fff')};
    color:#fff;
    display: flex;
    justify-content:center;
    align-items:center;
    padding:0 24px;
    height:800px;
    position: relative;
    z-index:1;
`
export const FirstWrapper=styled.div`
    display:grid;
    z-index:1;
    height:860px;
    width:100%;
    margin:0 auto;
    padding: 0 24px;
    justify-content:center;
`
export const FirstRow=styled.div`
    display:grid;
    grid-auto-columns:minmax(auto,1fr);
    align-items:center;
    grid-template-areas:${({imgStart}) => (imgStart ? `'col2 col1'`:`'col1 col2'`)};

    @media screen and (max-width:768px){
        grid-template-areas:${({imgStart}) => (imgStart ? `'col1' 'col2'`:`'col1 col1' 'col2 col2'`)};
    }
    
`
export const Column1=styled.div`
    margin-bottom:15px;
    padding: 0 15px;
    grid-area: col1;
`
export const Column2=styled.div`
    margin-bottom:15px;
    padding: 0 15px;
    grid-area: col2;
`
export const TextWrapper=styled.div`
    padding-top: 0;
    max-width:540px;
    padding-bottom: 60px;
`
export const Topline=styled.p`
    margin-bottom:15px;
   font-size:18px;
   
   font-weight:700;
   color:${({darkText}) => (darkText ? '#00bfa6':'#000')};
`
export const Heading=styled.h1`
    margin-bottom:15px;
   font-size:48px;
   
   font-weight:700;
   color:${({lightText}) => (lightText ? '#00bfa6':'#fff')};
`
export const BtnWrap=styled.div`
    display: flex;
    justify-content:flex-start;
`
export const SubTitle=styled.p`
    margin-bottom:35px;
    font-size:28px;
    line-height:30px;
    max-width:440px;
    color:${({darkText}) => (darkText ? '#00bfa6':'#000')};

`
export const ImgWrap=styled.div`
    max-width:555px;
    height:100%;

`
export const Img=styled.img`
    width: 100%;
    
    margin:0 0 10px 0;
    padding-right:0 ;
`